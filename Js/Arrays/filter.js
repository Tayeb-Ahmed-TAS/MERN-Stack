// Filter function creates a new array with all elements that pass the test implemented by the provided function
// It does not modify the original array
// The size of the new array is less than or equal to the original array
// If callback function returns true, the element is included in the new array
// If callback function returns false, the element is excluded from the new array

let nums = [1, 2, 3, 4, 7, 8, 2, 9, 10, 12, 11];

let even = nums.filter((el) => {
  return el % 2 == 0;
});

console.log(even); // [2, 4, 8, 2, 10, 12]

let odd = nums.filter((el) => {
  return el % 2 != 0;
});

console.log(odd); // [1, 3, 7, 9, 11]

let moreThan10 = nums.filter((el) => {
  return el > 10;
});

console.log(moreThan10); // [12, 11]
