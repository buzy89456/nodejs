let doWorkPromise = function (job, timer) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let now = new Date();
      resolve(`完成工作 ${job} at ${now.toISOString()}`);
    }, timer);
  });
};

let now = new Date();
console.log(`工作開始 at ${now.toISOString()}`);

// await沒有內建錯誤處理機制，因此用try catch
// await --> 暫停鍵
async function doJob() {
  try {
    let result1 = await doWorkPromise("刷牙", 3000);
    console.log("這是 await 後的結果1", result1);

    let result2 = await doWorkPromise("吃早餐", 5000);
    console.log("這是 await 後的結果2", result2);

    let result3 = await doWorkPromise("寫功課", 3000);
    console.log("這是 await 後的結果3", result3);
  } catch (e) {
    console.error("發生錯誤了", e);
  }
}
doJob();
console.log("after");
