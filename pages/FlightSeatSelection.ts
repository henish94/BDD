import { Page, Locator, expect } from "@playwright/test"

export class FlightSeatSelectionPage {

    page: Page;
    allSeatIcons: Locator;
    skipButton : Locator;
    fairTitle : Locator;
    continueAnywayButton : Locator;

    AVAILABLE_SEAT_SRC_PATTERN = 'f722b864dd8d6029f649ec48099e5bb5-ihhyv';
    BOOKED_SEAT_SRC_PATTERNS = [
        'c3a8ebbd804267a4872852e41b362aa6-tgzpa',
        '2f229dc803e987ab854ba4245f2d582f-flcbi',
        '13156505fc9330612f44d4b92da2aec5-igbtq',
        '79bb61890da848e60bc07b91f2a5febe-tumob',
        '67607f897a9bf8fb300bff95f45382cd-jjcny',
        'fce52ad19d8a5baab68012374f372af8-bhklx',
        'dbb73d3192e0f9665ed571fa2ee6b12f-rllwz',
        '6dd356549245a947848af23d8a189302-uxuow'
    ];

    constructor(page: Page) {

        this.page = page;
        this.allSeatIcons = page.locator('img[alt="w-auto seat-icon"]');
        this.skipButton = page.getByRole('button', { name: 'Skip to Payment' });
        this.continueAnywayButton = page.getByRole('button', { name: 'Continue Anyway' });
        this.fairTitle = page.getByText('Fare increased by airline!', { exact: true });
    }


    async pause(min = 500, max = 1200) {
        const delay = Math.floor(Math.random() * (max - min + 1)) + min;
        await this.page.waitForTimeout(delay);
    }

    async selectFirstNAvailableSeats(count: number): Promise<void> {
        await this.allSeatIcons.first().waitFor({ state: "visible" });

        const totalSeats = await this.allSeatIcons.count();
        let selectedCount = 0;

        for (let i = 0; i < totalSeats && selectedCount < count; i++) {
            const seat = this.allSeatIcons.nth(i);
            const src = await seat.getAttribute('src') || '';

            const isBooked = this.BOOKED_SEAT_SRC_PATTERNS.some(pattern => src.includes(pattern));

            if (!isBooked && src.includes(this.AVAILABLE_SEAT_SRC_PATTERN)) {
                await seat.scrollIntoViewIfNeeded();
                await seat.click();
                selectedCount++;
                await this.page.waitForTimeout(300); 
            }
        }

        if (selectedCount < count) {
            throw new Error(
                `Only ${selectedCount} available seats found out of requested ${count}`
            );
        }
    }
     
    async skipToPaymentPage(){
        await expect(this.skipButton).toBeVisible({timeout : 4000});
        await this.skipButton.click();
    }

    async handleFareIncreasePopup(){
        const popupAppeared = await this.fairTitle
            .waitFor({ state: "visible", timeout: 3000 })
            .then(() => true)
            .catch(() => false);

        if (!popupAppeared) {
            return;
        }

        const isPopupVisible = await this.continueAnywayButton
            .isVisible()
            .catch(() => false);

        if (isPopupVisible) {
            await this.continueAnywayButton.click();
            await this.fairTitle.waitFor({ state: "hidden", timeout: 10000 }).catch(() => {});
        }
    }

}