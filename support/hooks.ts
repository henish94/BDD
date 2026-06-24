import { Before, After, BeforeAll, AfterAll, Status } from '@cucumber/cucumber';
import { chromium } from '@playwright/test';
import { AbhiBus } from './world';
import * as fs from 'fs';                          

// Ensure HEADLESS defaults to 'true' when no env is provided
Before(async function (this: AbhiBus) {
  const headless = process.env.HEADLESS !== 'false';
  console.log('HEADLESS=', headless, 'CI=', process.env.CI ? 'true' : 'false');

  const authExists = fs.existsSync('.auth/auth.json');

  this.browser = await chromium.launch({
    headless,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-blink-features=AutomationControlled', // hides automation flag
      '--disable-infobars',
      '--disable-dev-shm-usage',                       // needed in CI/Docker
      '--window-size=1440,900',
    ],
  });

  this.context = await this.browser.newContext({
    viewport: { width: 1440, height: 900 },
    userAgent:
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 ' +
      '(KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
    ...(authExists ? { storageState: '.auth/auth.json' } : {}),
  });

  // Mask navigator.webdriver before any page load
  await this.context.addInitScript(() => {
    Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
  });

  this.page = await this.context.newPage();
});