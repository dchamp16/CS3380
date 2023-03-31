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


/*
In this example, we first launch a new instance of Puppeteer, navigate to a web page, and then use the page.$$ method to select all <td> elements on the page. We then loop through each <td> element and use the getProperty method to get its text content. Finally, we log the text content to the console.

Note that this is just a basic example, and there are many other ways to use Puppeteer to select and interact with specific elements on a page.


 */