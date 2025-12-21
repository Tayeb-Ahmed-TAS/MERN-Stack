const express = require("express");
const router = express.Router();

// Index route -> /users/

router.get("/", (req, res) => {
  res.send("GET for users");
});

// Show route -> /users/:id

router.get("/:id", (req, res) => {
  res.send("GET for user id");
});

// POST route -> /users

router.post("/", (req, res) => {
  res.send("POST for users");
});

// DELETE route -> /users

router.delete("/:id", (req, res) => {
  res.send("DELETE for user id");
});

module.exports = router;
