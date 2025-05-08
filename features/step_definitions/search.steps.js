const puppeteer = require('puppeteer');
const { clickElements, getText, findAndClickFreeSeat } = require("../../lib/commands.js");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After, setDefaultTimeout } = require("cucumber");

let browser;
let page;

setDefaultTimeout(80000);

Before(async () => {
  browser = await puppeteer.launch({ headless: false });
});

After(async () => {
  await browser.close();
});

Given('user opened the movie schedule page', async () => {
  page = await browser.newPage();
  await page.goto("https://qamid.tmweb.ru/client/index.php", { waitUntil: "networkidle2" });
  const expectedTitle = "Идёмвкино";
  const actualTitle = await getText(page, ".page-header__title");
  expect(actualTitle).to.equal(expectedTitle);

});

When('user selects the standard chair for the film', async () => {
  const daySelector = "nav > a:nth-child(4)";
  await clickElements(page, daySelector);
  const filmSelector = ".movie-seances__time[href='#'][data-seance-id='217']";
  await clickElements(page, filmSelector);
  await findAndClickFreeSeat(page, ".buying-scheme__chair:not(.buying-scheme__chair_taken)");
});

When('user selects the VIP chair for the film', async () => {
  const daySelector = "nav > a:nth-child(4)";
  await clickElements(page, daySelector);
  const filmSelectorVIP = ".movie-seances__time[href='#'][data-seance-id='198']";
  await clickElements(page, filmSelectorVIP);
  await findAndClickFreeSeat(page, ".buying-scheme__chair_vip:not(.buying-scheme__chair_taken)");
});

When('user reserves the chair', async () => {
  const reserveButtonSelector = ".acceptin-button";
  await page.waitForSelector(reserveButtonSelector);
  await clickElements(page, reserveButtonSelector);
  const confirmButtonSelector = '.acceptin-button';
  await page.waitForSelector(confirmButtonSelector);
  await clickElements(page, confirmButtonSelector);
});

Then('user should see the confirmation message {string}', async (expectedMessage) => {
  const ticketConfirmationSelector = ".ticket__check-title";
  const actualMessage = await getText(page, ticketConfirmationSelector);
  expect(actualMessage).to.equal(expectedMessage);
});

When('user try to select an unavailable movie', async function () {
  const selector = ".movie-seances__time.acceptin-button-disabled";
  const buttonsToPress = await page.$$(selector);
  if (!buttonsToPress || buttonsToPress.length === 0) {
    throw new Error(`Did not find selector: ${selector}`);
  }
  await buttonsToPress[0].click();
});

Then('user should remain on the movie selection page and see {string}', async function (expectedText) {
  const actualText = await getText(
    page,
    "body main section:nth-child(1) div:nth-child(1) div:nth-child(2) h2:nth-child(1)"
  );
  expect(actualText).to.include(expectedText);
});
