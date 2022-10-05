const router = require('express').Router()
const User = require('../models/User')
const { isAuthenticated } = require('../middleware/jwt.middleware'); 


router.put('/update-cart', isAuthenticated, (req, res, next) => {
    const cartDetails = req.body.cartDetails
    const userId = req.body.user._id

    // console.log(cartDetails, userId)
    
    User.findByIdAndUpdate(userId, {$set: {cart: cartDetails}}, {new: true})
        .then(response => {
            // console.log(response)
            res.status(200).json(response.data)
        })
        .catch(err => console.log(err))
    
})


module.exports = router;