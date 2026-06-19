import { Page, Locator } from "@playwright/test";

export class SliderComponent {

    page: Page;
    slider: Locator;      
    track: Locator;

    constructor(page: Page, slider: Locator) {
        this.page = page;
        this.slider = slider;
        this.track = slider.locator('xpath=following-sibling::div[contains(@class,"relative")]');
    }

    async getMin(): Promise<number> {
        return Number(await this.slider.getAttribute('min'));
    }

    async getMax(): Promise<number> {
        return Number(await this.slider.getAttribute('max'));
    }

    async getStep(): Promise<number> {
        const step = await this.slider.getAttribute('step');
        return step ? Number(step) : 1;
    }

    async getValue(): Promise<number> {
        const value = await this.slider.inputValue();
        return Number(value);
    }

    async setValue(value: number) {
        await this.slider.evaluate((el: HTMLInputElement, val: number) => {
            const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
                window.HTMLInputElement.prototype,
                'value'
            )?.set;
            nativeInputValueSetter?.call(el, val.toString());
            el.dispatchEvent(new Event('input', { bubbles: true }));
            el.dispatchEvent(new Event('change', { bubbles: true }));
        }, value);
    }

    async dragToValue(value: number) {
        await this.slider.scrollIntoViewIfNeeded();
        const min = await this.getMin();
        const max = await this.getMax();
        const box = await this.track.boundingBox();
        if (!box) throw new Error("Slider track bounding box not found");

        const currentValue = await this.getValue();
        const currentPercentage = (currentValue - min) / (max - min);
        const targetPercentage = (value - min) / (max - min);

        const startX = box.x + currentPercentage * box.width;
        const endX = box.x + targetPercentage * box.width;
        const y = box.y + box.height / 2;

        await this.slider.dispatchEvent('pointerdown', {
            bubbles: true,
            clientX: startX,
            clientY: y,
            pointerId: 1,
            isPrimary: true,
            button: 0,
        });

        await this.page.mouse.move(startX, y);
        await this.page.mouse.down();

        const steps = 20;
        for (let i = 1; i <= steps; i++) {
            const x = startX + ((endX - startX) * i) / steps;

            await this.slider.dispatchEvent('pointermove', {
                bubbles: true,
                clientX: x,
                clientY: y,
                pointerId: 1,
                isPrimary: true,
            });

            await this.page.mouse.move(x, y);
            await this.page.waitForTimeout(20);
        }

        await this.slider.dispatchEvent('pointerup', {
            bubbles: true,
            clientX: endX,
            clientY: y,
            pointerId: 1,
            isPrimary: true,
            button: 0,
        });

        await this.page.mouse.up();
        const finalValue = await this.getValue();
        if (Math.abs(finalValue - value) > (await this.getStep())) {
            await this.setValue(value);
        }
    }

    async getMinLabel(): Promise<string> {
        const label = this.slider.locator('xpath=following-sibling::div//div[1]');
        return (await label.textContent())?.trim() ?? '';
    }

    async getMaxLabel(): Promise<string> {
        const label = this.slider.locator('xpath=following-sibling::div//div[2]');
        return (await label.textContent())?.trim() ?? '';
    }
}