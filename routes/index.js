const router = require("express").Router();
const { isAuthenticated } = require("../middleware/jwt.middleware");
const User = require("../models/User")

router.get("/", (req, res, next) => {
  User.find()
  .then(() => res.json("All good in here"))
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


router.put('/profile/:userId/edit', isAuthenticated, (req, res, next) => {
  User.findByIdAndUpdate(req.params.userId, {firstName: req.body.newUser.firstName, surname: req.body.newUser.surname}, {new: true})
  .then (response => res.json(response))
  .catch(err => console.log(err))
})

router.get('/profile/:userId', (req, res, next) => {
  User.findById(req.params.userId)
  .then (response => res.status(200).json(response))
  .catch(err => console.log(err))
})

module.exports = router;

