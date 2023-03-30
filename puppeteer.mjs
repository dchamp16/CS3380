import puppeteer from "puppeteer";

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`https://www.passwordrandom.com/most-popular-passwords`);

  const data = await page.evaluate(() => {
    const tds = Array.from(
      document.querySelectorAll("table tr td:nth-child(2)")
    );
    return tds.map((td) => td.innerText);
  });
  let passwords = [];
  data.forEach((password, key) => {
    passwords.push({ key: key, password: password });
  });
  console.log(passwords);
  await browser.close();
})();

//----------------------
const puppeteer = require("puppeteer");

async function scrape() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://example.com");

  while (true) {
    await page.waitForSelector('body:contains("example")');
    const word = await page.evaluate(() => {
      return document.body.innerText.match(/example/g)[0];
    });
    console.log(word);
    const nextButton = await page.$("#next-button");
    if (!nextButton) {
      break;
    }
    await nextButton.click();
  }

  await browser.close();
}

scrape();
