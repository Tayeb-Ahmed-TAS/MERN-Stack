const express = require("express");
const app = express();
const session = require("express-session");

app.use(
  session({
    secret: "secretcode",
    resave: false,
    saveUninitialized: true,
  })
);

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.get("/reqcount", (req, res) => {
  if (req.session.count) {
    // req.session is available after setting up express-session middleware
    // req.session.count is a custom property we are using to track request count
    req.session.count++;
  } else {
    req.session.count = 1;
  }
  res.send(`You sent a request ${req.session.count} times`);
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
