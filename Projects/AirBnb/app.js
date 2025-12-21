const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");

const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");

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
app.engine("ejs", ejsMate);

app.get("/", (req, res) => {
  res.send("Welcome to the AirBnb clone!");
});

// Use listings routes
app.use("/listings", listings);

// Use reviews routes
app.use("/listings/:id/reviews", reviews);

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

// Error Handling Middlewares

// If page not found
app.use((req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong!" } = err;
  res.status(statusCode).render("error.ejs", { message });
  // res.status(statusCode).send(message);
});

app.listen(8080, (req, res) => {
  console.log("App is running on http://localhost:8080");
});
