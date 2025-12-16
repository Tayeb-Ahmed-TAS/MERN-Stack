# Error Handling

## 1. Error Handling Middleware

[Express documentation on error handling middleware](https://expressjs.com/en/guide/error-handling.html#writing-error-handlers)

### 1.1 Syntax

Error handling middleware in Express is defined with four parameters: `err`, `req`, `res`, and `next`. Here is the syntax:

```javascript
app.use((err, req, res, next) => {
  // Error handling logic
});
```

### 1.2 Example

```javascript
app.use((err, req, res, next) => {
  console.log("---- ERROR ----");
  next(err);
});
```

> **Point to be noted:** `next()` searches for the next matching route or middleware. And `next(err)` searches for the next error handling middleware.

## 2. Custom Error Classes

Status commonly used:

| **Status Code Range** | **Description**         | **MDN Link**                                                                                    |
| --------------------- | ----------------------- | ----------------------------------------------------------------------------------------------- |
| **400 - 499**         | Client Errors Responses | [Client Error](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#client_error_responses) |
| **500 - 599**         | Server Errors Responses | [Server Error](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#server_error_responses) |

### Step 1

Create a `.js` file (e.g., `ExpressError.js`) for custom error classes.

### Step 2

In this file, define a custom error class (e.g., `ExpressError`) that extends (inherits from) the built-in `Error` class. This class should accept a message and a status code as parameters.

```javascript
class ExpressError extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }
}
```

### Step 3

Export the custom error class so it can be used in other parts of your application.

```javascript
module.exports = ExpressError;
```

### Step 4

Import / require the custom error class in your main application file (e.g., `app.js` or `server.js`).

```javascript
const ExpressError = require("./ExpressError");
```

### Step 5

Use the custom error class to create and throw errors in your routes or middleware.

```javascript
const checkToken = (req, res, next) => {
  const token = req.query.token;
  if (token === "giveaccess") {
    return next(); // Token is valid, proceed to the next middleware/route handler
  }
  // Token is invalid, create and throw an ExpressError
  throw new ExpressError(401, "ACCESS DENIED!");
};

app.get("/api", checkToken, (req, res) => {
  res.send("Data ...");
});

---
    ---

app.use((err, req, res, next) => {
  const { status, message } = err;
  res.status(status).send(message);
});
```

## 3. Default Status and Message

```javascript
---
    ---
app.use((err, req, res, next) => {
    let { status = 500, message = "Something went wrong!" } = err;
    res.status(status).send(message);
});

    ---
---
```

## Handling Async Errors

See in [01 - Handling Async Error Folder](01%20-%20Handling%20Async%20Errors)
