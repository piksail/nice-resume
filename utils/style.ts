import type { StyleValue } from "vue";
import type { Category } from "~/types";

/**
 * Generate the customizable style properties of an HTML node given its purpose.
 */
export function getNodeStyle(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  settingsItem: any, // TODO make it TS-compliant
  settingsType: "text" | "title" | "block" | "flex",
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
    style.backgroundColor = `${settingsItem.backgroundColor}`;
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
    style.backgroundClip = "text";
    style.color = settingsItem.isGradient ? "transparent" : settingsItem.color;
    style.backgroundImage = settingsItem.isGradient
      ? `linear-gradient(${settingsItem.gradientAngle / 100}turn, ${settingsItem.fromColor}, ${settingsItem.toColor})`
      : settingsItem.color;
    style.textAlign = settingsItem.textAlign;
    style.width =
      settingsItem.widthType === "custom"
        ? `${settingsItem.width}%`
        : settingsItem.widthType;
  }
  if (settingsType === "flex") {
    style.flexDirection = settingsItem.listOrientation;
    if (settingsItem.listOrientation === "row") {
      style.flexWrap = "wrap";
      style.justifyContent = settingsItem.alignment;
      style.columnGap = `${settingsItem.gap}px`;
    }
    if (settingsItem.listOrientation === "column") {
      style.alignItems = settingsItem.alignment;
      style.rowGap = `${settingsItem.gap}px`;
    }
  }
  return style;
}

/**
 * Highlight the preview area controlled by the editor input.
 */
export function getNodeClass(id: string, focusedInput: string | undefined) {
  return focusedInput === id ? "!border-4 !border-double !border-primary" : "";
}

/**
 * Use the correct column properties whether layout is masonry (native columns) or not (grid columns).
 */
export function getCategoryLayoutClass(category: Category, isMasonry: boolean) {
  if (category?.layout === "half") {
    return isMasonry ? "[column-span:none]" : "col-span-1";
  }
  return isMasonry ? "[column-span:all]" : "col-span-2";
}
