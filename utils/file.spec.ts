import { describe, expect, test } from "vitest";
import { getA4Height, getA4Width } from "./file";
import { A4_HEIGHT, A4_WIDTH } from "~/globals";

describe("getA4Height", () => {
  test("should preserve the A4 ration given the width", () => {
    const height = getA4Height(A4_WIDTH);

    expect(height).toEqual(A4_HEIGHT);
  });
});

describe("getA4Width", () => {
  test("should preserve the A4 ration given the height", () => {
    const width = getA4Width(A4_HEIGHT);

    expect(width).toEqual(A4_WIDTH);
  });
});
