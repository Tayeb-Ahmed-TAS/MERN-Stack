// Storing values of array into multiple variables

let names = ["Tony", "Steve", "Bruce", "Natasha", "Peter"];

let [winner, runnerUp, ...others] = names;

console.log(winner); // Tony
console.log(runnerUp); // Steve
console.log(others); // [ 'Bruce', 'Natasha', 'Peter' ]
console.log(others.length); // 3

// Skipping some values while destructuring

let [first, , , fourth] = names;

console.log(first); // Tony
console.log(fourth); // Natasha
// Here we skipped 2nd and 3rd values
// We can skip any number of values
// Just put commas for the values you want to skip

// Swapping values using destructuring

let a = 5;
let b = 10;

[a, b] = [b, a];

console.log(a); // 10
console.log(b); // 5
