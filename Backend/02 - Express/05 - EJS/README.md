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

```js
project-folder/
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

## 6. Conditional Statements

`<% %>` tags are used to execute JavaScript code without producing any output. This is useful for control flow statements like conditionals and loops.

### Example - 1

```html
<!-- views/home.ejs -->
... ...

<h1>Your Dice Value is: <%= diceVal %></h1>

<% if (diceVal == 6) { %>
<h2>Congratulations! You rolled a 6!</h2>
<% } %>

<p>Thank you for playing.</p>

... ...
```

### Example - 2

```html
<!-- views/home.ejs -->
... ...

<h1>Your Dice Value is: <%= diceVal %></h1>

<% if (diceVal == 6) { %>
<h2>Congratulations! You rolled a 6!</h2>
<% } else { %>
<h2>Try again to roll a 6!</h2>
<% } %>

<p>Thank you for playing.</p>

... ...
```

## 7. Loops

EJS supports loops using the `<% %>` tags to iterate over arrays or objects.

### Example

```html
<!-- views/home.ejs -->
... ...

<h2>Fruits List:</h2>

<ul>
  <% const fruits = ["Apple", "Banana", "Cherry"]; %> <% for(fruit of fruits){
  %>

  <li><%= fruit %></li>

  <% } %>
</ul>

... ...
```

This will output a list of fruits in the rendered HTML.

## 8. Use DataBase data

Data base data stores in a json file named `data.json`.

Data stores `data.json` file as object.

Assume, We've a `data.json` file. To use these data we've to require this file in our `index.js` file.

```javascript
const data = require("./data.json");
```

## Serving Static Files

To serve static files such as CSS, JavaScript, and images in an Express application using EJS, you can use the built-in `express.static` middleware. This allows you to specify a directory from which to serve static assets.

`app.use(express.static(folder_name))` is used to serve static files from the specified folder. By default, Express takes the static files from the `public` folder.

so,

```javascript
app.use(express.static("public"));
```

### Directory Structure

```js
project-folder/
│├── public/
│   ├── images/
│   │   └── logo.png
│   ├── scripts/
│   │   └── main.js
│   └── css/
│       └── style.css
│├── views/
│   └── home.ejs
│├── data.json
│└── index.js
│├── package.json
│

```

## Set path for public folder

```javascript
app.use(express.static(path.join(__dirname, "public")));
```

### Example

```javascript
// index.js
const express = require("express");
const app = express();
const path = require("path");

const port = 8080;

app.use(express.static(path.join(__dirname, "public")));

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

```html
<!-- views/home.ejs -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="/css/style.css" />
    <title>Home Page</title>
  </head>

  <body>
    <h1>Welcome to the Home Page</h1>

    <img src="/images/logo.png" alt="Logo" />

    <script src="/scripts/main.js"></script>
  </body>
</html>
```

## 9. Includes

**Includes** is the method of creating **Sub-templates**.

`<%- %>` tags are used to include unescaped content in EJS templates.

`<%- include(filePath) %>` is used to include a sub-template within another EJS template. This is useful for reusing common components like headers, footers, or navigation bars across multiple pages.

### Directory Structure

```js
project-folder/
│├── views/
│   ├── includes/
│   │   ├── head.ejs
│   │   └── footer.ejs
│   └── home.ejs
│├── data.json
│└── index.js
│└── package.json

```

### Example

```html
<!-- views/includes/head.ejs -->
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Home Page</title>
  <link rel="stylesheet" href="/css/style.css" />
</head>
```

```html
<!-- views/includes/footer.ejs -->
<footer>
  <p>&copy; 2024 My Website</p>
</footer>
```

```html
<!-- views/home.ejs -->
<!DOCTYPE html>
<html lang="en">
  <%- include("includes/head.ejs") %>
  <!-- we can also use "includes/head" as filepath -->
  <body>
    <h1>Welcome to the Home Page</h1>

    <img src="/images/logo.png" alt="Logo" />

    <script src="/scripts/main.js"></script>

    <%- include("includes/footer") %>
  </body>
</html>
```

```javascript
// index.js
const express = require("express");
const app = express();
const path = require("path");

const port = 8080;

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
```
