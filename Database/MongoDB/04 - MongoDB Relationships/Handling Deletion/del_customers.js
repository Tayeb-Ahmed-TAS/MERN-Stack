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

// Middleware to handle cascading delete of orders when a customer is deleted
customerSchema.post("findOneAndDelete", async (customer) => {
  if (customer.orders.length) {
    // Checks if there are orders associated with the customer if yes, deletes them

    await Order.deleteMany({ _id: { $in: customer.orders } });
  }
});

const Order = mongoose.model("Order", orderSchema);
const Customer = mongoose.model("Customer", customerSchema);

// Function to add a customer along with a new order
const addCust = async () => {
  let newCust = new Customer({
    name: "Steve Rogers",
  });

  let newOrder = new Order({
    item: "Protein Bar",
    price: 243,
  });

  newCust.orders.push(newOrder);

  await newOrder.save();
  await newCust.save();

  console.log("Customer and Order Added");
};

addCust();

// Function to delete a customer and their associated orders
const delCust = async () => {
  await Customer.findByIdAndDelete("69429efebed8cf3366af33b1");
};

delCust();
