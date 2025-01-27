# Permissions System

A comprehensive permissions management system for React Native/Expo applications. This system handles all permission-related operations in a clean, type-safe, and platform-aware manner.

## Core Files Explanation

- `base.ts`: The foundation of the permission system. Contains the abstract `BasePermissionHandler` class that all specific permission handlers extend. Handles common functionality like caching, web platform detection, and the basic permission lifecycle.

- `hooks.tsx`: Contains the React hook `usePermission` that makes it easy to use permissions in React components. Handles loading states, mounting/unmounting, and provides a clean API for checking and requesting permissions.

- `index.ts`: The main entry point that exports everything needed to use the permissions system. You should only import from this file when using the system.

## Available Permissions

1. **Camera** (`camera`)

   - Access to device camera
   - Required for taking photos/videos

   ```typescript
   const { status, request } = usePermission("camera");
   ```

2. **Microphone** (`microphone`)

   - Access to device microphone
   - Required for audio recording

   ```typescript
   const { status, request } = usePermission("microphone");
   ```

3. **Location** (`location`)

   - Access to device location
   - Required for geolocation features

   ```typescript
   const { status, request } = usePermission("location");
   ```

4. **Photo Library** (`photoLibrary`)

   - Access to device photo gallery
   - Required for saving/accessing photos

   ```typescript
   const { status, request } = usePermission("photoLibrary");
   ```

5. **Tracking** (`tracking`)
   - iOS only: App Tracking Transparency
   - Required for IDFA access on iOS 14.5+
   - Automatically returns 'granted' on Android/Web
   ```typescript
   const { status, request } = usePermission("tracking");
   ```

## Usage Examples

### Basic Usage in Components

```typescript
import { usePermission } from "lib/permissions";

function CameraScreen() {
  const { status, isLoading, canAskAgain, request } = usePermission("camera");

  useEffect(() => {
    if (status === "undetermined") {
      request();
    }
  }, [status]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (status !== "granted") {
    return (
      <View>
        <Text>Camera permission is required</Text>
        {canAskAgain && <Button title="Grant Permission" onPress={request} />}
      </View>
    );
  }

  return <Camera />;
}
```

### Multiple Permissions

```typescript
function ProfileScreen() {
  const camera = usePermission("camera");
  const photoLibrary = usePermission("photoLibrary");

  const handleUploadPhoto = async () => {
    // Request both permissions if needed
    if (camera.status !== "granted") {
      await camera.request();
    }
    if (photoLibrary.status !== "granted") {
      await photoLibrary.request();
    }

    if (camera.status === "granted" && photoLibrary.status === "granted") {
      // Both permissions granted, proceed with upload
      // ...
    }
  };

  return (
    <Button
      title="Upload Photo"
      onPress={handleUploadPhoto}
      disabled={
        camera.status !== "granted" || photoLibrary.status !== "granted"
      }
    />
  );
}
```

### Non-Component Usage

```typescript
import { checkPermission, requestPermission } from "lib/permissions";

async function takePicture() {
  const { status } = await checkPermission("camera");

  if (status !== "granted") {
    const result = await requestPermission("camera");
    if (result.status !== "granted") {
      throw new Error("Camera permission required");
    }
  }

  // Proceed with taking picture
}
```

## Platform Handling

- **iOS**: Full support for all permissions
- **Android**: Full support except tracking (automatically returns 'granted')
- **Web**:
  - Camera/Microphone: Uses browser permission API
  - Other permissions: Automatically returns 'granted'
  - No permission caching on web

## Permission States

- `undetermined`: Permission hasn't been requested yet
- `granted`: Permission has been granted
- `denied`: Permission was denied
- `blocked`: Permission is permanently denied/blocked

## Best Practices

1. Always check permission status before using protected features
2. Request permissions only when needed, not at app startup
3. Handle all possible permission states
4. Provide clear UI feedback when permissions are denied
5. Use the `canAskAgain` flag to determine if you should show a "request" button
