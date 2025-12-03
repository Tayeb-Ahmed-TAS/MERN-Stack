// Map function takes a function and applies it to every element in the array and returns a new array
// It does not modify the original array
// The size of the new array is the same as the original array

let num = [1, 2, 3, 4, 5];

let square = num.map((el) => {
  return el * el;
});

console.log(square); // [1, 4, 9, 16, 25]

let students = [
  { name: "John", marks: 95 },
  { name: "Jane", marks: 85.4 },
  { name: "Jim", marks: 75 },
  { name: "Jill", marks: 65 },
];

let gpa = students.map((el) => {
  return el.marks / 10;
});

console.log(gpa); // [9.5, 8.54, 7.5, 6.5]
