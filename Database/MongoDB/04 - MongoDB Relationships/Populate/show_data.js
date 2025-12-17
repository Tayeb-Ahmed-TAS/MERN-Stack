const mongoose = require("mongoose");
const { Schema } = mongoose; // Destructuring Schema from mongoose
const { Customer } = require("../One to Many/customer");

main()
  .then(() => console.log("Connection Successful"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/relationDemo");
}

const findCustomer = async () => {
  let result = await Customer.find({}).populate("orders");
  console.log(result[0]);
};

findCustomer();
