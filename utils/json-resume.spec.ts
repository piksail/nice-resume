import { describe, expect, test } from "vitest";
import { getPeriodBounds } from "./json-resume";

describe("getPeriodBounds", () => {
  test("should retrieve bounds from YYYY-YYYY format", () => {
    const { startDate, endDate } = getPeriodBounds("2000-2001");

    expect(startDate).toEqual("2000");
    expect(endDate).toEqual("2001");
  });

  test("should retrieve bounds from YYYY - YYYY format", () => {
    const { startDate, endDate } = getPeriodBounds("2000 - 2001");

    expect(startDate).toEqual("2000");
    expect(endDate).toEqual("2001");
  });

  test("should retrieve start date from YYYY", () => {
    const { startDate } = getPeriodBounds("2000");

    expect(startDate).toEqual("2000");
  });

  test("should retrieve start date from {string} YYYY", () => {
    const { startDate } = getPeriodBounds("Since 2000");

    expect(startDate).toEqual("Since 2000");
  });
});
