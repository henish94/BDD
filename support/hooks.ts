import { Before, After, BeforeAll, AfterAll, Status } from '@cucumber/cucumber';
import { chromium } from '@playwright/test';
import { AbhiBus } from './world';
import * as fs from 'fs';                          

BeforeAll(async function () {
  console.log('\n=== YC Test Suite Starting ===');
});

Before(async function (this: AbhiBus) {
  const headless = process.env.HEADLESS !== 'false';
  const authExists = fs.existsSync('.auth/auth.json');  

  this.browser = await chromium.launch({ headless });

  this.context = await this.browser.newContext({
    viewport: { width: 1440, height: 900 },
    ...(authExists ? { storageState: '.auth/auth.json' } : {}) 
  });

  this.page = await this.context.newPage();
});

After(async function (this: AbhiBus, scenario) {
  if (scenario.result?.status === Status.FAILED) {
    const screenshot = await this.page?.screenshot({ fullPage: true });
    if (screenshot) await this.attach(screenshot, 'image/png');
  }
  await this.page?.close();
  await this.context?.close();
  await this.browser?.close();
});

AfterAll(async function () {
  console.log('=== AbhiBus Bus Booking Test Suite Complete ===\n');
});