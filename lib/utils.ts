import clsx, { type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/**
 * Deploy base path. Empty on a user site (aditya8321.github.io) or a custom
 * domain; "/<repo>" on a project site. Set by the GitHub Actions workflow.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Prefix a /public path with the base path. next/image does not do this for us. */
export function asset(path: string) {
  return `${basePath}${path}`;
}
