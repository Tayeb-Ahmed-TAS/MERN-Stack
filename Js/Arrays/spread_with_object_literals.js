const data = {
  email: "example@example.com",
  password: "@abcd1234",
};

const dataCopy = {
  id: 123,
  ...data,
  country: "USA",
};

console.log(dataCopy); // { id: 123, email: 'example@example.com', password: '@abcd1234', country: 'USA' }

let arr = [1, 2, 3, 4, 5];

let arrCopy = { ...arr };

console.log(arrCopy); // { '0': 1, '1': 2, '2': 3, '3': 4, '4': 5 }

// here key is index of array and value is the element at that index

let obj2 = { ..."Hello" };

console.log(obj2); // { '0': 'H', '1': 'e', '2': 'l', '3': 'l', '4': 'o' }

// here key is index of string and value is the character at that index
