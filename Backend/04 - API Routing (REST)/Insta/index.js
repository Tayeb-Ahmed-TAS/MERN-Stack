const express = require("express");
const app = express();
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");
const multer = require("multer");

const port = 8080;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

let posts = [
  {
    id: uuidv4(),
    username: "anna_123",
    caption: "Exploring the majestic mountains! 🏔️ #travel #mountains #nature",
    img: "/img/img1.png",
  },
  {
    id: uuidv4(),
    username: "beachlover",
    caption: "Sunset at the beach 🌅 #beach #sunset #paradise",
    img: "/img/img4.png",
  },
  {
    id: uuidv4(),
    username: "jarvis_coffee",
    caption: "Morning coffee vibes ☕️ #coffee #morningvibes #cafe",
    img: "/img/img3.png",
  },
  {
    id: uuidv4(),
    username: "foodie_life",
    caption: "Homemade pasta perfection! 🍝 #foodie #homemade #delicious",
    img: "/img/img2.png",
  },
];

// To upload images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./public/img/uploads");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// multer upload instance

const upload = multer({ storage });

app.get("/ig", (req, res) => {
  res.render("index.ejs", { posts });
});

app.get("/ig/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/ig", upload.single("img"), (req, res) => {
  const { username, caption } = req.body;
  let id = uuidv4();
  // image path
  let imgPath;

  if (req.file) {
    imgPath = `/img/uploads/${req.file.filename}`;
  }
  // add the new post at the start of the array
  posts.unshift({ id, username, caption, img: imgPath });
  res.redirect("/ig");
});

app.get("/ig/:id", (req, res) => {
  const { id } = req.params;
  const post = posts.find((p) => p.id === id);
  res.render("show.ejs", { post });
});

app.get("/ig/:id/edit", (req, res) => {
  const { id } = req.params;
  const post = posts.find((p) => p.id === id);
  res.render("edit.ejs", { post });
});

app.patch("/ig/:id", (req, res) => {
  const { id } = req.params;
  const { img, caption } = req.body;
  const post = posts.find((p) => p.id === id);
  post.img = img;
  post.caption = caption;
  res.redirect("/ig");
});

app.delete("/ig/:id", (req, res) => {
  const { id } = req.params;
  posts = posts.filter((p) => p.id !== id);
  res.redirect("/ig");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
