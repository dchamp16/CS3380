const fs = require("fs");
const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  let count = 1;
  let arrPassContainer = [];
  for (let i = 1; i <= 5; i++) {
    let url = `https://www.passwordrandom.com/most-popular-passwords/page/${i}`;
    await page.goto(url);
    console.log(`${url} Printing`);
    const tdElements = await page.$$eval("table tr td:nth-child(2)", (tds) =>
      tds.map((td) => td.textContent.trim())
    );
    arrPassContainer.push({ key: count++, password: tdElements });
  }
  let passwords = arrPassContainer.flat().sort();
  // console.log(passwords);
  fs.appendFile("mcupws.json", JSON.stringify(passwords), (err) =>
    err ? console.log(err) : console.log(`Print done`)
  );
  // console.log(arrPassContainer);

  await browser.close();
})();
