const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After, setDefaultTimeout} = require("cucumber");
const { clickElements, getText } = require("../../lib/commands.js");

setDefaultTimeout(80000);

Before(async function () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

  Given('user opened the movie schedule page', async function () {
  await this.page.goto('https://qamid.tmweb.ru/client/index.php');
  
});

  When('user selects Thursday and a movie', async function () {
  const cellThursday = "a:nth-child(4)";
  await clickElements(this.page, cellThursday);
  const film = ".movie-seances__time[href='#'][data-seance-id='217']";
  await clickElements(this.page, film);
});

  When('user selects an empty seat', async function () {
  const seat = await this.page.$("div.buying-scheme__wrapper div:nth-child(1) span:nth-child(1)");
  if (seat) {
    await seat.click();
  } else {
    throw new Error('Все места заняты');
  }
});

  When('user confirms the reservation', async function () {
  const reserveButton = ".acceptin-button";
  await clickElements(this.page, reserveButton);

});

  When('user clicks get the code', async function () {
    await clickElements(this.page, ".acceptin-button");
  });
  

  Then('user sees the text {string}', async function (string) {
    const actualText = await getText(this.page, "ticket__check-title");
    const expectedText = await string;
    expect(actualText).contains(expectedText);
  });

  When('user selects Friday and a movie', async function () {
    const cellFriday = "a:nth-child(5)";
    await clickElements(this.page, cellFriday);
    const film2 = ".movie-seances__time[href='#'][data-seance-id='198']";
    await clickElements(this.page, film2);
  });
  
  When('user selects an empty seat vip', async function () {
    const seat2 = await this.page.$("div[class='buying-scheme__wrapper'] div:nth-child(1) span:nth-child(1)");
    if (seat2) {
      await seat2.click();
    } else {
      throw new Error('Все места заняты');
    }});

  When('user selects Sunday and a movie', async function () {
    await clickElements(this.page, "a:nth-child(7)");
    await clickElements(this.page,"a[href='#'][data-seance-id='225']");
      });
      
  When('user selects an empty vip chair', async function () {
    const seatSelector2 = "div:nth-child(9) span:nth-child(1)";
    const seat2 = await this.page.$(seatSelector2);
    if (seat2) {
      await seat2.click();
      } else {
        throw new Error('Все места заняты');
      }});

  When('the user returns to the booking page and selects the same Sunday and movie', async function () {
    await this.page.goto("https://qamid.tmweb.ru/client/index.php", { waitUntil: "networkidle2" });
    const cellSunday = "a:nth-child(7)";
    await clickElements(this.page, cellSunday);
    await clickElements(this.page, film3);
    });

  Then('the VIP chair should be disabled for reservation', async function () {
    const reservedChairVIP = await this.page.$("div:nth-child(9) span:nth-child(1)");
    if (reservedChairVIP) {
      await clickElements(this.page, reservedChairVIP);
    }
    const isDisabled = await this.page.$eval(".acceptin-button", button => button.disabled);
    expect(isDisabled).to.equal(true);
    });
