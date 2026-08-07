import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("critical paths", () => {
  test("home has full landing sections", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Tanvi");
    await expect(page.getByRole("navigation", { name: "Primary" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Driven by impact" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "What I work with" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Where I've worked" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Selected work" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Background" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Let's work together" })).toBeVisible();
  });

  test("search opens from toolbar", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Open search" }).click();
    await expect(page.getByRole("dialog", { name: "Search" })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog", { name: "Search" })).toHaveCount(0);
  });

  test("work filters empty state", async ({ page }) => {
    await page.goto("/work");
    await expect(page.getByRole("heading", { name: "Selected projects" })).toBeVisible();
    await page.getByPlaceholder("Search projects").fill("zzzz-no-match");
    await expect(page.getByText("Nothing matches")).toBeVisible();
    await page.getByRole("button", { name: "Clear filters" }).click();
    await expect(page.getByText("Nothing matches")).toHaveCount(0);
  });

  test("home has no axe violations", async ({ page }) => {
    await page.goto("/");
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });
});
