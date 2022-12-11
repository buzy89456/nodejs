let doWorkPromise = function (job, timer) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let now = new Date();
      resolve(`完成工作 ${job} at ${now.toISOString()}`);
      // reject('故意發生錯誤');
    }, timer);
  });
};

let now = new Date();
console.log(`工作開始 at ${now.toISOString()}`);

// 刷牙 -> 吃早餐 -> 寫功課
let brushPromise = doWorkPromise("刷牙", 1000);
// promise chain
// promise hell
// 如果刷牙的結果是沒有牙齒痛 -> 就可以吃早餐 -> 吃完早餐再寫功課
// 如果刷牙的結果是牙齒痛 -> 不能吃早餐、直接寫功課
brushPromise
  .then((data) => {
    console.log("brushPromise", data);
    let eatPromise = doWorkPromise("吃早餐", 3000);
    eatPromise
      .then((data) => {
        console.log("eatPromise", data);
        doWorkPromise("寫功課", 3000)
          .then((data) => {
            console.log("writePromise", data);
          })
          .catch((e) => {
            console.error(e);
          });
      })
      .catch((e) => {
        console.error(e);
      });
  })
  .catch((err) => {
    console.error("發生錯誤", err);
  })
  .finally(() => {
    console.log("我是 Finally");
  });
