import { Camera } from "expo-camera";
import { BasePermissionHandler } from "./base";
import type { PermissionResult } from "./base";
import { normalizeStatus } from "./utils";

export class MicrophonePermissionHandler extends BasePermissionHandler {
  protected type = "microphone";

  protected async checkNativePermission(): Promise<PermissionResult> {
    const { status } = await Camera.getMicrophonePermissionsAsync();
    return {
      status: normalizeStatus(status),
      canAskAgain: status !== "denied",
    };
  }

  protected async requestNativePermission(): Promise<PermissionResult> {
    const { status } = await Camera.requestMicrophonePermissionsAsync();
    return {
      status: normalizeStatus(status),
      canAskAgain: status !== "denied",
    };
  }
}

export const microphonePermissions = new MicrophonePermissionHandler();
