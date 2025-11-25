# Embedded JavaScript (EJS) Templating with Express

**EJS** is a simple **templating language** that lets you generate **HTML** markup with **plain JavaScript**. It is often used with **Express.js** to create **dynamic web pages**.

[**EJS Official Website**](https://ejs.co/)

## 1. Installation

### Step - 1: Initialize package.json

First, create a new directory for your project and navigate into it. Then, initialize a new Node.js project by running:

```bash
npm init -y
```

### Step - 2: Install Express

Next, install **Express** by running:

```bash
npm install express
```

#### or

```bash
npm i express
```

### Step - 3: Install EJS

Next, install **EJS** by running:

```bash
npm install ejs
```

#### or

```bash
npm i ejs
```

## 2. Using EJS

`app.set("view engine", "ejs")` is used to set EJS as the templating engine for your Express application.

This allows you to render EJS templates without needing to specify the file extension every time.

We can **render EJS templates** using the `res.render()` method in Express. Using this we can sent strings, arrays, objects, etc. to the EJS templates and dynamically generate HTML content.

**We sent `.ejs` files inside the `views` folder by default using `res.render()` method.**

### 2.1 Directory Structure

```project-folder/
│├── views/
│   └── home.ejs
│├── index.js
│└── package.json
```

### 2.2 Example

```html
<!-- views/home.ejs -->

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Home Page</title>
  </head>

  <body>
    <h1>Welcome to the Home Page</h1>
  </body>
</html>
```

```javascript
// index.js

const express = require("express");
const app = express();
const port = 8080;

// Set EJS as the templating engine
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
```

## 3. Set path for views folder

By default, Express looks for the EJS templates in a folder named `views`. But if we run the application from a different directory like below:

```bash
node Backend/02 - Express/05 - EJS/index.js
```

Then, the `views` folder should be set explicitly using the `app.set("views", path)` method.

```javascript
const path = require("path");
app.set("views", path.join(__dirname, "/views"));
```

This sets the views directory to the correct path relative to the current file.

**Note:** We always use this method so that no errors occur while running the application.

### 3.1 Example

```javascript
// index.js

const express = require("express");
const app = express();
const path = require("path");

const port = 8080;

// Set EJS as templating engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
```

## 4. Interpolation Syntax

**Interpolation** refers to **embedding expressions** into marked up text. In EJS, we use the `<%= %>` tags to output the value of a variable or expression into the HTML.

### Example - 1

```html
<!-- views/home.ejs -->
... ...

<h3><%= 9 + 17 %></h3>

... ...
```

This will output `26` in the rendered HTML.

### Example - 2

```html
<!-- views/home.ejs -->
... ...
<h3><%= "taskin shorna".toUpperCase() %></h3>
... ...
```

This will output `TASKIN SHORNA` in the rendered HTML.

## 5. Passing Data to EJS

**Assume, data came from database and stored in a variable name _`diceVal`_.**

```html
<!-- views/rolldice.ejs -->
... ...

<h2>Your Dice Value is: <%= diceVal %></h2>

... ...
```

```javascript
// index.js

... ...

app.get("/", (req,res)=> {
    const diceVal = Math.floor(Math.random() * 6) + 1;
    res.render("rolldice.ejs", { diceVal });
    // In this object, we can also pass key-value pairs like { name: diceVal }
    // or, { diceVal: diceVal }
    // or, As we used above { diceVal } (Best Practice)
});


... ...
```

This will output the random dice value in the rendered HTML.
