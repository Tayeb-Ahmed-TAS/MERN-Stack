// Every function tests whether all elements in the array pass the test implemented by the provided function
// It returns a boolean value (true or false)
// It returns true if all elements pass the test, otherwise it returns false
// It does not modify the original array
// It's like Logical AND operation

let num = [2, 4, 6, 8, 10];

let isEven = num.every((el) => {
  return el % 2 == 0;
});

console.log(isEven); // true

let num2 = [1, 2, 3, 4, 5];

let isOdd = num2.every((el) => {
  return el % 2 != 0;
});

console.log(isOdd); // false
