import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge conditional class names and resolve Tailwind conflicts.
 * Usage: cn("px-4", condition && "px-8") -> "px-8"
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
