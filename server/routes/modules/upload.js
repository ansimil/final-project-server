const router = require('express').Router()
const fileUploader = require("../../config/cloudinary.config");

router.post("/upload", fileUploader.single("imageUrl"), (req, res, next) => {
    console.log("file is: ", req.file)
   
    if (!req.file) {
      next(new Error("No file uploaded!"));
      return;
    }
    res.status(200).json({ fileUrl: req.file.path });
  });

  module.exports = router;
