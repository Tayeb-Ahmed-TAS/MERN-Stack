const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
// Here, cloud_name, api_key, and api_secret name mustbe same as here.

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "wanderlust_DEV", // The name of the folder in Cloudinary where images will be stored
    allowedFormats: ["jpeg", "png", "jpg"], // Allowed image formats
  },
});

module.exports = { cloudinary, storage };
