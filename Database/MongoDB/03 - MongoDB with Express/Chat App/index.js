const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat");
const methodOverride = require("method-override");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

main()
  .then(() => console.log("Connection Successful"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

// Index Route -> Show all chats
app.get("/chats", async (req, res) => {
  // Fetch all chat messages from the database
  let chats = await Chat.find();
  res.render("index.ejs", { chats });
});

// New route -> Show form to create new chat message
app.get("/chats/new", (req, res) => {
  res.render("new.ejs");
});

// Create Route -> Create a new chat message
app.post("/chats", (req, res) => {
  // Extract 'from', 'to', and 'msg' from the request body
  let { from, to, msg } = req.body;

  // Create a new chat message and save it to the database
  let newChat = new Chat({
    from: from,
    to: to,
    msg: msg,
    created_at: new Date(),
  });

  newChat
    .save()
    .then((res) => {
      console.log("Chat was saved");
    })
    .catch((err) => {
      console.log(err);
    });

  res.redirect("/chats");
});

// Edit Route -> Show form to edit a chat message
app.get("/chats/:id/edit", async (req, res) => {
  let { id } = req.params;
  let chat = await Chat.findById(id);
  res.render("edit.ejs", { chat });
});

// Update Route -> Update a chat message
app.put("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let { msg: newMsg } = req.body;

  // Find the chat message by ID and update its message content
  let updatedChat = await Chat.findByIdAndUpdate(
    id,
    { msg: newMsg },
    { runValidators: true }
  );

  res.redirect("/chats");
});

// Destroy Route -> Delete a chat message
app.delete("/chats/:id", async (req, res) => {
  let { id } = req.params;
  // Find the chat message by ID and delete it
  await Chat.findByIdAndDelete(id);

  res.redirect("/chats");
});

app.get("/", (req, res) => {
  res.send("root is working");
});

app.listen("8080", () => {
  console.log(`App is listening on http://localhost:8080`);
});
