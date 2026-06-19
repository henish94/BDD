import { expect, Locator, Page } from "@playwright/test";

export interface ContactDetails {
    mobileNumber: string;
    emailId: string;
}

export interface PassengerDetails {
    name: string;
    age: string;
}

export interface BookingDetails {
    contactDetails: ContactDetails;
    passengers: PassengerDetails[];
}

export class PassengerInfoPage {

    page: Page;
    InfoDialogBox: Locator;
    CloseButton: Locator;
    MobileNumber: Locator;
    EmailId: Locator;
    passengerForm: Locator;
    Name: Locator;
    Age: Locator;
    Gender: Locator;
    TravelAssured: Locator;
    ContinueLink: Locator;
    SecureRadioButton: Locator;

    constructor(page: Page) {

        this.page = page;
        this.InfoDialogBox = page.locator('#login-container');
        this.CloseButton = this.InfoDialogBox.locator("#login-heading svg");
        this.MobileNumber = page.getByPlaceholder("Mobile Number");
        this.EmailId = page.getByPlaceholder("Email ID");
        this.passengerForm = this.page.locator(".passengers-detail");
        this.Name = page.getByPlaceholder("Name");
        this.Age = page.getByPlaceholder("Age");
        this.Gender = page.getByRole('button', { name: 'Male', exact: true });
        this.TravelAssured = page.locator('.checkbox-container input');
        this.ContinueLink = page.locator('a.btn > div > svg');
        this.SecureRadioButton = page.locator('#addon-options-container').locator(".card").nth(1);

    }

    async ClosingLoginModel() {
        await expect(this.InfoDialogBox).toBeVisible();
        await this.CloseButton.click();
    }

    async selectSecureAddonIfPresent() {
        const isPresent = await this.SecureRadioButton
            .waitFor({ state: 'visible', timeout: 3000 })
            .then(() => true)
            .catch(() => false);

        if (isPresent) {
            await this.SecureRadioButton.click();
        }
    }

    async FillingUserInfo(contactDetails: ContactDetails, passengers: PassengerDetails[]): Promise<void> {

        await this.MobileNumber.waitFor({ state: "visible" });
        await this.MobileNumber.click();
        await this.MobileNumber.pressSequentially(contactDetails.mobileNumber);

        await this.EmailId.click();
        await this.EmailId.pressSequentially(contactDetails.emailId);

        let userCnt = this.Name.count();

        for (let i = 0; i < await userCnt; i++) {
            const passenger = passengers[i];

            const passengerForm_i = this.passengerForm.nth(i);

            await passengerForm_i.getByPlaceholder("Name").fill(passenger.name);
            await passengerForm_i.getByPlaceholder("Age").fill(passenger.age);

            await passengerForm_i.getByRole('button', { name: 'Male', exact: true }).click();
        }
        
        await this.selectSecureAddonIfPresent();
        await this.TravelAssured.check()
        await expect(this.TravelAssured).toBeChecked();
        await this.ContinueLink.click();
    }

}