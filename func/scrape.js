const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const { wait } = require("./extra");

async function scrapeWebsite() {
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--no-sandbox"],
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36",
  });
  const page = await browser.newPage();

  await page.setCookie({
    name: "cookieName",
    value: "cookieValue",
    domain: "example.com",
  });
  await page.goto("https://csc.gov.ph/career/");

  await page.waitForSelector("#jobs > tbody tr");
  await page.waitForSelector("#jobs_paginate");

  await page.click('#jobs_paginate span .paginate_button[data-dt-idx="3"]');

  await wait(3000);
  await page.waitForSelector("#jobs_paginate");
  await page.waitForSelector("#jobs > tbody tr");

  const html = await page.content();

  const $ = cheerio.load(html);

  const dataList = [];
  $("#jobs > tbody tr").each((index, element) => {
    const rowData = [];
    $(element)
      .find("td")
      .each((i, el) => {
        rowData.push($(el).text().trim());
      });

    const actionCell = $(element).find("td");
    const buttonId = actionCell.find("button").attr("id");

    const jobData = {
      agency: rowData[0],
      region: rowData[1],
      positionTitle: rowData[2],
      plantillaNo: rowData[3],
      postingDate: rowData[4],
      closingDate: rowData[5],
      actionButtonId: buttonId, // Assuming this is the ID of the button
    };

    dataList.push(jobData);
  });

  await browser.close();

  return dataList;
}

module.exports = {
  scrapeWebsite,
};
