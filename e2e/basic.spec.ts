import { test, expect } from "@playwright/test";
import { APP_NAME } from "~/globals";

test("test", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText(APP_NAME)).toBeVisible();
});
