const express = require("express");
const app = express();

let port = 8080;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.send("Welcome to the Root Page");
});

app.get("/:user_name/:id", (req, res) => {
  let { user_name, id } = req.params;
  res.send(`Welcome to the page of @${user_name} with ID ${id}`);
});
