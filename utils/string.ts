import type { TextSeparator } from "@/types";

/**
 * Capitalize the first character of a given string.
 */
export function capitalize(string?: string) {
  if (!string?.length) return string;
  return `${string[0].toUpperCase()}${string.slice(1)}`;
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
      return `\xa0${separator}\xa0`;
    case ",":
      return `${separator}\xa0`;
    default:
      return separator;
  }
}
