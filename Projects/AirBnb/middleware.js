const Listing = require("./models/listing");
const Review = require("./models/review");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./schema.js");

// Middleware to check if user is logged in or not
module.exports.isLoggedIn = (req, res, next) => {
  // If user is not logged in
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl; // Store the url they are requesting
    req.flash("error", "You must be logged in to perform that action!");
    return res.redirect("/login");
  }

  next();
};

// Middleware to save the redirectUrl

module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }

  next();
};

// Middleware to check if the logged-in user is the owner of the listing
module.exports.isOwner = async (req, res, next) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);

  if (!listing.owner._id.equals(res.locals.currUser._id)) {
    req.flash("error", "You don't have permission to perform that action!");
    return res.redirect(`/listings/${id}`);
  }

  next();
};

// Middleware to check if the logged-in user is the author of the reviewgit 
module.exports.isReviewAuthor = async (req, res, next) => {
  const { id, reviewId } = req.params;
  const review = await Review.findById(reviewId);

  if (!review.author._id.equals(res.locals.currUser._id)) {
    req.flash("error", "You don't have permission to perform that action!");
    return res.redirect(`/listings/${id}`);
  }

  next();
};

// Middleware to validate listing data using Joi schema
module.exports.validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(", ");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

// Middleware to validate review data using Joi schema
module.exports.validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(", ");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};
