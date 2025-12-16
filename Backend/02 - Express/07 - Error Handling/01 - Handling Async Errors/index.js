const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat");
const methodOverride = require("method-override");
const ExpressError = require("./ExpressError");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

main()
  .then(() => console.log("Connection Successful"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/fakewhatsapp");
}

// Index Route -> Show all chats
app.get("/chats", async (req, res) => {
  try {
    // Fetch all chat messages from the database
    let chats = await Chat.find();
    res.render("index.ejs", { chats });
  } catch (err) {
    next(err);
  }
});

// New route -> Show form to create new chat message
app.get("/chats/new", (req, res) => {
  // throw new ExpressError(404, "Page not found!");
  res.render("new.ejs");
});

// Create Route -> Create a new chat message
app.post("/chats", async (req, res, next) => {
  try {
    // Extract 'from', 'to', and 'msg' from the request body
    let { from, to, msg } = req.body;

    // Create a new chat message and save it to the database
    let newChat = new Chat({
      from: from,
      to: to,
      msg: msg,
      created_at: new Date(),
    });

    await newChat.save();

    res.redirect("/chats");
  } catch (err) {
    next(err);
  }
});

// wrapAsync utility function to handle async errors
function wrapAsync(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch((err) => next(err));
  };
}

// New -> Show Route (For error handling class)
app.get(
  "/chats/:id",
  wrapAsync(async (req, res, next) => {
    let { id } = req.params;
    let chat = await Chat.findById(id);
    if (!chat) {
      next(new ExpressError(404, "Chat not found!"));
    }
    res.render("show.ejs", { chat });
  })
);

// Edit Route -> Show form to edit a chat message
app.get("/chats/:id/edit", async (req, res) => {
  try {
    let { id } = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs", { chat });
  } catch (err) {
    next(err);
  }
});

// Update Route -> Update a chat message
app.put("/chats/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let { msg: newMsg } = req.body;

    // Find the chat message by ID and update its message content
    let updatedChat = await Chat.findByIdAndUpdate(
      id,
      { msg: newMsg },
      { runValidators: true }
    );

    res.redirect("/chats");
  } catch (err) {
    next(err);
  }
});

// Destroy Route -> Delete a chat message
app.delete("/chats/:id", async (req, res) => {
  try {
    let { id } = req.params;
    // Find the chat message by ID and delete it
    await Chat.findByIdAndDelete(id);

    res.redirect("/chats");
  } catch (err) {
    next(err);
  }
});

app.get("/", (req, res) => {
  res.send("root is working");
});

const handleValidationErr = (err) => {
  console.log("This was a Validation Error. Please follow rules.");
  console.dir(err.message);
  return err;
};

// Error Handling Middlewares

app.use((err, req, res, next) => {
  console.log(err.name);
  if (err.name === "ValidationError") {
    err = handleValidationErr(err);
  }
  next(err);
});

app.use((err, req, res, next) => {
  let { status = 500, message = "Some Error Occurred!" } = err;
  res.status(status).send(message);
});

app.listen("8080", () => {
  console.log(`App is listening on http://localhost:8080`);
});
