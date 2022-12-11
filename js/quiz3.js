async function asyncF() {
  console.log(1);

  new Promise((resolve, reject) => {
    console.log("A");
    setTimeout(() => {
      console.log(2);
      resolve();
    }, 0);
  });

  console.log(3);
}

console.log(4);
asyncF();
console.log(5);
