import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type {DbFile} from "@/model/DbFile.ts";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utility function to format date in a human-readable way
export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return "just now";
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else {
    // For dates older than a week, return the formatted date
    return 'on ' + date.toLocaleDateString();
  }
}

export function linkDerivedFileWithParent(files: DbFile[]) {
  for (const file of files) {
    for (const derivedFile of file.derivedFiles) {
      derivedFile.parentId = file.id;
    }
  }
}