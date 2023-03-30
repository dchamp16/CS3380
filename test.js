const fs = require("fs");
const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch(); // open a browser
  const page = await browser.newPage(); //launch a new page

  for (let i = 1; i <= 100; i++) {
    let url = `https://www.passwordrandom.com/most-popular-passwords/page/${i}`; //page
    await page.goto(url); // go to https://www.passwordrandom.com/most-popular-passwords
    console.log(url);
    /* get the result from the table */
    const data = await page.evaluate(() => {
      const tds = Array.from(
        document.querySelectorAll("table tr td:nth-child(2)")
      );
      return tds.map((td) => td.innerText);
    });
    console.log(tds);
    /* --------------------------- */
    let arrayPasswords = []; // create a array holder for password object

    /* pushes all information to arrayPassowrds as a object*/
    data.forEach((password, key) => {
      arrayPasswords.push({ key: key, password: password });
    });
    /* -------------------------- */
    fs.appendFile("test.txt", JSON.stringify(arrayPasswords), (err) =>
      err ? console.log(err) : console.log("file written")
    );
  }

  await browser.close();
})();
