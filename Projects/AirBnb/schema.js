const Joi = require("joi");

module.exports.listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.string().required(),
    country: Joi.string().required(),
    price: Joi.number().required().min(0), // Price must be a non-negative number
    image: Joi.string().allow("", null), // It means image field is optional and it can accept empty string or null
  }).required(),
});
