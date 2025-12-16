# Middleware

It is an intermediary.

```nginx
Request  ───▶  Middleware  ───▶  Response
```

If we have any work to do after receiving the request and before sending the response, we can use middleware.

## Middleware in Express

Middleware in Express are `functions` that come into play after the server receives the request and before the response is sent to the client.

[Express Middleware Documentation](https://expressjs.com/en/guide/using-middleware.html)

[5 Express Middleware Libraries Every Developer Should Know](https://blog.bitsrc.io/5-express-middleware-libraries-every-developer-should-know-94e2728f7503)

## 1. Common Middleware functions

- **methodOverride**

```javaScript
app.use(methodOverride("_method"));
```

- **bodyParser**

```javaScript
app.use(bodyParser.urlencoded({ extended: true }));
```

- **express.static**

```javaScript
app.use(express.static(path.join(__dirname, "public")));
```

```cpp

// Directory structure

public/
 ├── style.css
 ├── script.js
 └── images/
        └── logo.png
```

- **express.urlencoded**

```javaScript
app.use(express.urlencoded({ extended: true }));
```

## 2. What do middlewares do?

Middleware functions can perform the following tasks:

- Execute any code.

- Make changes to the request and the response objects.

- End the request-response cycle.

- Call the next middleware function in the stack.

## 3. Our own Middleware function

### 3.1 Syntax

```javaScript
app.use(middleware)
```

### 3.2 Example

```javaScript
app.use(() => {
    console.log("Hi, I am a middleware");
});
```

### 3.3 Using req & res object in middleware

```javaScript
app.use((req, res) => {
    console.log("Hi, I am a middleware");
    res.send("bye");
});
```

## 4. next() function

The `next` function is commonly denoted by a variable named `next`. It is a function in the Express router that is used to pass control to the next middleware function.

If the current middleware function does not end the request-response cycle, it must call `next()` to pass control to the next middleware function. Otherwise, the request will be left hanging.

### 4.1 Syntax

```javaScript
app.use((req, res, next) => {
    // Middleware logic
    next();
});
```

### 4.2 Example

```javaScript
app.use((req, res, next) => {
    console.log("Time: ", Date.now());
    next();
});
```

## 5. Utility Middleware functions in Express

### 5.1 Logger Middleware

```javaScript
app.use((req, res, next) => {
    req.time = new Date(Date.now()).toString();
    console.log(req.method, req.pathname, req.host, req.time);
    next();
});
```

`npm` package: [morgan](https://www.npmjs.com/package/morgan) does the same job.

### 5.2 Page Not Found Middleware

```javaScript
app.use((req, res) => {
    res.status(404).send("Page Not Found");
});
```

> Or you can use this simpler version:

```javaScript
app.use((req, res) => {
    res.send("404 - Page Not Found");
});
```

> **NOTE:** Use this middleware at the end of all other routes and middlewares, and before the server starts listening. So that if no route matches, this middleware will handle the request.

## 6. Middleware with specific routes

Middleware can also be applied to specific routes.

```javaScript
app.use("/random" , (req, res, next) => {
    console.log("This middleware is only for /random route");
    next();
});
```

## 7. Passing multiple middlewares

You can pass multiple middlewares to a route.

```javaScript
const checkToken = (req, res, next) => {
    if (req.query.token === "giveaccess") {
        return next();
    }
    res.send("Access Denied");

};

app.get("/api", checkToken, (req, res) => {
    res.send("Welcome to the API");
});
```

## 8. Handling Errors

Express **_Default_** Error Handler.

[Express Error Handling Documentation](https://expressjs.com/en/guide/error-handling.html#the-default-error-handler)
