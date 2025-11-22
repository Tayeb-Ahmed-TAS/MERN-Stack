const express = require("express");
const app = express();

let port = 8080;

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});

app.get("/", (req, res) => {
  let code = `<h1>Welcome Root Path</h1>
    <a href="/apple">Apple Page</a>
    <a href="/orange">Orange Page</a>`;
  res.send(code);
});

app.get("/apple", (req, res) => {
  let code = `<h1 style="color:red;">This is Apple Page</h1>
    <ul>
        <li>Red Apple</li>
        <li>Green Apple</li>
        <li>Yellow Apple</li>
    </ul>
    <a href="/">Root Page</a>
    <a href="/orange">Orange Page</a>`;
  res.send(code);
});

app.get("/orange", (req, res) => {
  let code = `<h1 style="color:orange;">This is Orange Page</h1>
    <ul>
        <li>Valencia Orange</li>
        <li>Navel Orange</li>
        <li>Blood Orange</li>
    </ul>
    <a href="/">Root Page</a>
    <a href="/apple">Apple Page</a>`;
  res.send(code);
});

app.use((req, res) => {
  res.send("Page does not exist");
});
