let sum = (a, b) => {
  return a + b;
};

console.log(sum(2, 3)); // Output: 5

// #######################################################################################

let square = (x) => x * x;

console.log(square(4)); // Output: 16

// #######################################################################################

let greet = () => "Hello, World!";

console.log(greet()); // Output: Hello, World!

// #######################################################################################

let numbers = [1, 2, 3, 4, 5];

let doubled = numbers.map((n) => n * 2);

console.log(doubled); // Output: [2, 4, 6, 8, 10]

// #######################################################################################

let filtered = numbers.filter((n) => n % 2 === 0);

console.log(filtered); // Output: [2, 4]

// #######################################################################################

let total = numbers.reduce((acc, n) => acc + n, 0);

console.log(total); // Output: 15

// #######################################################################################

let obj = {
  value: 10,
  increment: function () {
    setTimeout(() => {
      this.value++;
      console.log(this.value); // Output: 11
    }, 1000);
  },
};

obj.increment();
// Note: The arrow function inside setTimeout retains the 'this' context of 'obj'

// #######################################################################################

let power = (base, power) => {
  return base ** power;
};

console.log(power(2, 8)); // Output: 256

// #######################################################################################
