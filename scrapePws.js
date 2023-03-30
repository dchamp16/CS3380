const fs = require("fs");
const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  for (let i = 1; i <= 100; i++) {
    let url = `https://www.passwordrandom.com/most-popular-passwords/page/${i}`;
    await page.goto(url);
    console.log(url);
    const data = await page.evaluate(() => {
      const tds = Array.from(
        document.querySelectorAll("table tr td:nth-child(2)")
      );
      return tds.map((td) => td.innerText);
    });
    let arrayPasswords = []; //TODO need to combine all array
    let count = 1;
    data.forEach((password) => {
      arrayPasswords.push({
        page: `Page-${i}`,
        key: count++,
        password: password,
      });
    });

    fs.appendFile(
      "mcupws.json",
      JSON.stringify(arrayPasswords, null, 2),
      (err) => (err ? console.log(err) : console.log(`Page ${i} done`))
    );
  }

  await browser.close();
})();
