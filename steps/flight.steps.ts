import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { AbhiBusHomePage } from "../pages/AbhiBusHomePage";
import { AbhiBusFlightsPage } from "../pages/FlightHomePage";

let homePage: AbhiBusHomePage;
let flightsPage: AbhiBusFlightsPage;

Given("the user is on the AbhiBus homepage", async function () {
  homePage = new AbhiBusHomePage(this.page);
  await homePage.AbhiBusURL();
});

When("the user opens the Flights tab", async function () {
  flightsPage = new AbhiBusFlightsPage(this.page);
  await flightsPage.goToFlightsTab();
});

When(
  "the user selects origin {string} and {string}",
  async function (originCity: string, originAirport: string) {
    await flightsPage.selectOrigin(originCity, originAirport);
  }
);

When(
  "the user selects destination {string} and {string}",
  async function (destinationCity: string, destinationAirport: string) {
    await flightsPage.selectDestination(destinationCity, destinationAirport);
  }
);

When("the user selects departure date {string}", async function (departureDate: string) {
  await flightsPage.selectDepartureDate(departureDate);
});

When("the user selects {number} adult traveller", async function (adultsCount: number) {
  await flightsPage.setTravellers(Number(adultsCount));
});

When("the user searches flights", async function () {
  await flightsPage.pressSearchButton();
});

Then("the user should see flight search results", async function () {
  await expect(this.page).toHaveURL(/flight/i, { timeout: 20000 });
});