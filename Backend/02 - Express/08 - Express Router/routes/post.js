const express = require("express");
const router = express.Router();

// Index route -> "/posts"
router.get("/", (req, res) => {
  res.send("GET for posts");
});

// Show route -> "/posts"
router.get("/:id", (req, res) => {
  res.send("GET for post id");
});

// Post route -> "/posts"
router.post("/", (req, res) => {
  res.send("POST for posts");
});

// Delete route -> "/posts"
router.delete("/:id", (req, res) => {
  res.send("DELETE for post id");
});

module.exports = router;
