import { Camera } from "expo-camera";
import { BasePermissionHandler } from "./base";
import type { PermissionResult } from "./base";
import { normalizeStatus } from "./utils";

export class CameraPermissionHandler extends BasePermissionHandler {
  protected type = "camera";

  protected async checkNativePermission(): Promise<PermissionResult> {
    const { status } = await Camera.getCameraPermissionsAsync();
    return {
      status: normalizeStatus(status),
      canAskAgain: status !== "denied",
    };
  }

  protected async requestNativePermission(): Promise<PermissionResult> {
    const { status } = await Camera.requestCameraPermissionsAsync();
    return {
      status: normalizeStatus(status),
      canAskAgain: status !== "denied",
    };
  }
}

export const cameraPermissions = new CameraPermissionHandler();
