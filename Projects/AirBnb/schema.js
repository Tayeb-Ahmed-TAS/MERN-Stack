const Joi = require("joi");
const Listing = require("./models/listing.js");

let categories = Listing.schema.path("category").enumValues; // Get enum values for category from schema

module.exports.listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.string().required(),
    country: Joi.string().required(),
    price: Joi.number().required().min(0), // Price must be a non-negative number
    image: Joi.string().allow("", null), // It means image field is optional and it can accept empty string or null
    category: Joi.string()
      .valid(...categories) // Deconstruct categories array to pass as individual arguments
      .required(),
  }).required(),
});

module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().required().min(1).max(5),
    comment: Joi.string().required(),
  }).required(),
});
