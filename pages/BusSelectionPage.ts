import { Page, Locator, expect } from "@playwright/test"

export class BusSelectionPage {

    page: Page;
    tabsActions: Locator;
    boardingPointsList: Locator;
    droppingPointsList: Locator;
    busACFilterButton: Locator;
    busNonAcFilterButton: Locator;
    selectBus: Locator;
    seatLayoutContainer: Locator;
    BoardingAndDroppingTabs: Locator;
    BoardingAndDroppingList: Locator;
    ProceedButton: Locator;

    constructor(page: Page) {

        this.page = page;
        this.tabsActions = page.locator('.container.tabs-actions').first();
        this.boardingPointsList = page.locator('#popular-filters-scrollable').first();
        this.droppingPointsList = page.locator('#popular-filters-scrollable').first();;
        this.busACFilterButton = page.locator(`//div[2]/div/span[4]`);
        this.busNonAcFilterButton = page.locator(`//div[2]/div/span[1]`).first();
        this.selectBus = page.locator('#service-cards-container .container.card').first();
        this.seatLayoutContainer = this.selectBus.locator("#seat-layout-container");
        this.BoardingAndDroppingTabs = this.selectBus.locator(`.tabs-actions a`);
        this.BoardingAndDroppingList = this.selectBus.locator(`.tabs-viewport .scrollable-container`);
        this.ProceedButton = this.selectBus.getByRole('button', { name: 'Proceed' });
    }

    // seelecting boarding point 
    async boardingPointStatus() {
        await this.tabsActions.waitFor({ state: "visible" });
        const boardingPointTab = this.tabsActions.getByText("Boarding Points").first();
        await expect(boardingPointTab).toHaveAttribute("class", /active/);
    }

    async selectingBoardingCity() {
        const boardingPointCity = this.boardingPointsList.getByText('Iskcon Circle', { exact: true });
        await boardingPointCity.click();
        await this.page.waitForLoadState("load");
        await expect(boardingPointCity).toHaveAttribute("class", /active/);
    }

    //selecting dropping point 
    async droppingPointStatus() {
        const droppingPointTab = this.tabsActions.getByText("Dropping Points").first();
        await droppingPointTab.click();
        await this.page.waitForLoadState("load");
        await expect(droppingPointTab).toHaveAttribute("class", /active/);
    }

    async selectingDroppingCity() {
        const droppingPoint = this.droppingPointsList.getByText('Andheri East', { exact: true });
        await droppingPoint.click();
        await this.page.waitForLoadState("load");
        await expect.soft(droppingPoint).toHaveAttribute("class", /active/);
    }

    // select nonAc filter button
    async busFilter() {
        await this.busACFilterButton.click();
        await expect(this.busNonAcFilterButton).toHaveAttribute("style", /pointer-events: none;/);
    }

    //select bus and required seat
    async selectBusSeat(seatNo: number): Promise<void> {

        const selectSeatsButton = this.selectBus.getByRole("button", {
            name: "Select Seats",
        });

        const hideSeatsButton = this.selectBus.getByRole("button", {
            name: "Hide Seats",
        });

        if (await selectSeatsButton.isVisible().catch(() => false)) {
            await selectSeatsButton.scrollIntoViewIfNeeded();
            await this.page.waitForLoadState("load");
            await selectSeatsButton.click();
        } else {
            await expect(hideSeatsButton).toBeVisible();
        }


        const availableSeats_1 = this.seatLayoutContainer.locator(`button.seat.seat-button`);
        await availableSeats_1.first().waitFor({ state: "visible" });
        const seatCount_1 = await availableSeats_1.count();

        if (seatCount_1 === 0) {
            throw new Error("No available seats found");
        }

        if (seatNo >= seatCount_1) {
            throw new Error(
                `Seat index ${seatNo} is invalid. Available seats: ${seatCount_1}`
            );
        }

        await availableSeats_1.first().waitFor({ state: "visible" });
        await availableSeats_1.nth(seatNo).click();
    }

    //select busBoardin point
    async selectBoardingPoint() {
        const boardingTabStatus = this.BoardingAndDroppingTabs.first();
        await expect(boardingTabStatus).toHaveAttribute("class", /active/);
        const boardingLocation = this.BoardingAndDroppingList.locator('.container  ').first();
        await boardingLocation.waitFor({ state: "visible" });
        await boardingLocation.click();
    }

    //select busDropping point
    async selectDroppingPoint() {
        const selectDroppingTab = this.BoardingAndDroppingTabs.nth(1);
        await expect(selectDroppingTab).toHaveAttribute("class", /active/);

        const droppingLocation = this.BoardingAndDroppingList.locator('.container  ').first();
        await this.BoardingAndDroppingList.scrollIntoViewIfNeeded();
        await droppingLocation.click();

        await this.ProceedButton.waitFor({ state: "visible" });
        await this.ProceedButton.click();

        await this.page.waitForLoadState("load");
    }
}