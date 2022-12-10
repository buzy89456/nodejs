const fs = require("fs");

// error-first callback
let p = new Promise((resolve, reject) => {
  fs.readFile("test.txt", "utf-8", function (err, data) {
    if (err) {
      // 如果 err 有值，表示有錯誤發生
      // 這裡應該要處理錯誤
      //   console.error(err);
      reject(err);
    } else {
      // 進來這裡，表示 err 是空的 (可能是 null)
      // console.log("成功獨到資料:", data);
      resolve(data);
    }
  });
});

p.then((data) => {
  console.log("成功獨到資料:", data);
}).catch((err) => {
  console.error(err);
});
