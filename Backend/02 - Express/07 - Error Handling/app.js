const express = require("express");
const app = express();
const ExpressError = require("./ExpressError");

app.get("/", (req, res) => {
  res.send("Welcome to the Home Page!");
});

const checkToken = (req, res, next) => {
  let { token } = req.query;

  if (token === "giveaccess") {
    return next();
  }
  throw new ExpressError(401, "ACCESS DENIED!");
};

app.get("/api", checkToken, (req, res) => {
  res.send("Data ...");
});

// Route that triggers an error
app.get("/err", (req, res) => {
  abcd = abcd;
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  let { status = 500, message = "Something Error Occurred!" } = err;
  res.status(status).send(message);
});

// Page Not Found Middleware
app.use((req, res) => {
  res.status(404).send("404 Page Not Found");
});

app.listen(8080, () => {
  console.log("Server is running on http://localhost:8080");
});
