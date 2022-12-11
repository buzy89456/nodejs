// Promise 是一個表示非同步運算的最終完成或失敗的物件。

// 1. 是一個物件
// 建構式 -> 用來製作一個物件, 例如: Promise
// Promise 建構式的初始值 -> executor
// new Promise(executor)
// executor => 執行者本人也只是一個函式
// function executor(resolve, reject) {}

//let p = new Promise((resolve, reject) => {});

// 2. 非同步工作
// 把原本要做的非同步工作，搬進去執行者裡面
// let p = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     console.log('done');
//   }, 1000);
// });

// 3. 最終完成或失敗
// 最終完成 pending -> fulfilled -> resolve
// 最終失敗 pending -> rejected -> reject

let p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("done");
    // reject('故意失敗一下');
    // 失敗: reject('失敗的理由');
    // console.log('done');
  }, 3000);
});

//------------------
console.log(p); // Promise 物件 <pending>

// then 是接 resolve
// catch 是接 reject
p.then((data) => {
  console.log("這裡是 then", data, p);
}).catch((error) => {
  console.error("這裡是 error", error, p);
});
