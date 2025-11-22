const express = require("express");
const app = express();

const port = 8080;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.use((req, res) => {
  console.log("Request received");
  res.send({
    name: "Tayeb Ahmed",
    Department: "CSE",
    Semester: 7,
  });
});
