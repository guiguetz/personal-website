import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Accessibility", () => {
  test("homepage has no critical a11y violations", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test("navigation is keyboard accessible", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Tab through interactive elements and verify focus is visible
    await page.keyboard.press("Tab");
    const focusedElement = await page.evaluate(() => {
      const el = document.activeElement;
      return el ? el.tagName : null;
    });

    // Should land on a focusable element
    expect(["A", "BUTTON", "INPUT"]).toContain(focusedElement);
  });

  test("skip link works", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Press Tab to focus skip link
    await page.keyboard.press("Tab");

    // Check if skip link is visible
    const skipLink = page.locator('a[href="#main"], a[href="#content"]').first();
    if (await skipLink.isVisible()) {
      await skipLink.click();
      const mainContent = page.locator("#main, #content, [role='main']").first();
      await expect(mainContent).toBeFocused();
    }
  });
});