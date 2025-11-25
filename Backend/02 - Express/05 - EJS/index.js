const express = require("express");
const app = express();
const path = require("path");

const port = 8080;

// Set EJS as the templating engine
app.set("view engine", "ejs");

// Set the views directory
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/diceroll", (req, res) => {
  let diceVal = Math.floor(Math.random() * 6) + 1; // Assume this value comes from database or logic

  res.render("rolldice.ejs", { diceVal });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
