# Miscellaneous Backend Topics

This section covers various miscellaneous topics related to backend development that do not fit into the other specific categories. These topics may include best practices, performance optimization, security considerations, and other relevant subjects that enhance the overall understanding of backend development.

## 1. Get & Post Requests

### 1.1 GET

- Used to **GET** dome response.

- Data sent in query strings (limited, string data, & visible in URL).

### 1.2 POST

- Used to **POST** something (for **Create / Write / Update**).

- Data sent via request body (any type of data, larger size, & not visible in URL).

- More secure than **GET** for sensitive data.

- Commonly used for form submissions, file uploads, API requests, etc.

### 1.3 Accepting POST Requests in Express.js

`app.post` is used to accept **POST** requests in **Express.js**.

```javascript
const express = require("express");
const app = express();
const port = 8080;

app.post("/submit", (req, res) => {
  // Access POST data from req.body
  const postData = req.body;
  res.send("POST data received");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
```

### 1.4 Handling GET Requests in Express.js

`req.query` is used to access **GET** request data in **Express.js**.

```javascript
const express = require("express");
const app = express();
const port = 8080;

app.get("/register", (req, res) => {
  // Access GET data from req.query
  const { username, email } = req.query;
  res.send(`Username: ${username}, Email: ${email}`);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
```

### 1.5 Handling POST Requests in Express.js

We handle **POST** request in 2 steps:

1. Set up **POST** request route to get some response.

```javascript
app.post("/submit", (req, res) => {
  // Handle POST request here
  res.send("POST request received");
});
```

2. Parse POST request Data.

- `app.use(express.urlencoded({ extended: true }));` is used to parse URL-encoded data (form data).

- `app.use(express.json());` is used to parse JSON data.

> Both middlewares are required to access `req.body` data in **POST** requests.

```javascript
const express = require("express");
const app = express();
const port = 8080;

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON data
app.use(express.json());

app.post("/submit", (req, res) => {
  // Access POST data from req.body
  const postData = req.body;
  res.send("POST data received");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
```
