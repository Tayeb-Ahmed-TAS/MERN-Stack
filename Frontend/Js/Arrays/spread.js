// Spread operator (...) allows an iterable such as an array to be expanded in places where zero or more arguments are expected.

let nums = [1, 2, 3, 4, 5];

console.log(...nums); // Output: 1 2 3 4 5

let maxNum = Math.max(...nums);

console.log(maxNum); // Output: 5

let minNum = Math.min(...nums);

console.log(minNum); // Output: 1

console.log(..."Taskin Tabassum Shorna");

let arr1 = ["T", "a", "s", "k", "i", "n"];

let arr2 = ["T", "a", "b", "a", "s", "s", "u", "m"];

let arr3 = ["S", "h", "o", "r", "n", "a"];

let combinedArr = [...arr1, ...arr2, ...arr3];

console.log(combinedArr); // Output: ['T', 'a', 's', 'k', 'i', 'n', 'T', 'a', 'b', 'a', 's', 's', 'u', 'm', 'S', 'h', 'o', 'r', 'n', 'a']
