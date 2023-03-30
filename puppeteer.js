const fs = require("fs");
const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`https://www.passwordrandom.com/most-popular-passwords`);
  let i = 1;
  while (true) {
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
    await page.waitForTimeout(1000);
    const nextButton = await page.$(".next a");

    if (!nextButton) {
      break;
    }
    await Promise.all([page.waitForNavigation(), nextButton.click()]);
    fs.appendFile("test.txt", JSON.stringify(passwords), (err) =>
      err ? console.log(err) : console.log("file written")
    );
    // console.log(passwords);
  }

  await browser.close();
})();
