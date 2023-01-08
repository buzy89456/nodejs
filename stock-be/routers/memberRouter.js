const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  if (req.session.member) {
    // 表示登入過
  } else {
  }
});
