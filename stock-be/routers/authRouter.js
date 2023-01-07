const express = require('express');
const router = express.Router();

router.post('/register', (req, res, next) => {
  //TODO: 驗證資料 -> 因為後端不可以相信來自前端的資料
  //TODO: 處理驗證的結果

  res.json({ name: 'John', age: 21 });
});

module.exports = router;
