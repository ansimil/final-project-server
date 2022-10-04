require("dotenv").config()

const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: "298587826288238",
  api_secret: "36zaYcW_H4iFhSoZLgYCjWycroo",
  secure: true
});


const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    allowed_formats: ["jpg", "png"],
    folder: "modules-gallery"
  }
});

module.exports = multer({ storage });
