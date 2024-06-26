import { describe, expect, test } from "vitest";
import { getA4Height, getA4Width } from "./file";

describe("getA4Height", () => {
  test("should preserve the A4 ration given the width", () => {
    const height = getA4Height(210);

    expect(height).toEqual(297);
  });
});

describe("getA4Width", () => {
  test("should preserve the A4 ration given the height", () => {
    const width = getA4Width(297);

    expect(width).toEqual(210);
  });
});
