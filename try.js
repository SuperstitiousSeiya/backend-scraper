const {extractId} = require('./func/extra')
 async function getData(page, length) {
  try {
    const start = (page - 1) * length; // Calculate the start index based on the page and length
    const response = await fetch(
      `https://csc.gov.ph/career/inc/server_processing.php?draw=${page}&columns%5B0%5D%5Bdata%5D=0&columns%5B0%5D%5Bsearchable%5D=true&columns%5B0%5D%5Borderable%5D=true&columns%5B1%5D%5Bdata%5D=2&columns%5B1%5D%5Bsearchable%5D=true&columns%5B1%5D%5Borderable%5D=true&columns%5B2%5D%5Bdata%5D=2&columns%5B2%5D%5Bsearchable%5D=true&columns%5B2%5D%5Borderable%5D=true&columns%5B3%5D%5Bdata%5D=3&columns%5B3%5D%5Bsearchable%5D=true&columns%5B3%5D%5Borderable%5D=true&columns%5B4%5D%5Bdata%5D=4&columns%5B4%5D%5Borderable%5D=true&columns%5B5%5D%5Borderable%5D=true&columns%5B6%5D%5Borderable%5D=true&columns%5B7%5D%5Bdata%5D=7&columns%5B7%5D%5Bsearchable%5D=true&columns%5B7%5D%5Borderable%5D=true&order%5B0%5D%5Bcolumn%5D=4&order%5B0%5D%5Bdir%5D=desc&start=${start}&length=${length}&search%5Bvalue%5D=&_=1716166650831`,
      {
        headers: {
          accept: "application/json, text/javascript, */*; q=0.01",
          "accept-language": "en-US,en;q=0.9",
          priority: "u=1, i",
          "sec-ch-ua":
            '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Windows"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "x-requested-with": "XMLHttpRequest",
        },
        referrerPolicy: "no-referrer",
        body: null,
        method: "GET",
        mode: "cors",
        credentials: "include",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();

    const processedData = data.data.map((row) => {
        const buttonHtml = row[6]; // Assuming the button is always at index 6
        const id = extractId(buttonHtml);
        return {
          department: row[0],
          region: row[1],
          position: row[2],
          itemNumber: row[3],
          startDate: row[4],
          endDate: row[5],
          school: row[7],
          buttonId: id,
        };
      });
      
    
    return {
      ...data,
      data: processedData,
    };

  } catch (error) {
    console.error(error);
    return { error: error.message }; // Return error message in case of failure
  }
}

module.exports = {
  getData,
};
