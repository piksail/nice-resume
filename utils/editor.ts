import { nextTick } from "vue";
import type { Asset, Experience, ListMarker } from "@/types";

/**
 * Focus the last input of a given selector.
 */
export async function focusNextInput(selector: string) {
  await nextTick(); // Wait for the new input to be rendered before querying it
  const inputs = [...document.querySelectorAll(selector)];
  (inputs[inputs.length - 1] as HTMLInputElement).focus();
}

export function getEntryTitleLabel(type: Asset["type"] | Experience["type"]) {
  switch (type) {
    case "education":
      return "Diploma";
    case "project":
    case "voluntary":
    case "work":
      return "Position";
    case "language":
      return "Language";
    default:
      return "Title";
  }
}

/**
 * Adapt experience oragnization label given the type.
 */
export function getExperienceOrganizationLabel(type: Experience["type"]) {
  switch (type) {
    case "work":
      return "Company";
    case "award":
    case "education":
    case "certificate":
      return "Institution";
    case "publication":
      return "Publisher";
    case "project":
    case "voluntary":
      return "Organization";
  }
}

/**
 * Get actual marker symbol given list marker.
 */
export function getListMarker(value: ListMarker) {
  switch (value) {
    case "hyphen":
      return "'- '";
    case null:
      return "none";
    default:
      return value;
  }
}

/**
 * Convert 1/2/3/4 to top/right/bottom/left.
 */
export function getSideIndexLabel(index: number) {
  // Vue.js for loop is one-indexed
  if (index < 1 || index > 4) return "";
  return ["top", "right", "bottom", "left"][index - 1];
}
