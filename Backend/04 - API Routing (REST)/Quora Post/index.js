const { log } = require("console");
const express = require("express");
const path = require("path");
const app = express();
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");

app.use(methodOverride("_method"));

const port = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

let posts = [
  {
    id: uuidv4(),
    username: "apnacollege",
    content: "I love coding!",
  },
  {
    id: uuidv4(),
    username: "john_doe",
    content: "Life is beautiful when you code!",
  },
  {
    id: uuidv4(),
    username: "maria_jane",
    content: "Why not try full-stack development?",
  },
];

// Index Route -> Display all posts
app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

// Create Post Route 1 -> Send to create post form page
app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

// Create Post Route 2 -> Create a new post
app.post("/posts", (req, res) => {
  let { username, content } = req.body;

  // generate a unique id for the new post
  let id = uuidv4();

  // add the new post to the posts array
  posts.push({ id, username, content });

  // redirect to the index route
  res.redirect("/posts");
});

// Show Post Route -> Display a single post

app.get("/posts/:id", (req, res) => {
  let { id } = req.params;

  // find the post with the given id
  let post = posts.find((p) => p.id === id);

  res.render("show.ejs", { post });
});

// Update Route -> Update (Edit) specific post

app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;

  // new content to update
  let newContent = req.body.content;

  // find the post with the given id
  let post = posts.find((p) => p.id === id);

  // update the content
  post.content = newContent;

  res.redirect("/posts");
});

// Serve the edit form for a specific post

app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;

  // find the post with the given id
  let post = posts.find((p) => p.id === id);
  res.render("edit.ejs", { post });
});

// Delete Route -> Delete a specific post

app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;

  // filter out the post with the given id and update the posts array
  posts = posts.filter((p) => p.id !== id);
  
  res.redirect("/posts");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
