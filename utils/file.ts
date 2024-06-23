import { A4_RATIO } from "@/globals";

/**
 * Download a file without opening a tab.
 */
export function download(object: object, fileName: string) {
  const dataString =
    "data:text/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(object));
  const downloadAnchorNode = document.createElement("a");
  downloadAnchorNode.setAttribute("href", dataString);
  downloadAnchorNode.setAttribute("download", fileName + ".json");
  document.body.appendChild(downloadAnchorNode);
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

/**
 * Get the height given the width to preserve the A4 ratio.
 */
export function getA4Height(width: number) {
  return width * A4_RATIO;
}

/**
 * Get the width given the height to preserve the A4 ratio.
 */
export function getA4Width(height: number) {
  return height / A4_RATIO;
}
