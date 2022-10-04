const router = require("express").Router();
const User = require("../../models/User");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

router.post('/login',  (req, res, next) => {
    const { email, password } = req.body;
   
    if (email === '' || password === '') {
      res.status(400).json({ message: "Provide email and password." });
      return;
    }
   
    User.findOne({ email })
      .then((foundUser) => {
      
        if (!foundUser) {
          res.status(401).json({ message: "User not found." })
          return;
        }
   
        const passwordCorrect = bcrypt.compareSync(password, foundUser.password);
   
        if (passwordCorrect) {
          const { _id, email, isAdmin, firstName, cart} = foundUser;
          
          const payload = { _id, email, isAdmin, firstName, cart };
   
          const authToken = jwt.sign( 
            payload,
            `${process.env.TOKEN_SECRET}`,
            { algorithm: 'HS256', expiresIn: "6h" }
          );
        console.log('authToken', authToken);
          console.log(cart)
          res.status(200).json({ authToken: authToken, cart });
        }
        else {
          res.status(401).json({ message: "Your email or your password is incorrect" });
        }
   
      })
      .catch(err => res.status(500).json({ message: "Internal Server Error" }));


});

module.exports = router;