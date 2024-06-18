import { describe, expect, test } from "vitest";
import { getSideIndexLabel } from "./editor";

describe("getSideIndexLabel", () => {
  test("should get the label given the side index", () => {
    expect(getSideIndexLabel(1)).toEqual("top");
    expect(getSideIndexLabel(2)).toEqual("right");
    expect(getSideIndexLabel(3)).toEqual("bottom");
    expect(getSideIndexLabel(4)).toEqual("left");
  });

  test("should handle out of bound index", () => {
    expect(getSideIndexLabel(0)).toEqual("");
    expect(getSideIndexLabel(5)).toEqual("");
  });
});
