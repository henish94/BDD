import { expect, Page } from "@playwright/test";

export async function login(page: Page, email: string, password: string) {
  await page.goto("https://rahulshettyacademy.com/client");

  await page.locator("#userEmail").fill(email);
  await page.locator("#userPassword").fill(password);
  await page.locator("[value='Login']").click();

  await page.waitForLoadState("networkidle");
  await expect(page.locator(".card-body").first()).toBeVisible();
}