// Some function tests whether at least one element in the array passes the test implemented by the provided function
// It returns a boolean value (true or false)
// It returns true if at least one element passes the test, otherwise it returns false
// It does not modify the original array
// If no function is provided, it sums the elements as they are
// It's like Logical OR operation

let num = [1, 2, 3, 4, 5];

let arrnum = num.some((el) => {
  return el % 2 == 0;
});

console.log(arrnum); // true
