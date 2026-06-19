import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { AbhiBusHomePage } from '../pages/AbhiBusHomePage';
import { BusSelectionPage } from '../pages/BusSelectionPage';
import { PassengerInfoPage } from '../pages/PassengerInfoPage';
import { PaymentPage } from '../pages/PaymentPage';
import  testData  from "../test-data/testFile.json"
import { getBookingDetails } from '../db/bookingRepository';

let abhiBusHomePage : AbhiBusHomePage;
let busSelectionPage : BusSelectionPage;
let passengerInfoPage: PassengerInfoPage;
let paymentPage: PaymentPage;

Given('User opens AbhiBus home page', async function (this: any) {
  abhiBusHomePage = new AbhiBusHomePage(this.page);
  await abhiBusHomePage.AbhiBusURL();
});

When('User sets from {string} and to {string}', async function (this: any, from: string, to: string) {
  await abhiBusHomePage.fromInputField(from);
  await abhiBusHomePage.toInputField(to);
});

When('User selects date {string}', async function (this: any, date: string) {
  await abhiBusHomePage.selectDate(date);
});

When('User clicks search', async function (this: any) {
  await abhiBusHomePage.pressSearchButton();
});

Then('User should be navigating to Bus selection page', async function (this: any) {
  busSelectionPage = new BusSelectionPage(this.page);
  await expect(busSelectionPage.tabsActions).toBeVisible();
});

Then('Boarding Points tab should be selected by default', async function () {
  await busSelectionPage.boardingPointStatus();
});

When('User selects boarding point Iskcon Circle', async function () {
  await busSelectionPage.selectingBoardingCity();
});

When('User opens Dropping Points tab', async function () {
  await busSelectionPage.droppingPointStatus();
});

When('User selects dropping point Andheri East', async function () {
  await busSelectionPage.selectingDroppingCity();
});

When('User filters buses by AC', async function () {
  await busSelectionPage.busFilter();
});

When('User selects seat number {int}', async function (seatNo: number) {
  await busSelectionPage.selectBusSeat(seatNo);
});

When('User selects bus boarding location', async function () {
  await busSelectionPage.selectBoardingPoint();
});

When('User selects bus dropping location', async function () {
  await busSelectionPage.selectDroppingPoint();
});

Then('User should be navigated to Passenger Information page', async function () {
  passengerInfoPage = new PassengerInfoPage(this.page);
  await expect(passengerInfoPage.MobileNumber).toBeVisible();
});

When('User closes login popup if visible', async function () {
  await passengerInfoPage.ClosingLoginModel();
});

When(
  "User selects Secure addon if available",
  async function () {
    await passengerInfoPage.selectSecureAddonIfPresent();
  }
);

When('User fills passenger information from database', async function () {
  const bookingDetails = await getBookingDetails();

  await passengerInfoPage.FillingUserInfo(
    bookingDetails.contactDetails,
    bookingDetails.passengers
  );
});

Then("User should be navigated to Payment page", async function (this: any) {
  paymentPage = new PaymentPage(this.page);
  await expect(paymentPage.Heading).toBeVisible({ timeout: 20000 });
});

When("User selects UPI payment option", async function () {
  await paymentPage.selectingpaymentOption();
});

When("User generates QR code", async function () {
  await paymentPage.GenerateQRCode();
});

Then("Payment QR code should be visible", async function () {
  await expect(paymentPage.QrImage.locator("svg")).toBeVisible({
    timeout: 15000,
  });
});