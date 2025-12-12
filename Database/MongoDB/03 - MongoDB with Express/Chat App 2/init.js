const mongoose = require("mongoose");
const Chat = require("./models/chat");

main()
  .then((res) => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/mychatdb");
}

// let user1 = new Chat({
//   from: "Roscoe",
//   to: "Reacher",
//   msg: "I'm a police!",
//   sent_at: new Date(),
// });

// user1
//   .save()
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

let allChats = [
  {
    from: "Priya",
    to: "Neha",
    msg: "Hello Neha!",
    sent_at: new Date(),
  },
  {
    from: "Amita",
    to: "Rohan",
    msg: "Are you coming to the party?",
    sent_at: new Date(),
  },
  {
    from: "Rohan",
    to: "Amita",
    msg: "Yes, I'll be there!",
    sent_at: new Date(),
  },
  {
    from: "Neha",
    to: "Priya",
    msg: "Hi Priya, how are you?",
    sent_at: new Date(),
  },
  {
    from: "Amit",
    to: "Sonal",
    msg: "Don't forget our meeting tomorrow.",
    sent_at: new Date(),
  },
  {
    from: "Sonal",
    to: "Amit",
    msg: "Sure, I'll be there on time.",
    sent_at: new Date(),
  },
  {
    from: "Tony",
    to: "Peter",
    msg: "Let's catch up this weekend.",
    sent_at: new Date(),
  },
];

Chat.insertMany(allChats);