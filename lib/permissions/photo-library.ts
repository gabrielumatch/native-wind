import * as MediaLibrary from "expo-media-library";
import { BasePermissionHandler } from "./base";
import type { PermissionResult } from "./base";
import { normalizeStatus } from "./utils";

export class PhotoLibraryPermissionHandler extends BasePermissionHandler {
  protected type = "photoLibrary";

  protected async checkNativePermission(): Promise<PermissionResult> {
    const { status } = await MediaLibrary.getPermissionsAsync();
    return {
      status: normalizeStatus(status),
      canAskAgain: status !== "denied",
    };
  }

  protected async requestNativePermission(): Promise<PermissionResult> {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    return {
      status: normalizeStatus(status),
      canAskAgain: status !== "denied",
    };
  }
}

export const photoLibraryPermissions = new PhotoLibraryPermissionHandler();
