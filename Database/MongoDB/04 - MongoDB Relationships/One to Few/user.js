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
  addresses: [{ _id: false, location: String, city: String }], // If we don't want _id for subdocuments then we can set _id: false
});

const User = mongoose.model("User", userSchema);

// Async function to add users
const addUsers = async () => {
  let user1 = new User({
    username: "sherlockholmes",
    addresses: [
      { location: "221B Baker Street", city: "London" },
      { location: "P36 DownTown", city: "London" },
    ],
  });

  user1.addresses.push({ location: "New Street", city: "London" });

  await user1.save();
};

addUsers();
