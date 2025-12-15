const express = require("express");
const app = express();

// Middleware

app.use((req, res, next) => {
  console.log("First Middleware Executed");
  next();
});

// Logger Middleware

app.use((req, res, next) => {
  req.time = new Date(Date.now()).toISOString();
  console.log(
    `Method: ${req.method}, Host: ${req.hostname}, Path: ${req.path}, Time: ${req.time}, IP: ${req.ip}`
  );

  next();
});

// Middleware for /random route

app.use("/random", (req, res, next) => {
  console.log("This middleware is only for /random route");
  next();
});

app.get("/", (req, res) => {
  res.send("Hi, I am Root.");
});

app.get("/random", (req, res) => {
  res.send("Hi, I am Random.");
});

// Page Not Found Middleware

app.use((req, res) => {
  //   res.send("404 Page Not Found");
  // Alternatively, you can use
  res.status(404).send("404 Page Not Found");
});

app.listen(8080, () => {
  console.log("Server is running on http://localhost:8080");
});
