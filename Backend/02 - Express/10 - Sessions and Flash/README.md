# Sessions & Flash in Express

## What is State or Session?

**State** or **Session** is the interaction between the client and server.

```nginx

Client <--------------------> Server
          Request/Response
```

## Stateful Portocol

**Stateful Protocol** require server to save the status and session information.

> e.g. FTP

## Stateless Protocol

**Stateless Protocol** does not require the server to retain the server information or status.

> e.g. HTTP

---

## Express Sessions

An attempt to make our session stateful.

It stores data temporarily on the server side and associates it with a unique session ID. And this session ID is stored on the client side using cookies.

```nginx

                 SERVER
┌─────────────────────────────────────────┐
│ user1                                   │
│ sessionId: 101                          │
│ {                                       │
│   item: laptop                          │
│   item: charger                         │
│ }                                       │
│                                         │
│ user2                                   │
│ sessionId: 102                          │
│ {                                       │
│   item: shirt                           │
│   item: pants                           │
│ }                                       │
└─────────────────────────────────────────┘
            │                    │
            │                    │
            ▼                    ▼
      ┌───────────┐        ┌───────────┐
      │  CLIENT   │        │  CLIENT   │
      │ sessionId │        │ sessionId │
      │   101     │        │  102      │
      └───────────┘        └───────────┘

```

> On an e-commerce website like Amazon, users can add products to their cart without logging in.
> The server creates a session and assigns a unique sessionId, which is stored in the user’s browser, while cart data is stored on the server.
> As the user navigates between pages, the browser keeps sending the same sessionId, so the cart remains unchanged.
> After the user logs in, the session data can be linked to the user’s account and saved permanently.
> This allows the cart to persist across page changes and even future visits.

---

## Setting up Sessions in Express

[Express-session](https://www.npmjs.com/package/express-session)

### Install express-session package

```bash
npm i express-session
```

### Require

```javascript
const session = require("express-session");
```

> It is a middleware.

### Use

```javascript
app.use(
  session({
    secret: "yourSecretKey", // used to sign the session ID cookie
    resave: false, // forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: true, // forces a session that is "uninitialized" to be saved to the store
  })
);
```

> Here, **secret**, **resave**, and **saveUninitialized** are **options** for configuring the session middleware.
>
> Here, **secret** is used to sign the session ID cookie, ensuring its integrity and security.

## Express Session Options

[Documentation](https://www.npmjs.com/package/express-session#options)

## Compatible Session Stores

[Documentation](https://www.npmjs.com/package/express-session#compatible-session-stores)

---

## Storing & Using Info

To store information in the session, we can use the `req.session` object.

```javascript
app.get("/register", (req, res) => {
  let { name = "anonymous" } = req.query;
  req.session.name = name;
  res.redirect("/hello");
});

app.get("/hello", (req, res) => {
  res.send(`Hello, ${req.session.name}`);
});
```

> Here, in `req.session` object we created a custom property `req.session.name` to store and use the `name` of the user.

---

# Connect Flash

The **Flash** is a special area of the session used for storing messages. Messages are written to the flash and cleared after being displayed to the user.

The flash is typically used in combination with redirects, ensuring that the message is displayed on the next page the user visits.

It is a npm package called [**connect-flash**](https://www.npmjs.com/package/connect-flash).

It is important to use **express-session** before using **connect-flash** since flash messages are stored in the session.

### Install connect-flash package

```bash
npm i connect-flash
```

### Require

```javascript
const flash = require("connect-flash");
```

### Use

```javascript
app.use(flash());
```

It requires two parameters: `key` and `message`. `key` is used to identify the type of message (e.g., 'success', 'error'), and `message` is the actual message content.

```javascript
req.flash("success", "You have successfully logged in.");
```

To retrieve and display flash messages, we use the same `key` that was used to store the message.

```javascript
app.get("/register", (req, res) => {
  let { name = "anonymous" } = req.query;
  req.session.name = name;
  req.flash("success", "User registered successfully!");
  res.redirect("/hello");
});

app.get("/hello", (req, res) => {
  res.render("page.ejs", { name: req.session.name, msg: req.flash("success") });
});
```

## res.locals

It is a better practice to use `res.locals` to make flash messages available in all views without passing them explicitly each time.

[Documentation](https://expressjs.com/en/4x/api.html#res.locals)

```javascript
app.use((req, res, next) => {
  res.locals.messages = req.flash("success");
  next();
});
```

### Example

```javascript
app.get("/register", (req, res) => {
  let { name = "anonymous" } = req.query;
  req.session.name = name;

  if (name === "anonymous") {
    req.flash("error", "User not registered!");
  } else {
    req.flash("success", "User registered successfully!");
  }

  res.redirect("/hello");
});

app.get("/hello", (req, res) => {
  res.locals.successMsg = req.flash("success");
  res.locals.errorMsg = req.flash("error");
  res.render("page.ejs", { name: req.session.name });
});
```

> We can now access `successMsg` and `errorMsg` directly in the EJS template without passing them explicitly.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>

  <body>
    <%= successMsg %> <%= errorMsg %>
    <h1>Hello, <%= name %></h1>
  </body>
</html>
```

# Best way to use Flash Messages

```javascript
app.use((req, res, next) => {
  res.locals.successMsg = req.flash("success");
  res.locals.errorMsg = req.flash("error");
  next();
});

app.get("/register", (req, res) => {
  let { name = "anonymous" } = req.query;
  req.session.name = name;

  if (name === "anonymous") {
    req.flash("error", "User not registered!");
  } else {
    req.flash("success", "User registered successfully!");
  }

  res.redirect("/hello");
});

app.get("/hello", (req, res) => {
  res.render("page.ejs", { name: req.session.name });
});
```

---
