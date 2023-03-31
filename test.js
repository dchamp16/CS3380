const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://example.com');

  const tds = await page.$$('td'); // select all td elements

  for (let i = 0; i < tds.length; i++) {
    const tdContent = await tds[i].getProperty('textContent');
    console.log(await tdContent.jsonValue());
  }

  await browser.close();
})();
