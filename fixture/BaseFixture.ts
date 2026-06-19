import { test as base, expect } from '@playwright/test';

import { AbhiBusHomePage } from '../pages/AbhiBusHomePage';
import { BusSelectionPage } from '../pages/BusSelectionPage';
import { PassengerInfoPage } from '../pages/PassengerInfoPage';
import { SliderPage } from '../pages/PriceRangeSlider';

import { AbhiBusFlightsPage } from '../pages/FlightHomePage';
import { FlightSelectionPage } from '../pages/FlightSelectionPage';
import { FlightPassengerInfoPage } from '../pages/FlightPassengerInfoPage';
import { FlightSeatSelectionPage } from '../pages/FlightSeatSelection';
import { PaymentPage } from '../pages/PaymentPage';

type Fixtures = {
  homePage: AbhiBusHomePage;
  busfilter: BusSelectionPage;
  passengerInfoPage: PassengerInfoPage;
  priceSlider: SliderPage;
  flightsPage: AbhiBusFlightsPage;
  flightFilter: FlightSelectionPage;
  flightPassengerInfoPage: FlightPassengerInfoPage;
  seatSelectionPage: FlightSeatSelectionPage;
  paymentpage: PaymentPage;
};

export const test = base.extend<Fixtures>({
  homePage: async ({ page }, use) => {
    await use(new AbhiBusHomePage(page));
  },
  busfilter: async ({ page }, use) => {
    await use(new BusSelectionPage(page));
  },
  passengerInfoPage: async ({ page }, use) => {
    await use(new PassengerInfoPage(page));
  },
  priceSlider: async ({ page }, use) => {
    await use(new SliderPage(page));
  },
  flightsPage: async ({ page }, use) => {
    await use(new AbhiBusFlightsPage(page));
  },
  flightFilter: async ({ page }, use) => {
    await use(new FlightSelectionPage(page));
  },
  flightPassengerInfoPage: async ({ page }, use) => {
    await use(new FlightPassengerInfoPage(page));
  },
  seatSelectionPage: async ({ page }, use) => {
    await use(new FlightSeatSelectionPage(page));
  },
  paymentpage: async ({ page }, use) => {
    await use(new PaymentPage(page));
  },
});

export { expect };