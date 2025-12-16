# Handling Async Errors

### id doesn't exist error

```javascript
// index.js
next(new ExpressError(404, "Chat not found!"));
```

### Validation error (Constraint error)

For that, we can use `try-catch` block inside our async route handler. The `try` block will detect any error that occurs during the execution of the code inside it, and the `catch` block will handle that error by passing it to the next middleware using `next(err)`.

```javascript
// Create Route -> Create a new chat message
app.post("/chats", async (req, res, next) => {
  try {
    // Extract 'from', 'to', and 'msg' from the request body
    let { from, to, msg } = req.body;

    // Create a new chat message and save it to the database
    let newChat = new Chat({
      from: from,
      to: to,
      msg: msg,
      created_at: new Date(),
    });

    await newChat.save();

    res.redirect("/chats");
  } catch (err) {
    next(err);
  }
});

    ---
---

// Error Handling Middleware
app.use((err, req, res, next) => {
  let { status = 500, message = "Some Error Occurred!" } = err;
  res.status(status).send(message);
});

    ---
---

```

> **Note:** `try-catch` are bulky to handle for every async route. In real-world applications, it's better to use `wrapAsync` function to handle async errors more elegantly.

## WrapAsync function

It is a function that will return a new function.

The parameter of this function is also a function (the async route handler).

It is the combination of 3 functions:

### Syntax

```javascript
function wrapAsync(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch((err) => next(err));
  };
}
```

### Example

```javascript
---
    ---
// wrapAsync utility function to handle async errors
function wrapAsync(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch((err) => next(err));
  };
}

// New -> Show Route (For error handling class)
app.get("/chats/:id", wrapAsync(async (req, res, next) => {
    let { id } = req.params;
    let chat = await Chat.findById(id);
    if (!chat) {
      next(new ExpressError(404, "Chat not found!"));
    }
    res.render("show.ejs", { chat });
  })
);

    ---
---

// Error Handling Middleware
app.use((err, req, res, next) => {
  let { status = 500, message = "Some Error Occurred!" } = err;
  res.status(status).send(message);
});

    ---
---
```

## Mongoose Error

Every error has a `name` property that indicates the type of error.

To print the error name, you can use `err.name`.

```javascript
// Error Handling Middleware
app.use((err, req, res, next) => {
  let { status = 500, message = "Some Error Occurred!" } = err;
  console.log(err.name); // Print the error name
  res.status(status).send(message);
});
```

> **Or,** we can create a separate error handling middleware to log the error name before passing it to the main error handling middleware.

```javascript
// Error Handling Middlewares

app.use((err, req, res, next) => {
  console.log(err.name);
  next(err);
});

app.use((err, req, res, next) => {
  let { status = 500, message = "Some Error Occurred!" } = err;
  res.status(status).send(message);
});
```

### Example

```javascript
---
    ---

const handleValidationErr = (err) => {
  console.log("This was a Validation Error. Please follow rules.");
  console.dir(err.message);
  return err;
};

// Error Handling Middlewares

app.use((err, req, res, next) => {
  console.log(err.name);
  if (err.name === "ValidationError") {
    err = handleValidationErr(err);
  }
  next(err);
});

app.use((err, req, res, next) => {
  let { status = 500, message = "Some Error Occurred!" } = err;
  res.status(status).send(message);
});

    ---
---
```
