# module.exports

In Node.js, `module.exports` is a special object that is used to define what a module exports and makes available for other files to import. When you create a module in Node.js, you can use `module.exports` to specify the functions, objects, or values that should be accessible when the module is required in another file.

## Key Concepts

- `require()` : A built-in function to include external modules that exist in separate files.

- `module.exports` : A special object that is used to define what a module exports.

## Example

Let, the files `math.js` and `app.js` are in the same directory.

### Method - 1

```javascript
// math.js

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

module.exports = {
  add: add,
  subtract: subtract,
};
```

```javascript
// app.js

const math_value = require("./math"); // ./ means same directory

console.log(math_value.add(5, 3));
console.log(math_value.subtract(5, 3));
```

### Method - 2

```javascript
// math.js

let add = (a, b) => a + b;
let subtract = (a, b) => a - b;

module.exports = {
  add,
  subtract,
};
```

```javascript
// app.js

const math_value = require("./math"); // ./ means same directory

console.log(math_value.add(5, 3));
console.log(math_value.subtract(5, 3));
```

### Method - 3

```javascript
// math.js

let add = (a, b) => a + b;
let subtract = (a, b) => a - b;

let obj = {
  add: add,
  subtract: subtract,
};

module.exports = obj;
```

```javascript
// app.js

const math_value = require("./math"); // ./ means same directory

console.log(math_value.add(5, 3));
console.log(math_value.subtract(5, 3));
```

### Method - 4

```javascript
// math.js

module.exports.add = (a, b) => a + b;
module.exports.subtract = (a, b) => a - b;
```

```javascript
// app.js

const math_value = require("./math"); // ./ means same directory

console.log(math_value.add(5, 3));
console.log(math_value.subtract(5, 3));
```

### Method - 5

```javascript
// math.js

exports.add = (a, b) => a + b;
exports.subtract = (a, b) => a - b;
```

`exports` will treat as `module.exports` only if we use them like object properties. Like functions or variables directly assigned to `exports` will not work. We've to use it as above.

```javascript
// app.js

const math_value = require("./math"); // ./ means same directory

console.log(math_value.add(5, 3));
console.log(math_value.subtract(5, 3));
```
