import * as Location from "expo-location";
import { BasePermissionHandler } from "./base";
import type { PermissionResult } from "./base";
import { normalizeStatus } from "./utils";

export class LocationPermissionHandler extends BasePermissionHandler {
  protected type = "location";

  protected async checkNativePermission(): Promise<PermissionResult> {
    const { status } = await Location.getForegroundPermissionsAsync();
    return {
      status: normalizeStatus(status),
      canAskAgain: status !== "denied",
    };
  }

  protected async requestNativePermission(): Promise<PermissionResult> {
    const { status } = await Location.requestForegroundPermissionsAsync();
    return {
      status: normalizeStatus(status),
      canAskAgain: status !== "denied",
    };
  }
}

export const locationPermissions = new LocationPermissionHandler();
