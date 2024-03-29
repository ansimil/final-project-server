const router = require("express").Router();
const User = require("../../models/User");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

router.post('/login',  (req, res, next) => {
    const { email, password } = req.body;
   
    if (email === '' || password === '') {
      res.status(400).json({ message: "Please provide email and password." });
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
          const { _id, email, isAdmin, firstName, cart, surname} = foundUser;
          
          const payload = { _id, email, isAdmin, firstName, cart, surname };
   
          const authToken = jwt.sign( 
            payload,
            `${process.env.TOKEN_SECRET}`,
            { algorithm: 'HS256', expiresIn: "6h" }
          );
          res.status(200).json({ authToken: authToken, cart });
        }
        else {
          res.status(401).json({ message: "Your email or password is incorrect" });
        }
   
      })
      .catch(err => res.status(500).json({ message: "Internal Server Error" }));


});

module.exports = router;