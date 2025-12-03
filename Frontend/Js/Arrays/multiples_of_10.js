// Check if all numbers in our array are multiples of 10 or not

let arr = [10, 20, 30, 40, 50];

let ans = arr.every((el) => {
  return el % 10 == 0;
});

console.log(ans); // true
