import { createBdd } from "playwright-bdd";
import { expect } from "@playwright/test";
import { login } from "../utils/loginHelper.ts"

const { Given, When, Then } = createBdd();

Given("User opens the login page", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client");
});

When("User enters email {string}", async ({ page }, email: string) => {
  await page.locator("#userEmail").fill(email);
});

When("User enters password {string}", async ({ page }, password: string) => {
  await page.locator("#userPassword").fill(password);
});

When("User clicks Login button", async ({ page }) => {
  await page.locator("[value='Login']").click();
});

Then("User should see dashboard", async ({ page }) => {
  await page.waitForLoadState("networkidle");
  await expect(page.locator(".card-body").first()).toBeVisible();
});


Given("User is logged in", async ({ page }) => {
  await login(page, "tradahenish94@gmail.com", "HeNiSh94");
});

When("User adds product {string} to cart", async ({ page }, productName: string) => {
  const products = page.locator(".card-body");

  await page.locator(".card-body b").first().waitFor();

  const count = await products.count();

  for (let i = 0; i < count; i++) {
    const productTitle = await products.nth(i).locator("b").textContent();

    if (productTitle?.trim() === productName) {
      await products.nth(i).locator("text= Add To Cart").click();
      return;
    }
  }

  throw new Error(`Product not found: ${productName}`);
});

When("User opens cart page", async ({ page }) => {
  await page.locator("[routerlink*='cart']").click();
  await page.locator("div li").first().waitFor();
});

Then("Product {string} should be visible in cart", async ({ page }, productName: string) => {
  await expect(page.locator(`h3:has-text("${productName}")`)).toBeVisible();
});

When("User proceeds to checkout", async ({ page }) => {
  await page.locator("text=Checkout").click();
});

When("User selects country {string}", async ({ page }, countryName: string) => {
  await page.getByPlaceholder("Select Country").pressSequentially(countryName.slice(0, 3), {
    delay: 150,
  });

  const dropdown = page.locator(".ta-results");
  await dropdown.waitFor();

  const options = dropdown.locator("button");
  const optionsCount = await options.count();

  for (let i = 0; i < optionsCount; i++) {
    const text = await options.nth(i).textContent();

    if (text?.trim() === countryName) {
      await options.nth(i).click();
      return;
    }
  }

  throw new Error(`Country not found: ${countryName}`);
});

When("User places the order", async ({ page }) => {
  await page.locator(".action__submit").click();
});

Then("Order should be placed successfully", async ({ page }) => {
  await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

  let orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();

  if (!orderId) {
    throw new Error("Order ID was not generated");
  }
});
