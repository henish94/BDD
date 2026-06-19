import { expect, Locator, Page } from "@playwright/test";

export class PaymentPage{

    page : Page; 
    Heading : Locator;
    MainTab : Locator;
    UPITab : Locator;
    QRButton : Locator;
    QrImage : Locator;

    constructor( page : Page ){
        this.page = page;
        this.Heading = page.getByRole('heading', { name: 'Fare Summary', level: 4 });
        this.MainTab = page.locator('#main-tabs');
        this.UPITab = this.MainTab.locator("#UPI");
        this.QRButton = page.getByRole('button', {name : "Generate QR"});
        this.QrImage = page.locator('.relative.rounded-10.shadow-100');
    }

    async selectingpaymentOption(){
        await this.page.waitForLoadState("load");
        await this.UPITab.waitFor({state : "visible", timeout : 20000});
        await this.UPITab.click();
        await expect(this.UPITab).toHaveAttribute("class", /bg-common-white/);
    }

    async GenerateQRCode(): Promise<void> {
    const qrImg = this.QrImage.locator("img");
    const qrSvg = this.QrImage.locator("svg");

    await expect(qrImg).toBeVisible({ timeout: 10000 });
    await expect(qrImg).toHaveClass(/blur-sm/, { timeout: 10000 });

    await expect(this.QRButton).toBeVisible({ timeout: 3000 });

    await this.QRButton.click();

    }
}