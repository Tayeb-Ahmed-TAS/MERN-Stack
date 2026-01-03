const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");

// Index Route - Show all listings
router.get(
  "/",
  wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  })
);

// New Route - Form to create a new listing (Keep it above Show Route otherwise `new` will be treated as :id)

router.get("/new", isLoggedIn, (req, res) => {
  res.render("listings/new.ejs");
});

// Show Route - Show details of a specific listing
router.get(
  "/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id)
      .populate({ path: "reviews", populate: { path: "author" } })
      .populate("owner"); // Populate reviews and owner details
    // { path: "reviews", populate: { path: "author" } } populates author inside reviews array (nested populate)
    if (!listing) {
      req.flash("error", "Listing you requested for does not exist!");
      res.redirect("/listings");
    } else {
      res.render("listings/show.ejs", { listing });
    }
  })
);

// Create Route - Create a new listing
router.post(
  "/",
  isLoggedIn,
  validateListing,
  wrapAsync(async (req, res) => {
    let newListing = new Listing(req.body.listing); // because in form we have used listing[title], listing[description]...
    newListing.owner = req.user._id; // Set the owner of the listing to the logged-in user
    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
  })
);

// Edit Route - Form to edit an existing listing
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);

    if (!listing) {
      req.flash("error", "Listing you requested for does not exist!");
      res.redirect("/listings");
    } else {
      res.render("listings/edit.ejs", { listing });
    }
  })
);

// Update Route - Update an existing listing
router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  validateListing,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing }); // Destructuring to get all fields from req.body.listing
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`); // Redirect to show page
  })
);

// Delete Route - Delete a listing
router.delete(
  "/:id",
  isLoggedIn,
  isOwner,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
  })
);

module.exports = router;
