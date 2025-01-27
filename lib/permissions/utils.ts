import type { PermissionStatus } from "./types";

export function normalizeStatus(status: any): PermissionStatus {
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
