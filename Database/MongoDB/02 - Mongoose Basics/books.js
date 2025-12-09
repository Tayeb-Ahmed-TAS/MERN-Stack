const mongoose = require("mongoose");

main()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log(err));

async function main() {
  // Connect to MongoDB
  await mongoose.connect("mongodb://127.0.0.1:27017/amazon");
}

// Define a schema
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
  },
  price: {
    type: Number,
  },
  category: {
    type: String,
    enum: ["fiction", "non-fiction"],
  },
  genre: [String],
});

// Create a model
const Book = mongoose.model("Book", bookSchema);

// Create instance of the model
let book1 = new Book({
  title: "Deathly Hallows",
  author: "J.K. Rowling",
  price: 499,
  category: "fiction",
  genre: ["fantasy", "adventure"],
});

book1
  .save()
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
