const express = require("express");
const router = express.Router({ mergeParams: true }); // mergeParams to access :id from parent route
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const wrapAsync = require("../utils/wrapAsync.js");
const {
  validateReview,
  isLoggedIn,
  isReviewAuthor,
} = require("../middleware.js");

// Create Review Route

router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    let listing = await Listing.findById(id);
    let newReview = new Review(req.body.review); // Adding review to Review collection
    newReview.author = req.user._id; // Setting the author of the review (logged-in user)
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
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(async (req, res) => {
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } }); // Removing review reference from listing's reviews array
    await Review.findByIdAndDelete(reviewId); // Deleting review from Review collection
    req.flash("success", "Review Deleted!");
    res.redirect(`/listings/${id}`);
  })
);

module.exports = router;
