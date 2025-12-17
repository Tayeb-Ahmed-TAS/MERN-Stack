const mongoose = require("mongoose");
const { Schema } = mongoose; // Destructuring Schema from mongoose

main()
  .then(() => console.log("Connection Successful"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/relationDemo");
}

const orderSchema = new Schema({
  item: String,
  price: Number,
});

const customerSchema = new Schema({
  name: String,
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: "Order", // Reference to the Order model
    },
  ],
});

const Order = mongoose.model("Order", orderSchema);
const Customer = mongoose.model("Customer", customerSchema);

module.exports = { Order, Customer }; // Exporting the models for population in other files

const addCustomer = async () => {
  const cust1 = new Customer({
    name: "Tony Stark",
  });

  let order1 = await Order.findOne({ item: "Chips" });
  let order2 = await Order.findOne({ item: "Eggs" });

  cust1.orders.push(order1);
  cust1.orders.push(order2);

  await cust1.save();
};

addCustomer();

// Function to add sample orders to the database
const addOdrers = async () => {
  await Order.insertMany([
    { item: "Chips", price: 20 },
    { item: "Fanta", price: 25 },
    { item: "Eggs", price: 240 },
  ]);
};

addOdrers();
