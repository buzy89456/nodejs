const axios = require("axios");
const fs = require("fs/promises");

(async () => {
  try {
    let data = await fs.readFile("stock.txt", "utf-8");
    // console.log(data);
    let stockNo = data;
    let date = "202211";
    let response = await axios.get(`http://54.71.133.152:3000/stocks`, {
      params: {
        stockNo,
        date,
      },
    });
    console.log(response.data);
  } catch (e) {
    console.error(e);
  }
})();
