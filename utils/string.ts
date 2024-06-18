/**
 * Capitalize the first character of a given string.
 */
export function capitalize(string: string) {
  return !string?.length ? "" : `${string[0].toUpperCase()}${string.slice(1)}`;
}
