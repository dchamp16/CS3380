const fs = require("fs");
const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch(); // open a browser
  const page = await browser.newPage(); //launch a new page
  const url = `https://www.passwordrandom.com/most-popular-passwords`; //main page
  await page.goto(url); // go to https://www.passwordrandom.com/most-popular-passwords

  //
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
    const nextButton = await page.$(".next a");

    if (!nextButton) {
      break;
    }
    await Promise.all([page.waitForNavigation(), nextButton.click()]);
    fs.appendFile("test.txt", `${JSON.stringify(passwords)}\n`, (err) =>
      err ? console.log(err) : console.log("file written")
    );
  }

  await browser.close();
})();
