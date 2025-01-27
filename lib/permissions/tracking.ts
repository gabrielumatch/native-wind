import { Platform } from "react-native";
import { BasePermissionHandler } from "./base";
import type { PermissionResult } from "./base";
import { normalizeStatus } from "./utils";

// Only import tracking transparency on iOS
const TrackingTransparency =
  Platform.OS === "ios" ? require("expo-tracking-transparency") : null;

export class TrackingPermissionHandler extends BasePermissionHandler {
  protected type = "tracking";

  protected async checkNativePermission(): Promise<PermissionResult> {
    if (Platform.OS === "ios" && TrackingTransparency) {
      const status = await TrackingTransparency.getTrackingPermissionsAsync();
      return {
        status: normalizeStatus(status),
        canAskAgain: status !== "denied",
      };
    }
    return { status: "granted", canAskAgain: true };
  }

  protected async requestNativePermission(): Promise<PermissionResult> {
    if (Platform.OS === "ios" && TrackingTransparency) {
      const status =
        await TrackingTransparency.requestTrackingPermissionsAsync();
      return {
        status: normalizeStatus(status),
        canAskAgain: status !== "denied",
      };
    }
    return { status: "granted", canAskAgain: true };
  }
}

export const trackingPermissions = new TrackingPermissionHandler();
