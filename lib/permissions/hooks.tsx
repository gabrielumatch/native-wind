import { useState, useEffect, useCallback, useRef } from "react";
import {
  PermissionType,
  PermissionStatus,
  checkPermission,
  requestPermission,
} from "./index";

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
      const result = await checkPermission(type);
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
      const result = await requestPermission(type);
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
