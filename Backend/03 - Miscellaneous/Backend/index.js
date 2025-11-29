const express = require("express");
const app = express();
const port = 8080;

app.use(express.urlencoded({ extended: true })); // to support URL-encoded bodies
app.use(express.json()); // to support JSON-encoded bodies

app.get("/register", (req, res) => {
  let { username, password } = req.query; // Here, username and password are the name of input fields
  res.send(`standard GET response. Welcome ${username}!`);
});

app.post("/register", (req, res) => {
  const { username, password } = req.body; // Here, username and password are the name of input fields

  res.send(`standard POST response. Welcome ${username}!`);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
