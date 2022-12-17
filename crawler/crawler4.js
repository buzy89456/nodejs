// axios await 版本
// 把 query string 抽出來當變數，用 params 的方式去設定
// -> 從 stock.txt 讀入股票代碼
// -> 用 moment 取得今日的日期

// 1. 安裝 npm i axios
// 2. 引用 require
// 3. 去讀官方文件
const axios = require('axios');
// fs 是 NodeJS 內建的，所以不用特別安裝
const fs = require('fs/promises');
const { connect } = require('http2');
const moment = require('moment');
const mysql2 = require('mysql2/promise');
require('dotenv').config();

// http://54.71.133.152:3000/stocks?stockNo=2618&date=202211
// 2618, 2330, 2412

(async () => {
  let connection;
  try {
    connection = await mysql2.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PWD,
      database: process.env.DB_NAME,
    });

    let stockNo = await fs.readFile('stock.txt', 'utf-8');
    console.log(stockNo);
    let date = moment().format('YYYYMMDD');
    console.log(date);
    let response = await axios.get(`http://54.71.133.152:3000/stocks`, {
      params: {
        stockNo,
        date,
      },
    });

    console.log('await', response.data);
  } catch (e) {
    console.error(e);
  } finally {
    if (connection) {
      connection.end();
    }
  }
})();
