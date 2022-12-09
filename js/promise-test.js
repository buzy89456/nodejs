let sentToAirport = false;
let p = new Promise(function (resolve, reject) {
  if (sentToAirport) {
    resolve("sent to airport");
  } else {
    reject("error");
  }
});

p.then(function (msg) {
  console.log(msg);
}).catch(function (msg) {
  console.log(msg);
});

let f = fetch("https://jsonplaceholder.typicode.com/guide/users");
f.then(function (userData) {
  return userData.json(); // 異步執行，用return返還promise到下一個then
}).then(function (jsonData) {
  console.log(jsonData);
});
