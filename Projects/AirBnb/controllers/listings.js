const Listing = require("../models/listing");

// Index Route - Show all listings
module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};

// New Route - Form to create a new listing
module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

// Show Route - Show details of a specific listing
module.exports.showListing = async (req, res) => {
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
};

// Create Route - Create a new listing
module.exports.createListing = async (req, res) => {
  let url = req.file.path; // Get the uploaded image URL from Cloudinary
  let filename = req.file.filename; // Get the uploaded image filename from Cloudinary
  let newListing = new Listing(req.body.listing); // because in form we have used listing[title], listing[description]...
  newListing.owner = req.user._id; // Set the owner of the listing to the logged-in user
  newListing.image = { url, filename }; // Set image url and filename
  await newListing.save();
  req.flash("success", "New Listing Created!");
  res.redirect("/listings");
};

// Edit Route - Form to edit an existing listing
module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);

  if (!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    res.redirect("/listings");
  } else {
    res.render("listings/edit.ejs", { listing });
  }
};

// Update Route - Update an existing listing
module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing }); // Destructuring to get all fields from req.body.listing
  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`); // Redirect to show page
};

// Delete Route - Delete a listing
module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted!");
  res.redirect("/listings");
};
