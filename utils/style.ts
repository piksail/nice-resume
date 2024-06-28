// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import type { StyleValue } from "vue";
// import type { ResumeSettings } from "@/types";

// type Keys = keyof ResumeSettings;
// type Values = ResumeSettings[Keys];

/**
 * Generate the customizable style properties of an HTML node given its purpose.
 */
export function getNodeStyle(
  // settingsItem: Values,
  settingsItem: object, // TODO make it type-compliant
  settingsType: "text" | "title" | "block",
) {
  const style: StyleValue = {};
  if (settingsType === "text" || settingsType === "title") {
    style.fontFamily = settingsItem.font;
    style.fontSize = `${settingsItem.fontSize}px`;
    style.lineHeight = settingsItem.lineHeight ?? "normal";
    style.letterSpacing = `${settingsItem.letterSpacing}px`;
    style.fontWeight = settingsItem.fontWeight;
    style.fontStyle = settingsItem.isItalic ? "italic" : "initial";
    style.textTransform = settingsItem.isUppercase ? "uppercase" : "initial";
    style.color = settingsItem.color;
  }
  if (settingsType === "block" || settingsType === "title") {
    style.backgroundColor = settingsItem.backgroundColor;
    style.marginTop = `${settingsItem.margin[0]}px`;
    style.marginRight = `${settingsItem.margin[1]}px`;
    style.marginBottom = `${settingsItem.margin[2]}px`;
    style.marginLeft = `${settingsItem.margin[3]}px`;
    style.borderTop = `${settingsItem.borderStyle} ${settingsItem.borderColor} ${settingsItem.border[0]}px`;
    style.borderRight = `${settingsItem.borderStyle} ${settingsItem.borderColor} ${settingsItem.border[1]}px`;
    style.borderBottom = `${settingsItem.borderStyle} ${settingsItem.borderColor} ${settingsItem.border[2]}px`;
    style.borderLeft = `${settingsItem.borderStyle} ${settingsItem.borderColor} ${settingsItem.border[3]}px`;
    style.borderRadius = `${settingsItem.borderRadius}px`;
    style.paddingTop = `${settingsItem.padding[0]}px`;
    style.paddingRight = `${settingsItem.padding[1]}px`;
    style.paddingBottom = `${settingsItem.padding[2]}px`;
    style.paddingLeft = `${settingsItem.padding[3]}px`;
  }
  if (settingsType === "title") {
    style.textAlign = settingsItem.textAlign;
  }
  return style;
}
