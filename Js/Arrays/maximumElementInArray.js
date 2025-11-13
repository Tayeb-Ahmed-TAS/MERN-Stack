let arr = [2, 3, 4, 5, 3, 4, 7, 8, 11, 9, 1, 2];

// Using for loop

console.log("Using for loop ...");

let max = -1;

for (let i = 0; i < arr.length; i++) {
  if (arr[i] > max) {
    max = arr[i];
  }
}

console.log(max); // 11

// Using reduce method

console.log("Using reduce method ...");

let maxVal = arr.reduce((max_val, el) => {
  if (el > max_val) {
    return el;
  } else {
    return max_val;
  }
});

console.log(maxVal); // 11

// Using Math.max and spread operator

console.log("Using Math.max and spread operator ...");

let maxElement = Math.max(...arr); // Spread operator (...) spreads the elements of the array as individual arguments to the Math.max function

console.log(maxElement); // 11
