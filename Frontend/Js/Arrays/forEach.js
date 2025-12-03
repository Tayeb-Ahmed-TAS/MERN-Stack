// Less used -> More Used (for of)

// forEach -> It is a method of array
// It takes a callback function as an argument
// It calls that callback function for each element in the array
// It does not return anything (undefined)

let arr = [1, 2, 3, 4, 5];

let print = function (el) {
  console.log(el);
};

arr.forEach(print);

// or,

arr.forEach(function (el) {
  console.log(el);
});

// or,

arr.forEach((el) => {
  console.log(el);
});

// Example -> 2 (Array of Objects)

let students = [
  { name: "John", marks: 95 },
  { name: "Jane", marks: 85.4 },
  { name: "Jim", marks: 75 },
  { name: "Jill", marks: 65 },
];

students.forEach((student) => {
  console.log(student);
});

students.forEach((student) => {
  console.log(student.marks);
});
