const express = require("express");
const app = express();

let port = 8080;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.send("Welcome to the Root Page");
});

app.get("/:user_name", (req, res) => {
  let userName = req.params.user_name;

  let htmlStr = `<h1>Welcome to the page of @${userName}</h1>`;

  res.send(htmlStr);
});
