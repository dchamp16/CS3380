const fs = require("fs");
const puppeteer = require("puppeteer");

let arrayPasswords = [];

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  //loop change from 100 to 5 for testing purposes need to change back when done
  for (let i = 1; i <= 5; i++) {
    let url = `https://www.passwordrandom.com/most-popular-passwords/page/${i}`;
    await page.goto(url);
    console.log(url); //print each url
    /* gets the td value per page */
    const data = await page.evaluate(() => {
      const tds = Array.from(
        document.querySelectorAll("table tr td:nth-child(2)")
      );
      return tds.map((td) => td.innerText);
    });
    /* ----------------- */

    let count = 1;
    data.forEach((password) => {
      arrayPasswords.push({
        page: `Page-${i}`,
        key: count++,
        password: password,
      });
    });
    // let combinePass = [];
    // combinePass.push(arrayPasswords);
    // let scrapedPass = combinePass.flat();

    // console.log(scrapedPass);
    fs.appendFile(
      "mcupws.json",
      JSON.stringify(arrayPasswords, null, 2),
      (err) => (err ? console.log(err) : console.log(`Page ${i} done`))
    );
  }

  await browser.close();
})();
