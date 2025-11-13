const students = {
  name: "Tony",
  age: 14,
  class: 9,
  subjects: ["English", "Math", "Science", "Higher Math"],
  username: "example@example.com",
  password: "@abcd1234",
  State: "Virginia",
};

let { username, password } = students; // It will find keys with same name as variable name and store the value in that variable

console.log(username); // example@example.com
console.log(password); // @abcd1234

let {
  name: studentName,
  age: studentAge,
  city = "Roanoke",
  State = "NYC",
} = students; // Here we are using different variable names than the key names in the object
console.log(studentName); // Tony
console.log(studentAge); // 14
console.log(city); // Roanoke (default value as key 'city' is not present in object)
console.log(State); // Virginia (value from object as key 'State' is present in object)

// We can also set default values while destructuring
// If key is not present in object then default value will be assigned to variable
