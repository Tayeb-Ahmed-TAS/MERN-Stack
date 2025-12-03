// It reduces the array to a single value by executing a reducer function on each element of the array
// It executes the reducer function on each element of the array, resulting in a single output value
// It does not modify the original array
// If no initial value is provided, it uses the first element of the array as the initial value
// It's like summing up all elements in an array
// It has 2 arguments: (accumulator, element)

let nums = [1, 2, 3, 4, 5];

let finalVal = nums.reduce((res, el) => res + el);

console.log(finalVal); // 15
