import { Page, Locator, expect } from "@playwright/test"
import { SliderComponent } from "../components/SliderComponent";

export class FlightSelectionPage {

    page: Page;
    dialogBox: Locator;
    closeButton: Locator;
    filterTitle: Locator;
    priceSlider: SliderComponent;
    durationSlider: SliderComponent;
    departureTime: Locator;
    arrivalTime: Locator;
    bookButton : Locator;
    nonStopFlightCheckbox : Locator;

    constructor(page: Page) {

        this.page = page;
        this.dialogBox = page.getByRole('dialog');
        this.filterTitle = page.locator(`p:has-text("Filters")`).first();
        this.closeButton = page.getByRole('button', { name: '.' });

        const priceSliderInput = page.locator('div[data-section-id="price-section"] input[type="range"]');
        const durationSliderInput = page.locator('div[data-section-id="duration-section"] input[type="range"]');

        this.priceSlider = new SliderComponent(page, priceSliderInput);
        this.durationSlider = new SliderComponent(page, durationSliderInput);

        this.departureTime = page.locator('input[name="takeOff"][value="MORNING"]');
        this.arrivalTime = page.locator('input[name="landing"][value="MORNING"]');
        this.bookButton = page.getByRole('button', { name: 'Book' }).first();
        this.nonStopFlightCheckbox = page.locator(`input[type="checkbox"][value="0"]`).nth(0);
    }


    async pause(min = 500, max = 1200) {
        const delay = Math.floor(Math.random() * (max - min + 1)) + min;
        await this.page.waitForTimeout(delay);
    }


    async closeDialogBox() {
        await this.filterTitle.waitFor({ state: "visible", timeout: 10000 });

        const isPresent = await this.dialogBox.waitFor({ state: "visible", timeout: 10000 }).then(() => true).catch(() => false);

        if (isPresent) {
            await this.closeButton.waitFor({ state: "visible", timeout: 10000 });
            await this.closeButton.click();
        }

        // await this.pause();

        // await this.page.waitForTimeout(5000);
    }

    async selectDepartureAndArrivalTime() {
        await this.departureTime.scrollIntoViewIfNeeded();
        await this.pause(300, 700);
        await this.departureTime.click();
        await this.page.waitForLoadState("load");
        await this.pause();

        await this.arrivalTime.scrollIntoViewIfNeeded();
        await this.pause(300, 700);
        await this.arrivalTime.click();
        await this.page.waitForLoadState("load");
        await this.pause();
    }

    async selectAirline() {
        const airline = this.page.locator("//input[@value='6E']").first();
        await airline.scrollIntoViewIfNeeded();
        await this.pause(300, 700);
        await airline.click();
        await expect(airline).toBeChecked();
        await this.pause();
    }

    async proceedToBook(){
        await this.bookButton.scrollIntoViewIfNeeded();
        await expect(this.bookButton).toBeVisible();
        await this.bookButton.click();
        await this.page.waitForLoadState("domcontentloaded");
    }
    async selectNonStopFlight(){
        await expect(this.nonStopFlightCheckbox).toBeVisible({timeout : 4000});
        await this.nonStopFlightCheckbox.click();
    }

}