const mongoose = require("mongoose");
const Chat = require("./models/chat");

main()
  .then(() => console.log("Connection Successful"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

let allChats = [
  {
    from: "Priya",
    to: "Neha",
    msg: "Hello Neha!",
    created_at: new Date(),
  },
  {
    from: "Amita",
    to: "Rohan",
    msg: "Are you coming to the party?",
    created_at: new Date(),
  },
  {
    from: "Rohan",
    to: "Amita",
    msg: "Yes, I'll be there!",
    created_at: new Date(),
  },
  {
    from: "Neha",
    to: "Priya",
    msg: "Hi Priya, how are you?",
    created_at: new Date(),
  },
  {
    from: "Amit",
    to: "Sonal",
    msg: "Don't forget our meeting tomorrow.",
    created_at: new Date(),
  },
  {
    from: "Sonal",
    to: "Amit",
    msg: "Sure, I'll be there on time.",
    created_at: new Date(),
  },
  {
    from: "Tony",
    to: "Peter",
    msg: "Let's catch up this weekend.",
    created_at: new Date(),
  },
];

Chat.insertMany(allChats);
