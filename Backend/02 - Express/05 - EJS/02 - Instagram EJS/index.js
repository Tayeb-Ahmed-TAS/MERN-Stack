const express = require("express");
const app = express();
const path = require("path");

const port = 8080;

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/:username", (req, res) => {
  let followers = ["john_doe", "jane_smith", "alice_wonder", "bob_builder"];
  let { username } = req.params;
  res.render("user_name", { username, followers });
});

app.get("/ig/:username", (req, res) => {
  const instaData = require("./data.json");
  let { username } = req.params;
  const data = instaData[username];

  if (data) {
    res.render("instagram", { data });
  } else {
    res.render("error");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
