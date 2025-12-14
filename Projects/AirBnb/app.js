const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Listing = require("./models/listing.js");
const methodOverride = require("method-override");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("Successfully Connected to MongoDB!");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.send("Welcome to the AirBnb clone!");
});

// Index Route - Show all listings
app.get("/listings", async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
});

// New Route - Form to create a new listing (Keep it above Show Route otherwise `new` will be treated as :id)

app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});

// Show Route - Show details of a specific listing
app.get("/listings/:id", async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  res.render("listings/show.ejs", { listing });
});

// Create Route - Create a new listing
app.post("/listings", async (req, res) => {
  let newListing = new Listing(req.body.listing); // because in form we have used listing[title], listing[description]...
  await newListing.save();
  res.redirect("/listings");
});

// Edit Route - Form to edit an existing listing
app.get("/listings/:id/edit", async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  res.render("listings/edit.ejs", { listing });
});

// Update Route - Update an existing listing
app.put("/listings/:id", async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing }); // Destructuring to get all fields from req.body.listing
  res.redirect(`/listings/${id}`); // Redirect to show page
});

// Delete Route - Delete a listing
app.delete("/listings/:id", async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  res.redirect("/listings");
});

// app.get("/testListing", async (req, res) => {
//   const sampleListing = new Listing({
//     title: "Cozy Cottage",
//     description: "A cozy cottage in the countryside.",
//     price: 1200,
//     location: "Countryside",
//     country: "Wonderland",
//   });

//   await sampleListing.save();
//   console.log("saved");

//   res.render("sample", { sampleListing });
// });

app.listen(8080, (req, res) => {
  console.log("App is running on http://localhost:8080");
});
