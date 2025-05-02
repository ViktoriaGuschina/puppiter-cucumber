const puppeteer = require('puppeteer');
const { clickElements, getText } = require("./lib/commands");

let page;
 
beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("https://qamid.tmweb.ru/client/index.php", {waitUntil: "networkidle2",});
    const expected = "Идёмвкино";
    const actual = await getText(page, ".page-header__title" );
    expect(actual).toBe(expected);
});

afterEach(() => {
   page.close();
});


describe("successful ticket booking", () => {
  test("booking standard chair", async () => {
    const cellThursday = "a:nth-child(4)";
    await clickElements(page, cellThursday);
    const film = ".movie-seances__time[href='#'][data-seance-id='217']";
    await clickElements(page, film);
    const seatSelector = "div.buying-scheme__wrapper div:nth-child(1) span:nth-child(1)";
    const searchForFreeWindow = await page.$(seatSelector);
    if (searchForFreeWindow) {
      await searchForFreeWindow.click();
    } else {
      console.log('Все места заняты');
      return;
    }
    const reserveButton = ".acceptin-button";
    await clickElements(page,reserveButton );
    const reserveCodeButton = ".acceptin-button";
    await clickElements(page, reserveCodeButton);
    const expected = "Электронный билет";
    const selectorTicket = ".ticket__check-title";
    const actual = await getText(page, selectorTicket);
    expect(actual).toBe(expected);
}, 40000),

      test("booking vip chair", async () => {
        const cellFriday = "a:nth-child(5)";
        await clickElements(page, cellFriday);
        const film2 = ".movie-seances__time[href='#'][data-seance-id='198']";
        await clickElements(page, film2);
        const searchForFreeWindowVIP = await page.$("div[class='buying-scheme__wrapper'] div:nth-child(1) span:nth-child(1)");
        if (searchForFreeWindowVIP) {
            await searchForFreeWindowVIP.click();
        } else {
            console.log('Все места заняты');
            return;
        };
        const reserveButton = ".acceptin-button";
        await clickElements(page,reserveButton );
        const reserveCodeButton = ".acceptin-button";
        await clickElements(page, reserveCodeButton);
        const expected = "Электронный билет";
        const selectorTicket = ".ticket__check-title";
        const actual = await getText(page, selectorTicket);
        expect(actual).toBe(expected);
      }, 40000);
    })

    test("booking a reserved chair VIP", async () => {
      const cellSunday = "a:nth-child(7)";
        await clickElements(page, cellSunday);
        await clickElements(page, "a[href='#'][data-seance-id='225']");
        const chairVIP = await page.$("div:nth-child(9) span:nth-child(1)");
         if (chairVIP) {
            await chairVIP.click();
        } else {
            console.log('Все места заняты');
            return;
        };
        const reserveButton = ".acceptin-button";
        await clickElements(page,reserveButton );
        const reserveCodeButton = ".acceptin-button";
        await clickElements(page, reserveCodeButton);
        const expected = "Электронный билет";
        const selectorTicket = ".ticket__check-title";
        const actual = await getText(page, selectorTicket);
        expect(actual).toBe(expected);
        await page.goto("https://qamid.tmweb.ru/client/index.php", {waitUntil: "networkidle2",});
        await clickElements(page, cellSunday);
        await clickElements(page, film3);
        const reservedChairVIP = await page.$("div:nth-child(9) span:nth-child(1)");
        await clickElements(page, reservedChairVIP);
        const isDisabled = await page.$eval(reserveButton, (button) => {
            return button.disabled;
            });
            expect(isDisabled).toBe(true);
        }, 40000);