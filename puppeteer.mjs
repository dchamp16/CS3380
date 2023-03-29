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
    console.log(key, password);
    passwords.push({ key: key, password: password });
  });
  console.log(passwords);
  await browser.close();
})();
