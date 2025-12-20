const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./schema.js");

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

// Middleware to validate listing data using Joi schema
const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(", ");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

// Middleware to validate review data using Joi schema
const validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(", ");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

// Index Route - Show all listings
app.get(
  "/listings",
  wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  })
);

// New Route - Form to create a new listing (Keep it above Show Route otherwise `new` will be treated as :id)

app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});

// Show Route - Show details of a specific listing
app.get(
  "/listings/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id).populate("reviews");
    res.render("listings/show.ejs", { listing });
  })
);

// Create Route - Create a new listing
app.post(
  "/listings",
  validateListing,
  wrapAsync(async (req, res) => {
    let newListing = new Listing(req.body.listing); // because in form we have used listing[title], listing[description]...
    await newListing.save();
    res.redirect("/listings");
  })
);

// Edit Route - Form to edit an existing listing
app.get(
  "/listings/:id/edit",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
  })
);

// Update Route - Update an existing listing
app.put(
  "/listings/:id",
  validateListing,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing }); // Destructuring to get all fields from req.body.listing
    res.redirect(`/listings/${id}`); // Redirect to show page
  })
);

// Delete Route - Delete a listing
app.delete(
  "/listings/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
  })
);

// Rewiews

// Create Review Route

app.post(
  "/listings/:id/reviews",
  validateReview,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    let listing = await Listing.findById(id);
    let newReview = new Review(req.body.review); // Adding review to Review collection
    listing.reviews.push(newReview); // Pushing review to listing's reviews array

    // Save both listing and review
    await newReview.save();
    await listing.save();

    res.redirect(`/listings/${id}`);
  })
);

// Delete Review Route

app.delete(
  "/listings/:id/reviews/:reviewId",
  wrapAsync(async (req, res) => {
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } }); // Removing review reference from listing's reviews array
    await Review.findByIdAndDelete(reviewId); // Deleting review from Review collection
    res.redirect(`/listings/${id}`);
  })
);

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
