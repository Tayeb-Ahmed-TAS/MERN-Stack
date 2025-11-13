// Allows a function to take an indefinite numbers of arguments and bundle them in an array

function demo(...args) {
  for (let i = 0; i < args.length; i++) {
    console.log("You Passed: ", args[i]);
  }
}

console.log(demo(1, 2, 3, 4, 5)); // You Passed:  1 You Passed:  2 You Passed:  3 You Passed:  4 You Passed:  5

function sum(...nums) {
  return nums.reduce((sum, el) => sum + el);
}

console.log(sum(1, 2, 3, 4, 5)); // 15

function min(...nums) {
  return nums.reduce((min, el) => {
    if (min > el) {
      return el;
    } else {
      return min;
    }
  });
}

console.log(min(12, 445, -20, 123)); // -20

function max(msg, ...nums) {
  console.log(msg);
  return nums.reduce((max, el) => {
    return max > el ? max : el;
  });
}

console.log(max("Maximum Number: ", 12, 445, -20, 123)); // Maximum Number:  445

// Note: Rest parameter must be the last parameter in the function definition
