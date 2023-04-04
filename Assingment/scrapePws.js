const fs = require("fs");
const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  let objPass = {};
  let arrPassContainer = [];
  let spinner = makeCounter();
  for (let i = 1; i <= 100; i++) {
    spinner.tick();
    let url = `https://www.passwordrandom.com/most-popular-passwords/page/${i}`;
    await page.goto(url);
    // console.log(`${url} Printing`);
    const tdElements = await page.$$eval("table tr td:nth-child(2)", (tds) =>
      tds.map((td) => td.textContent.trim())
    );
    arrPassContainer.push(tdElements);
    spinner.clear();
  }
  let flattendArr = arrPassContainer.flat();
  const filteredArr = flattendArr.filter((data) => /^[a-zA-Z0-9]+$/.test(data));
  let passwords = Object.assign(objPass, filteredArr);

  fs.writeFileSync("mcupws.json", JSON.stringify(passwords), (err) =>
    err ? console.log(err) : console.log(`Print done`)
  );

  await browser.close();
})();

function makeCounter() {
  const spinningChars = `|/-\\`;
  let n = 0;
  function clear() {
    process.stdout.write(`\r`);
  }
  function tick() {
    let animate = `\r${spinningChars[n % spinningChars.length]}`;
    if (n % 3 === 0) process.stdout.write(`${animate}LOADING${animate}`);
    n++;
  }
  return { tick, clear };
}
