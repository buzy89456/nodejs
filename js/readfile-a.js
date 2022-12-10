const fs = require("fs");

let p = new Promise((resolve, reject) => {
  // error-first callback
  fs.readFile("test.txt", "utf-8", (err, data) => {
    if (err) {
      reject(err);
    } else {
      resolve(data);
    }
  });
});

// async function doJob() {
//   let data = await p;
// }

// 函式名稱() -> 呼叫
// doJob();

// IIEF
// 前面的小括號把他們括起來為一組，後面小括號呼叫函式
(function test() {})();

(async () => {
  try {
    let data = await p;
    console.log("用 await 拿到的結果", data);
  } catch (e) {
    console.error("catch 到的錯誤", e);
  }
})();
