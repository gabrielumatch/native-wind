import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PermissionStatus } from "./types";

const PERMISSION_CACHE_PREFIX = "@app_permissions:";
const isWeb = Platform.OS === "web";

export interface PermissionResult {
  status: PermissionStatus;
  canAskAgain: boolean;
}

export abstract class BasePermissionHandler {
  protected abstract type: string;
  private cache: Map<string, PermissionResult>;

  constructor() {
    this.cache = new Map();
    if (!isWeb) {
      this.loadCachedPermission();
    }
  }

  protected abstract checkNativePermission(): Promise<PermissionResult>;
  protected abstract requestNativePermission(): Promise<PermissionResult>;

  private async loadCachedPermission() {
    if (isWeb) return;

    try {
      const value = await AsyncStorage.getItem(
        `${PERMISSION_CACHE_PREFIX}${this.type}`
      );
      if (value) {
        this.cache.set(this.type, JSON.parse(value));
      }
    } catch (error) {
      console.error(`Error loading cached ${this.type} permission:`, error);
    }
  }

  private async cachePermissionResult(result: PermissionResult) {
    if (isWeb) return;

    try {
      await AsyncStorage.setItem(
        `${PERMISSION_CACHE_PREFIX}${this.type}`,
        JSON.stringify(result)
      );
      this.cache.set(this.type, result);
    } catch (error) {
      console.error(`Error caching ${this.type} permission result:`, error);
    }
  }

  protected getWebPermissionResult(): PermissionResult {
    switch (this.type) {
      case "camera":
      case "microphone":
        return { status: "undetermined", canAskAgain: true };
      default:
        return { status: "granted", canAskAgain: false };
    }
  }

  public async check(): Promise<PermissionResult> {
    if (isWeb) {
      return this.getWebPermissionResult();
    }

    const cached = this.cache.get(this.type);
    if (cached) return cached;

    const result = await this.checkNativePermission();
    await this.cachePermissionResult(result);
    return result;
  }

  public async request(): Promise<PermissionResult> {
    if (isWeb) {
      return this.getWebPermissionResult();
    }

    const currentStatus = await this.check();

    if (currentStatus.status === "granted") {
      return currentStatus;
    }

    if (currentStatus.status === "blocked" || !currentStatus.canAskAgain) {
      return currentStatus;
    }

    const result = await this.requestNativePermission();
    await this.cachePermissionResult(result);
    return result;
  }
}
