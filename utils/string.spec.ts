import { describe, expect, test } from "vitest";
import { capitalize } from "./string";

describe("getPeriodBounds", () => {
  test("should retrieve bounds from YYYY-YYYY format", () => {
    const string = capitalize("lorem ipsum");

    expect(string).toEqual("Lorem ipsum");
  });
});
