const express = require("express");
const router = express.Router({ mergeParams: true }); // mergeParams to access :id from parent route
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { reviewSchema } = require("../schema.js");

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

// Create Review Route

router.post(
  "/",
  validateReview,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    let listing = await Listing.findById(id);
    let newReview = new Review(req.body.review); // Adding review to Review collection
    listing.reviews.push(newReview); // Pushing review to listing's reviews array

    // Save both listing and review
    await newReview.save();
    req.flash("success", "New Review Created!");
    await listing.save();

    res.redirect(`/listings/${id}`);
  })
);

// Delete Review Route

router.delete(
  "/:reviewId",
  wrapAsync(async (req, res) => {
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } }); // Removing review reference from listing's reviews array
    await Review.findByIdAndDelete(reviewId); // Deleting review from Review collection
    req.flash("success", "Review Deleted!");
    res.redirect(`/listings/${id}`);
  })
);

module.exports = router;
