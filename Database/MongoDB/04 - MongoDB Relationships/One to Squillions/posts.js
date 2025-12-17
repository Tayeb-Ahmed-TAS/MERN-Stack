const mongoose = require("mongoose");
const { Schema } = mongoose; // Destructuring Schema from mongoose

main()
  .then(() => console.log("Connection Successful"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/relationDemo");
}

const userSchema = new Schema({
  username: String,
  email: String,
});

const postSchema = new Schema({
  contect: String,
  likes: Number,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
  },
});

const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema);

// Function to add sample data
const addData = async () => {
  //   let user1 = new User({
  //     username: "john_doe",
  //     email: "john@example.com",
  //   });

  let user = await User.findOne({ username: "john_doe" });

  let post2 = new Post({
    contect: "Bye bys :)",
    likes: 26,
  });

  post2.user = user; // Establishing the relationship

  await post2.save();
};

addData();

// Function to find posts with populated user data

const findPosts = async () => {
  let result = await Post.find({}).populate("user");
  console.log(result);
};

findPosts();
