const express = require("express");
const app = express();

const port = 8080;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.use((req, res) => {
  console.log("Request received");

  let code = `<h1>Hello from Express!</h1>
  <p>This is a paragraph sent as an HTML response.</p>
  <ul>
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
  </ul>
  <button>Click Me!</button>`;
  res.send(code);
});
