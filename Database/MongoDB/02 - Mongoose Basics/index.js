const mongoose = require("mongoose");

main()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log(err));

async function main() {
  // Connect to MongoDB
  await mongoose.connect("mongodb://127.0.0.1:27017/test");
}

// Define a schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
});

// Create a model
const User = mongoose.model("User", userSchema);

// Create instance of the model
// const user2 = new User({
//   name: "Kritika",
//   email: "kritika@example.com",
//   age: 29,
// });

// Save the instance to the database

// user2
//   .save()
//   .then((res) => {
//     console.log("User saved:", res);
//   })
//   .catch((err) => {
//     log("Error saving user:", err);
//   });

// Insert multiple documents

// User.insertMany([
//   { name: "Alice", email: "alice@example.com", age: 25 },
//   { name: "Bob", email: "bob@example.com", age: 28 },
//   { name: "Charlie", email: "charlie@example.com", age: 22 },
// ])
//   .then((data) => {
//     console.log("Multiple users inserted:", data);
//   })
//   .catch((err) => {
//     console.log("Error inserting multiple users:", err);
//   });

// Find

// User.findOne({ _id: "69367a33aeb2b1d5d8017232" })
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log("Error finding users:", err);
//   });

// Update

User.findByIdAndUpdate("693678532d81dcdd0bd317c1", { age: 30 }, { new: true })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log("Error updating user:", err);
  });

// Find by ID

// User.findById("693678532d81dcdd0bd317c1")
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log("Error finding users:", err);
//   });
