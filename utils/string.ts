import type { TextSeparator } from "@/types";

/**
 * Capitalize the first character of a given string.
 */
export function capitalize(string: string) {
  return !string?.length ? "" : `${string[0].toUpperCase()}${string.slice(1)}`;
}

/**
 * Add spaces around the given separator if relevant.
 */
export function getStringFromSeparator(separator: TextSeparator) {
  switch (separator) {
    case "|":
    case "-":
    case "·":
    case "*":
    case ">":
      return ` ${separator} `;
    case ",":
      return `${separator} `;
    default:
      return separator;
  }
}
