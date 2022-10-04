const router = require("express").Router();
const User = require("../models/User")

router.get("/", (req, res, next) => {
  User.find()
  .then(() => res.status(200))
  .catch(err => console.log(err))
});

router.get("/profile", (req, res, next) => {
  User.find()
  .then(response => res.json(response))
  .catch(err => console.log(err))
});

router.get("/wishlist", (req, res, next) => {
  // console.log(req.body)
  const { _id } = req.body
  User.findById(_id)
  .populate('wishlist')
  .then(response => res.json(response))
  .catch(err => console.log(err))
});

router.get("/dashboard", (req, res, next) => {
  res.status(200)
})

module.exports = router;
