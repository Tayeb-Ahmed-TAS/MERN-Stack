# Scope in JavaScript

Variables defined inside a function are not accessible (visible) from outside the function. This is known as function scope.

```javascript

function myFunction() {
  let carName = "Volvo"; // carName is a local variable
  console.log(carName); // This will work
}

myFunction();
console.log(carName); // This will cause an error: carName is not defined
```

In the example above, `carName` is a local variable defined inside `myFunction`. It can be accessed within the function, but trying to access it outside the function results in an error.

Variables defined outside a function are accessible from anywhere in the code, including inside functions. This is known as global scope.

```javascript

let carName = "Volvo"; // carName is a global variable

function myFunction() {
  console.log(carName); // This will work
}

myFunction();

console.log(carName); // This will also work
```

In this example, `carName` is a global variable. It can be accessed both inside and outside the function.

## Types of Scope

1. **Global Scope**: Variables declared outside any function or block have global scope. They can be accessed from anywhere in the code.

2. **Function Scope**: Variables declared within a function are scoped to that function. They cannot be accessed from outside the function.

3. **Block Scope**: Variables declared with `let` or `const` inside a block (e.g., within `{}`) have block scope. They cannot be accessed outside the block.

```javascript

{
  let x = 10; // x is block-scoped
  const y = 20; // y is also block-scoped
  console.log(x); // This will work
  console.log(y); // This will work
}
console.log(x); // This will cause an error: x is not defined
console.log(y); // This will cause an error: y is not defined
```

4. **Lexical Scope**: A variable defined outside a function can be accessible inside another function defined after the variable declaration. The opposite is NOT true.

```javascript

function outerFunction() {
  let outerVar = "I'm outside!";

  function innerFunction() {
    console.log(outerVar); // This will work
  }

  innerFunction();
}
outerFunction();
console.log(outerVar); // This will cause an error: outerVar is not defined
```
