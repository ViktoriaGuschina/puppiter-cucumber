const puppeteer = require('puppeteer');
const { clickElements, getText, findAndClickFreeSeat } = require("./lib/commands");

let page;
 
beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("https://qamid.tmweb.ru/client/index.php", {waitUntil: "networkidle2",});
    const expected = "Идёмвкино";
    const actual = await getText(page, ".page-header__title" );
    expect(actual).toBe(expected);
}, 10000);

afterEach(() => {
   page.close();
});

describe("successful ticket booking", () => {
  test("booking standard chair", async () => {
    const day = "nav > a:nth-child(4)";
    await clickElements(page, day);
    const film = ".movie-seances__time[href='#'][data-seance-id='217']";
    await clickElements(page, film);
    await findAndClickFreeSeat(page, ".buying-scheme__chair:not(.buying-scheme__chair_taken)");
    const reserveButton = ".acceptin-button";
    await clickElements(page,reserveButton );
    const reserveCodeButton = ".acceptin-button";
    await clickElements(page, reserveCodeButton);
    const expected = "Вы выбрали билеты:";
    const selectorTicket = ".ticket__check-title";
    const actual = await getText(page, selectorTicket);
    expect(actual).toBe(expected);
}, 40000),

  test("booking vip chair", async () => {
    const day = "nav > a:nth-child(4)";
    await clickElements(page, day);
    const film2 = ".movie-seances__time[href='#'][data-seance-id='198']";
    await clickElements(page, film2);
    await findAndClickFreeSeat(page, ".buying-scheme__chair_vip:not(.buying-scheme__chair_taken)");
    const reserveButton = ".acceptin-button";
    await page.waitForSelector(reserveButton);
    await page.click(reserveButton);
    await page.waitForSelector(".acceptin-button");
    const buttonSelector = '.acceptin-button';
    await page.click(buttonSelector);
    const expected = "Вы выбрали билеты:";
    const selectorTicket = ".ticket__check-title";
    const actual = await getText(page, selectorTicket);
      expect(actual).toBe(expected);
      }, 40000);
    }),

    test("selecting an unavailable movie", async () => {
      const selector = ".movie-seances__time.acceptin-button-disabled";
      const buttonsToPress = await page.$$(selector);
      if (!buttonsToPress || buttonsToPress.length === 0) {
        throw new Error(`Did not find selector: ${selector}`);
      }
      await buttonsToPress[0].click();
      const actual_2 = await getText(
        page,
        "body main section:nth-child(1) div:nth-child(1) div:nth-child(2) h2:nth-child(1)"
      );
      if (!actual_2.includes("Сталкер")) {
        throw new Error(`Expected text to contain "Сталкер", but got: ${actual_2}`);
      }
    });
  