const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
