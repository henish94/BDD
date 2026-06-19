import { Locator, Page, expect } from "@playwright/test";

export class AbhiBusLoginPage {
    page: Page;
    flightsLink: Locator;
    closeButton: Locator;
    loginButton: Locator;
    mobileNumberField: Locator;
    continueButton: Locator;
    verifyHeading: Locator;

    constructor(page: Page) {
        this.page = page;
        this.flightsLink = page.getByRole('link', { name: 'Flights' });
        this.closeButton = page.locator(".closeButton");
        this.loginButton = page.getByRole('button', { name: 'Log in/Sign up' }).first();
        this.mobileNumberField = page.getByRole('textbox', { name: 'Enter Mobile Number' });
        this.continueButton = page.getByRole('button', { name: 'Continue' });
        this.verifyHeading = page.getByRole('heading', { name: 'Verify Your Mobile Number', level: 5 });
    }

    async closeOfferbanner() {
        const isPresent = await this.closeButton
            .waitFor({ state: 'visible', timeout: 3000 })
            .then(() => true)
            .catch(() => false);

        if (isPresent) {
            await this.closeButton.click();
        }
    }

    async goToFlightsTab(): Promise<void> {
        await this.flightsLink.click();
        await this.closeOfferbanner();
        // await expect(this.fromTrigger).toBeVisible({ timeout: 30000 });
    }

    async loginFunc() {
        await expect(this.loginButton).toBeVisible({ timeout: 4000 });
        await this.loginButton.click();

        await this.mobileNumberField.click();
        await this.mobileNumberField.pressSequentially("8200079192");
        await this.continueButton.click();

        await expect(this.verifyHeading).toBeVisible({ timeout: 4000 });

    }

    async fillOtp(page: Page, otp: string): Promise<void> {
        const digits = otp.split('');
        const inputs = page.locator('#otp [type="number"]');

        await expect(inputs).toHaveCount(digits.length);

        for (let i = 0; i < digits.length; i++) {
            await inputs.nth(i).fill(digits[i]);
        }
    }
}