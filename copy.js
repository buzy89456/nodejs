let fruits = ["apple", "banana", "peach"];
// 左邊中括號不是陣列的意思，是比較位置
let [fruit1, fruit2] = fruits;
console.log(fruit1, fruit2);

// 讓a跟b的值交換
let a = 1;
let b = 3;
// let temp = a
// a = b
// b = temp
[a, b] = [b, a];
console.log(a, b);

// 傳址, 傳值
let person = {
  name: "Ian",
  age: 25,
  city: "Taiwan",
};
let another = { ...person, age: 28 };
console.log(another.age);
console.log(person.age);
console.log(another);

let c = {
  name: "John",
  age: 25,
};
let d = c;
c.age = 28;
console.log(d.age);

let e = {
  name: "John",
  age: 25,
};
let f = { age: 28 };
console.log(e.age);

let g = {
  name: "John",
  age: 25,
  address: {
    zip: 123,
    city: "abc",
  },
};
let h = { ...g };
console.log(g);
