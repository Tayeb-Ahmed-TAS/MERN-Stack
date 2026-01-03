const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const initData = require("./data.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("Successfully Connected to MongoDB!");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({}); // Clear existing listings
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "6957ce248832c11bbbb3c0df",
  })); // Assign a default owner to each listing
  await Listing.insertMany(initData.data); // Insert initial data
  console.log("Data was initialized!");
};

initDB();
