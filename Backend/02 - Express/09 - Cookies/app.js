const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

app.use(cookieParser("thisismysecretcode"));

app.get("/", (req, res) => {
  console.dir(req.cookies);
  res.send("Welcome to the Home Page!");
});

app.get("/greet", (req, res) => {
  let { name = "Anonymous" } = req.cookies;
  res.send(`Hi, ${name} !`);
});

app.get("/getsignedcookie", (req, res) => {
  res.cookie("fruit", "Mango", { signed: true });
  res.send("Sent you a signed cookie!");
});

app.get("/verify", (req, res) => {
  console.log(req.signedCookies);
  res.send("Verified !");
});

app.get("/getcookies", (req, res) => {
  res.cookie("greet", "Hello");
  res.cookie("madeIn", "Bangladesh");
  res.send("Sent you some cookies!");
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
