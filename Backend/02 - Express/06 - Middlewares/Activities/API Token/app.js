const express = require("express");
const app = express();
const PORT = 8080;

// Middleware to check for API token
app.use("/api", (req, res, next) => {
  const { token } = req.query;
  if (token === "giveaccess") {
    return next();
  }
  res.send("ACCESS DENIED!");
});

app.get("/api", (req, res) => {
  res.send("Data");
});

// Middleware for handling 404 errors
app.use((req, res) => {
  res.status(404).send("404. Page Not Found");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
