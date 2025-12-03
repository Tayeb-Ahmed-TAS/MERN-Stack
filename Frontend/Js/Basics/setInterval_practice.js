// Write a function that prints "Hello, World!" 5 times at intervals of 2s each.

let count = 1;

let id = setInterval(() => {
  console.log(`${count}. Hello, World!`);
  count++;
}, 2000);

setTimeout(() => {
  clearInterval(id);
  console.log("Interval cleared");
}, 10000);
