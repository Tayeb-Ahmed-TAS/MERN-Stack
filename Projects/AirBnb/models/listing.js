const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const default_image =
  "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png";

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    type: String,
    set: (v) => (v === "" ? default_image : v), // Set default image if empty string
    default: default_image, // Default image if no value provided
  },
  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

// Middleware to remove associated reviews when a listing is deleted
listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
