import { Platform } from "react-native";
import { Camera } from "expo-camera";
import * as Location from "expo-location";
import * as MediaLibrary from "expo-media-library";
import { PermissionResponse } from "expo-modules-core";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Only import tracking transparency on iOS
const TrackingTransparency =
  Platform.OS === "ios" ? require("expo-tracking-transparency") : null;

export type PermissionType =
  | "camera"
  | "microphone"
  | "location"
  | "photoLibrary"
  | "tracking";

export type PermissionStatus =
  | "granted"
  | "denied"
  | "undetermined"
  | "blocked";

interface PermissionResult {
  status: PermissionStatus;
  canAskAgain: boolean;
}

const PERMISSION_CACHE_PREFIX = "@app_permissions:";

// Check if we're running on web
const isWeb = Platform.OS === "web";

class PermissionsManager {
  private static instance: PermissionsManager;
  private cache: Map<PermissionType, PermissionResult>;

  private constructor() {
    this.cache = new Map();
    if (!isWeb) {
      this.loadCachedPermissions();
    }
  }

  public static getInstance(): PermissionsManager {
    if (!PermissionsManager.instance) {
      PermissionsManager.instance = new PermissionsManager();
    }
    return PermissionsManager.instance;
  }

  private async loadCachedPermissions() {
    if (isWeb) return;

    try {
      const keys = await AsyncStorage.getAllKeys();
      const permissionKeys = keys.filter((key) =>
        key.startsWith(PERMISSION_CACHE_PREFIX)
      );

      for (const key of permissionKeys) {
        const value = await AsyncStorage.getItem(key);
        if (value) {
          const permissionType = key.replace(
            PERMISSION_CACHE_PREFIX,
            ""
          ) as PermissionType;
          this.cache.set(permissionType, JSON.parse(value));
        }
      }
    } catch (error) {
      console.error("Error loading cached permissions:", error);
    }
  }

  private async cachePermissionResult(
    type: PermissionType,
    result: PermissionResult
  ) {
    if (isWeb) return;

    try {
      await AsyncStorage.setItem(
        `${PERMISSION_CACHE_PREFIX}${type}`,
        JSON.stringify(result)
      );
      this.cache.set(type, result);
    } catch (error) {
      console.error("Error caching permission result:", error);
    }
  }

  public async checkPermission(
    type: PermissionType
  ): Promise<PermissionResult> {
    // On web, return a simplified permission state
    if (isWeb) {
      return this.getWebPermissionResult(type);
    }

    // First check cache
    const cached = this.cache.get(type);
    if (cached) return cached;

    // If not in cache, check actual permission
    const { status, canAskAgain } = await this.getPermissionStatus(type);
    const result = { status, canAskAgain };

    await this.cachePermissionResult(type, result);
    return result;
  }

  public async requestPermission(
    type: PermissionType
  ): Promise<PermissionResult> {
    // On web, return a simplified permission state
    if (isWeb) {
      return this.getWebPermissionResult(type);
    }

    const currentStatus = await this.checkPermission(type);

    if (currentStatus.status === "granted") {
      return currentStatus;
    }

    if (currentStatus.status === "blocked" || !currentStatus.canAskAgain) {
      return currentStatus;
    }

    const result = await this.requestPermissionFromSystem(type);
    await this.cachePermissionResult(type, result);
    return result;
  }

  private getWebPermissionResult(type: PermissionType): PermissionResult {
    // For web, we'll return a simplified state
    // Most permissions are not applicable or handled differently in web
    switch (type) {
      case "camera":
      case "microphone":
        // These can be requested through the browser's API
        return { status: "undetermined", canAskAgain: true };
      default:
        // Other permissions are always "granted" on web since they're handled differently
        return { status: "granted", canAskAgain: false };
    }
  }

  private async getPermissionStatus(
    type: PermissionType
  ): Promise<PermissionResult> {
    switch (type) {
      case "camera": {
        const { status } = await Camera.getCameraPermissionsAsync();
        return {
          status: this.normalizeStatus(status),
          canAskAgain: status !== MediaLibrary.PermissionStatus.DENIED,
        };
      }
      case "microphone": {
        const { status } = await Camera.getMicrophonePermissionsAsync();
        return {
          status: this.normalizeStatus(status),
          canAskAgain: status !== MediaLibrary.PermissionStatus.DENIED,
        };
      }
      case "location": {
        const { status } = await Location.getForegroundPermissionsAsync();
        return {
          status: this.normalizeStatus(status),
          canAskAgain: status !== MediaLibrary.PermissionStatus.DENIED,
        };
      }
      case "photoLibrary": {
        const { status } = await MediaLibrary.getPermissionsAsync();
        return {
          status: this.normalizeStatus(status),
          canAskAgain: status !== MediaLibrary.PermissionStatus.DENIED,
        };
      }
      case "tracking": {
        if (Platform.OS === "ios" && TrackingTransparency) {
          const response =
            await TrackingTransparency.getTrackingPermissionsAsync();
          return this.normalizeTrackingResponse(response);
        } else {
          return { status: "granted", canAskAgain: true }; // Android and web don't require tracking permission
        }
      }
    }
  }

  private async requestPermissionFromSystem(
    type: PermissionType
  ): Promise<PermissionResult> {
    switch (type) {
      case "camera": {
        const { status } = await Camera.requestCameraPermissionsAsync();
        return {
          status: this.normalizeStatus(status),
          canAskAgain: status !== MediaLibrary.PermissionStatus.DENIED,
        };
      }
      case "microphone": {
        const { status } = await Camera.requestMicrophonePermissionsAsync();
        return {
          status: this.normalizeStatus(status),
          canAskAgain: status !== MediaLibrary.PermissionStatus.DENIED,
        };
      }
      case "location": {
        const { status } = await Location.requestForegroundPermissionsAsync();
        return {
          status: this.normalizeStatus(status),
          canAskAgain: status !== MediaLibrary.PermissionStatus.DENIED,
        };
      }
      case "photoLibrary": {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        return {
          status: this.normalizeStatus(status),
          canAskAgain: status !== MediaLibrary.PermissionStatus.DENIED,
        };
      }
      case "tracking": {
        if (Platform.OS === "ios" && TrackingTransparency) {
          const response =
            await TrackingTransparency.requestTrackingPermissionsAsync();
          return this.normalizeTrackingResponse(response);
        } else {
          return { status: "granted", canAskAgain: true }; // Android and web don't require tracking permission
        }
      }
    }
  }

  private normalizeStatus(
    status: MediaLibrary.PermissionStatus
  ): PermissionStatus {
    switch (status) {
      case MediaLibrary.PermissionStatus.GRANTED:
        return "granted";
      case MediaLibrary.PermissionStatus.DENIED:
        return "denied";
      case MediaLibrary.PermissionStatus.UNDETERMINED:
        return "undetermined";
      default:
        return "blocked";
    }
  }

  private normalizeTrackingResponse(
    response: PermissionResponse
  ): PermissionResult {
    return {
      status: this.normalizeTrackingStatus(response.status),
      canAskAgain: response.canAskAgain,
    };
  }

  private normalizeTrackingStatus(
    status: PermissionResponse["status"]
  ): PermissionStatus {
    switch (status) {
      case "granted":
        return "granted";
      case "denied":
        return "denied";
      case "undetermined":
        return "undetermined";
      default:
        return "blocked";
    }
  }
}

// Export a singleton instance
export const permissionsManager = PermissionsManager.getInstance();

// Convenience functions for cleaner API
export const checkPermission = (type: PermissionType) =>
  permissionsManager.checkPermission(type);

export const requestPermission = (type: PermissionType) =>
  permissionsManager.requestPermission(type);
