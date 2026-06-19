import { Page, Locator, expect } from "@playwright/test"

export interface FlightPassenger {
    title: string;      
    firstName: string;
    lastName: string;
    nationality: string;
}

export class FlightPassengerInfoPage {

    page: Page;
    cancleRadioButton: Locator;
    continueButton: Locator;
    emailField: Locator;
    confirmButton: Locator;
    secureTripButton: Locator;
    savedPassengerList: Locator;

    constructor(page: Page) {

        this.page = page;
        this.cancleRadioButton = page.locator('#standalone-none-fareType');
        this.continueButton = page.getByRole('button', { name: 'Continue' });
        this.emailField = page.getByTestId('contactDetails').locator("input").nth(2);
        this.confirmButton = page.locator('#portal-root').getByRole('button', { name: 'Confirm' });
        this.secureTripButton = page.locator(`button:has-text("Secure My Trip")`);
        this.savedPassengerList = page.locator('[role="listitem"]');
    }

    async pause(min = 500, max = 1200) {
        const delay = Math.floor(Math.random() * (max - min + 1)) + min;
        await this.page.waitForTimeout(delay);
    }

    async cancleFreeCancellation() {
        await this.cancleRadioButton.scrollIntoViewIfNeeded();
        await expect(this.cancleRadioButton).toBeVisible({timeout : 5000});
        await this.cancleRadioButton.click();
    }

    // async isExpanded(adultLocator: Locator): Promise<boolean> {
    //     const svg = adultLocator.locator('[data-testid="ExpandLessIcon"]');
    //     const cls = await svg.getAttribute('class') || '';
    //     return cls.includes('rotate-0');
    // }

    // async toggleSection(adultLocator: Locator) {
    //     const toggleBtn = adultLocator.locator('[data-testid="ExpandLessIcon"]');
    //     await toggleBtn.click();
    //     await this.pause(300, 600);
    // }

    // async fillPassengerForm(adultLocator: Locator, passenger: FlightPassenger) {
    //     await adultLocator.scrollIntoViewIfNeeded();

    //     if (!(await this.isExpanded(adultLocator))) {
    //         await this.toggleSection(adultLocator);
    //     }

    //     const formFields = adultLocator.locator('form input[autocomplete="new-password"]');
    //     await formFields.first().waitFor({ state: 'visible' });

    //     const titleInput = formFields.first();
    //     await titleInput.click();
    //     await this.page.getByText(passenger.title, { exact: true }).first().click();

    //     await formFields.nth(1).waitFor({ state: 'visible' });
    //     await formFields.nth(1).pressSequentially(passenger.firstName);

    //     await formFields.nth(2).pressSequentially(passenger.lastName);

    //     if (passenger.nationality && passenger.nationality !== 'India') {
    //         const nationalityInput = adultLocator.locator('input[placeholder="Country"]');
    //         await nationalityInput.click();
    //         await nationalityInput.fill(passenger.nationality);
    //         await this.page.getByText(passenger.nationality, { exact: true }).first().click();
    //         await this.pause();
    //     }
    // }

    // async fillAllPassengers(passengers: FlightPassenger[]) {
    //     const adultIds = ['#adult1', '#adult2', '#adult3', '#adult4'];

    //     for (let i = 0; i < passengers.length; i++) {
    //         const adultLocator = this.page.locator(adultIds[i]);
    //         await this.fillPassengerForm(adultLocator, passengers[i]);

    //         if (i < passengers.length - 1) {
    //             await this.toggleSection(adultLocator);
    //             await this.pause(300, 500);
    //         }
    //     }
    // }

    async selectSavedPassenger(fullName: string) {
        const passengerRow = this.savedPassengerList.filter({
            has: this.page.getByText(fullName, { exact: true })
        });

        await expect(passengerRow).toBeVisible({ timeout: 5000 });

        const checkbox = passengerRow.getByTestId('pax-checkbox');
        await checkbox.click();
    }

    async selectSavedPassengers(fullNames: string[]) {
        for (const name of fullNames) {
            await this.selectSavedPassenger(name);
            await this.pause(200, 400);
        }
    }

    async addEmailAddress(){
        await expect(this.emailField).toBeVisible();
        await this.emailField.click();
        await this.emailField.pressSequentially("tradahenish94@gmail.com", {delay : 100});
        await this.page.waitForTimeout(4000);
    }


    async proceedToBook() {
        await expect(this.continueButton).toBeVisible();
        await this.continueButton.click();

        await expect(this.confirmButton).toBeVisible({timeout : 4000});
        await this.confirmButton.click();

        await expect(this.secureTripButton).toBeVisible({timeout : 5000});
        await this.secureTripButton.click();

        await this.page.waitForTimeout(4000);
    }

}