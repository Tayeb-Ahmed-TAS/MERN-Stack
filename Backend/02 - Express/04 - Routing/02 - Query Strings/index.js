const express = require("express");
const app = express();

let port = 8080;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.send("Welcome to the Root Page");
});

app.get("/search", (req, res) => {
  let { q } = req.query;
  console.log(req.query); // It's an object containing all query parameters

  if (!q) {
    res.send("<h1>Nothing Searched</h1>");
  }
  res.send(`<h1>You searched for ${q}</h1>`);
});
