import { useState, useEffect, useCallback, useRef } from "react";
import type { PermissionType, PermissionStatus } from "./types";
import { cameraPermissions } from "./camera";
import { microphonePermissions } from "./microphone";
import { locationPermissions } from "./location";
import { photoLibraryPermissions } from "./photo-library";
import { trackingPermissions } from "./tracking";

const permissionHandlers = {
  camera: cameraPermissions,
  microphone: microphonePermissions,
  location: locationPermissions,
  photoLibrary: photoLibraryPermissions,
  tracking: trackingPermissions,
};

export function usePermission(type: PermissionType) {
  const [status, setStatus] = useState<PermissionStatus>("undetermined");
  const [isLoading, setIsLoading] = useState(true);
  const [canAskAgain, setCanAskAgain] = useState(true);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    checkPermissionStatus();
    return () => {
      isMounted.current = false;
    };
  }, []);

  const checkPermissionStatus = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await permissionHandlers[type].check();
      if (isMounted.current) {
        setStatus(result.status);
        setCanAskAgain(result.canAskAgain);
      }
    } catch (error) {
      console.error(`Error checking ${type} permission:`, error);
    } finally {
      if (isMounted.current) {
        setIsLoading(false);
      }
    }
  }, [type]);

  const request = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await permissionHandlers[type].request();
      if (isMounted.current) {
        setStatus(result.status);
        setCanAskAgain(result.canAskAgain);
      }
      return result;
    } catch (error) {
      console.error(`Error requesting ${type} permission:`, error);
      throw error;
    } finally {
      if (isMounted.current) {
        setIsLoading(false);
      }
    }
  }, [type]);

  return {
    status,
    isLoading,
    canAskAgain,
    request,
    check: checkPermissionStatus,
  };
}
