# Express

## Library

A **library** is a collection of pre-written code that can be used to perform specific tasks.

Eg - **axios**

## Framework

A **framework** is a set of pre-written code that provides a structure for building applications.

Eg - **Express**

---

## What is Express?

A **Node.js** web application framework that helps us to make web applications.

It is used for **server side** programming.

### Uses of Express

1. Listen for incoming request.

2. Parse the request.

3. Match response with routes.

4. Send the suitable response.

---

## Installing Express

### Step -1

First create or initialize `package.json` file inside the folder where you want to create your project.

```bash
npm init
```

### Step -2

Now install express using the following command:

```bash
npm install express
```

---

## Port

**Ports** are the logical endpoints of a network connection that is used to exchange information between a web server and a web client.

### Common Ports

| Sl  | Port Number | Service        |
| --- | ----------- | -------------- |
| 01  | 443         | HTTPS          |
| 02  | 80          | HTTP           |
| 03  | 21          | FTP            |
| 04  | 22          | SSH            |
| 05  | 25          | SMTP           |
| 06  | 3306        | MySQL Database |
| 07  | 5432        | PostgreSQL DB  |
| 08  | 6379        | Redis          |
| 09  | 27017       | MongoDB        |
| 10  | 3000        | Development    |
| 11  | 8080        | Alternate HTTP |
| 12  | 5000        | Development    |
| 13  | 8000        | Development    |
| 14  | 4200        | Angular Dev    |
| 15  | 5500        | Live Server    |

---

# 1. Getting Started with Express

## 1.1 Creating a Simple Express Server (Listen)

Create a file named `app.js` and add the following code:

```javascript
import express from "express";

const app = express();

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
```

### Now run the server using the following command

```bash
node app.js
```

You should see the message: `Server is running on http://localhost:3000`

Open your browser and navigate to `http://localhost:3000` to see your server in action.

### Close the server

Press `Ctrl + C` in the terminal where the server is running.

---

## 1.2 Handling Requests

`app.use()` method is used to handle incoming requests.

```javascript
import express from "express";
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.use((req, res) => {
  res.send("Request received");
});
```

## 1.3 Sending Responses (Parsing Request)

- `req` - Represents the incoming request object.

- `res` - Represents the outgoing response object.

`res.send()` method is used to send a response back to the client.

```javascript
import express from "express";
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.use((req, res) => {
  res.send("Hello, World!");
});
```

## 1.4 Routing

**Routing** is the process of selecting a path for traffic in a network or between or accross multiple networks.

`app.get()` method is used to define a route for handling GET requests.

```javascript
app.get("/apple", (req, res) => {
  res.send({
    name: "Apple",
    color: "Red",
    taste: "Sweet",
  });
});
```

### 1.4.1 If wrong route is given

```javascript
app.use((req, res) => {
  res.send("This page does not exist");
});
```

### 1.4.2 Path Parameters

Path parameters are used to capture values specified at their position in the URL.

In the example below, `:var_name` is a path parameter.

```javascript
app.get("/:var_name", (req, res) => {
  const varName = req.params.var_name;
  res.send(`You have requested for ${varName}`);
});
```

### 1.4.3 Path Parameters (Multiple)

```javascript
app.get("/:var1/:var2", (req, res) => {
  const var1 = req.params.var1;
  const var2 = req.params.var2;
  res.send(`You have requested for ${var1} and ${var2}`);
});
```

#### Or

```javascript
app.get("/:var1/var2", (req, res) => {
  const { var1, var2 } = req.params;
  res.send(`You have requested for ${var1} and ${var2}`);
});
```

---

# Query Strings

**Query Strings** are used to send data to the server as key-value pairs in the URL to search or filter results.

`/search` is the route and `?key1=value1&key2=value2` is the query string.

```javascript
app.get("/search", (req, res) => {
  let { q } = req.query;
  res.send(`Results for ${q}`);
});
```

### Example URL with Query String

To search for **apple** for the above route, the URL would be:

```url
http://localhost:3000/search?q=apple
```

To search for **smartphone** of brand **apple** for the above route, the URL would be:

```url
http://localhost:3000/search?q=smartphone&brand=apple
```

---

# Nodemon

To **automatically restart server** with code changes.

## Install nodemon globally

```bash
npm install -g nodemon
```

### Check nodemon version

```bash
nodemon -v
```

### Run server using nodemon

```bash
nodemon app.js
```

### Stop nodemon server

Press `Ctrl + C` in the terminal where the server is running.

---
