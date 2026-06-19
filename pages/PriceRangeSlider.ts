import { expect, Locator, Page } from "@playwright/test";

export class SliderPage {

  page: Page;
  SliderContainer: Locator;
  MinThumb: Locator;
  MaxThumb: Locator;

  constructor(page: Page) {
    this.page = page;
    this.SliderContainer = page.locator('.horizontal-slider');
    this.MinThumb = page.locator('.slider-thumb-0');
    this.MaxThumb = page.locator('.slider-thumb-1');
  }

  async getSliderInfo(thumbIndex: number) {
    const thumb = thumbIndex === 0 ? this.MinThumb : this.MaxThumb;
    const min = parseInt(await thumb.getAttribute('aria-valuemin') || '0');
    const max = parseInt(await thumb.getAttribute('aria-valuemax') || '0');
    const current = parseInt(await thumb.getAttribute('aria-valuenow') || '0');
    return { min, max, current };
  }

  async dragThumb(thumbIndex: number, targetValue: number) {
    const thumb = thumbIndex === 0 ? this.MinThumb : this.MaxThumb;
    const { min, max } = await this.getSliderInfo(thumbIndex);

    const sliderBox = await this.SliderContainer.boundingBox();
    const thumbBox = await thumb.boundingBox();

    if (!sliderBox || !thumbBox) throw new Error('Could not get bounding box');

    const percentage = (targetValue - min) / (max - min);
    const effectiveWidth = sliderBox.width - thumbBox.width;
    const targetX = sliderBox.x + (thumbBox.width / 2) + (percentage * effectiveWidth);
    const currentX = thumbBox.x + thumbBox.width / 2;
    const centerY = thumbBox.y + thumbBox.height / 2;

    await this.page.mouse.move(currentX, centerY);
    await this.page.mouse.down();
    await this.page.mouse.move(targetX, centerY, { steps: 20 });
    await this.page.mouse.up();

    const { current: landedValue } = await this.getSliderInfo(thumbIndex);
    if (landedValue !== targetValue) {
      const difference = targetValue - landedValue;
      const key = difference > 0 ? 'ArrowRight' : 'ArrowLeft';
      await thumb.focus();
      for (let i = 0; i < Math.abs(difference); i++) {
        await this.page.keyboard.press(key);
      }
    }

    await expect(thumb).toHaveAttribute('aria-valuenow', String(targetValue));
  }

  async setPriceRange(minPrice: number, maxPrice: number) {
    await this.SliderContainer.waitFor({ state: 'visible' });
    await this.dragThumb(0, minPrice);
    await this.dragThumb(1, maxPrice);
  }
}