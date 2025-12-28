const express = require("express");
const app = express();
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const sessionOptions = {
  secret: "secretcode",
  resave: false,
  saveUninitialized: true,
};

app.use(session(sessionOptions));
app.use(flash());

app.use((req, res, next) => {
  res.locals.successMsg = req.flash("success");
  res.locals.errorMsg = req.flash("error");
  next();
});

app.get("/", (req, res) => {
  res.send("Home Page");
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

// app.get("/hello", (req, res) => {
//   res.send(`Hello, ${req.session.name}`);
// });

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
