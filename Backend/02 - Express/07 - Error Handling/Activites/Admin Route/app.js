const express = require("express");
const app = express();
const ExpressError = require("./ExpressError");

// Admin Route
app.get("/admin", (req, res) => {
  throw new ExpressError(403, "Access to admin is Forbidden!");
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  let { status = 500, message = "Some Error Occured!" } = err;
  res.status(status).send(message);
});

app.listen(8080, () => {
  console.log("Server is running on http://localhost:8080");
});
