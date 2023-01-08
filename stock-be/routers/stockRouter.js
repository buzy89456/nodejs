const express = require('express');
const router = express.Router();
const pool = require('../utils/db');

function singleMiddleware(req, res, next) {
  console.log('我是 single 中間件');
  next();
}

router.get('/', singleMiddleware, async (req, res, next) => {
  // let results = await connection.query('SELECT * FROM stocks');
  // let data = results[0];

  console.log('這裡是/api/stocks');
  let [data] = await pool.execute('SELECT * FROM stocks');
  res.json(data);
});

// localhost:3001/api/stocks/2330
// req.params.stockId => 2330
// SELECT * FROM stock_prices WHERE stock_id=2330

// sql injection
// localhost:3001/api/stocks/1234 or 1=1;--
// req.params.stockId => 1234 or 1=1;--
// SELECT * FROM stock_prices WHERE stock_id=1234 or 1=1;--
router.get('/:stockId', async (req, res, next) => {
  console.log('/api/stocks/:stockId', req.params.stockId);

  // TODO: 分頁
  // 從前端拿到目前是要第幾頁
  // 通常會放在 query string -> req.query.page
  // /api/stocks/:stockId?page=2
  // /api/stocks/:stockId -> 如果 page 沒有寫，預設使用者是要第一頁
  const page = req.query.page || 1;

  // 總筆數？
  let [results] = await pool.execute(
    'SELECT COUNT(*) AS total FROM stock_prices WHERE stock_id=?',
    [req.params.stockId]
  );
  // console.log('GET /stocks/details -> count:', results);
  // GET /stocks/details -> count: [ { 'COUNT(*)': 34 } ]
  // GET /stocks/details -> count: [ { total: 34 } ]  (AS total)
  // console.log('GET /stocks/details -> count:', results[0].total);
  // GET /stocks/details -> count: 34
  const total = results[0].total;

  // 總共有幾頁
  const perPage = 5; // 一頁五筆
  const totalPage = Math.ceil(total / perPage);

  // 計算 offset, limit (一頁有幾筆)
  const limit = perPage;
  const offset = perPage * (page - 1);

  // 根據 offset, limit 去取得資料
  let [data] = await pool.execute(
    'SELECT * FROM stock_prices WHERE stock_id=? ORDER BY date LIMIT ? OFFSET ?',
    [req.params.stockId, limit, offset]
  );

  // 把資料回覆給前端
  res.json({
    pagination: {
      total,
      perpage: perPage, // 變數名稱跟變數一樣可以直接寫 perpage 就好
      totalPage,
      page,
    },
    data: data,
  });

  // 會用 prepared statement 的方式來避免發生 sql injection
  // result [data, fields] 前面是資料，後面是資料的形容
  // let [data] = await pool.query('SELECT * FROM stock_prices WHERE stock_id=?', [
  //   req.params.stockId,
  // ]);
  // res.json(data);
});

router.post('/', async (req, res) => {
  console.log('POST /api/stocks', req.body);
  // req.body.stockId, req.body.stockName;
  let results = await pool.query('INSERT INTO stocks (id,name) VALUES (?,?)', [
    req.body.stockId,
    req.body.stockName,
  ]);
  console.log(results);
  res.json(results);
});

module.exports = router;
