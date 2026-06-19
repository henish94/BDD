import * as dotenv from 'dotenv';
dotenv.config();

import { World, IWorldOptions, setWorldConstructor, setDefaultTimeout } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page } from '@playwright/test';

setDefaultTimeout(60 * 1000);

export class AbhiBus extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!:    Page;

  BASE_URL:  string;
  // baseUrlWAS: string;

  constructor(options: IWorldOptions) {
    super(options);
    this.BASE_URL  = process.env.BASE_URL  ?? 'https://www.abhibus.com/';
    // this.baseUrlWAS = process.env.BASE_URL ?? 'https://www.abhibus.com/';
  }
}

setWorldConstructor(AbhiBus);