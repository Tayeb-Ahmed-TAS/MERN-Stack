# Export in Directory

## Assume you have a directory structure like this

```js
02 - Export in Directory
│├── script.js
│└── Fruits
│   ├── apple.js
│   ├── banana.js
│   └── orange.js

```

## Assume the content of each file is like this

```javascript
// apple.js

module.exports = {
  name: "Apple",
  color: "Red",
};
```

```javascript
// banana.js

module.exports = {
  name: "Banana",
  color: "Yellow",
};
```

```javascript
// orange.js

module.exports = {
  name: "Orange",
  color: "Orange",
};
```

## Now, if you want to export all the files from `Fruits` directory

### Step 1

---

Now at first create `index.js` file inside `Fruits` directory.

**Note:** The name of the file must be `index.js`

The directory structure will look like this

```js
02 - Export in Directory
│├── script.js
│└── Fruits
│   ├── apple.js
│   ├── banana.js
│   ├── index.js
│   └── orange.js
```

### Step 2

---

Now, inside `index.js` file write the following code

```javascript
const apple = require("./apple");
const banana = require("./banana");
const orange = require("./orange");

let fruits = [apple, banana, orange];

module.exports = fruits;
```

### Or, You can also write like this

---

```javascript
const apple = require("./apple");
const banana = require("./banana");
const orange = require("./orange");

module.exports = {
  apple: apple,
  banana: banana,
  orange: orange,
};
```

### Step 3

---

Now, inside `script.js` file write the following code

```javascript
const fruits = require("./Fruits");

console.log(fruits[0].name);
console.log(fruits[1].name);
console.log(fruits[2].name);
```

### Or, If you have used the second method in `index.js`, then write like this

```javascript
const fruits = require("./Fruits");

console.log(fruits.apple.name);
console.log(fruits.banana.name);
console.log(fruits.orange.name);
```

### Step 4

---

Now run the `script.js` file using the following command

```bash

node script.js
```

You will get the output like this

```bash
Apple
Banana
Orange
```
