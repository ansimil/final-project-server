const router = require("express").Router();
const User = require("../../models/User");
const Wishlist = require("../../models/Wishlist");
const Cart = require("../../models/Cart"); 
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const path = require('path')
var nodemailer = require('nodemailer');
var hbs = require('nodemailer-express-handlebars');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: `${process.env.EMAIL_ADDRESS}`,
      pass: `${process.env.EMAIL_PASSWORD}`
  },
})

const handlebarOptions = {
  viewEngine: {
    extName: ".hbs",
    partialsDir: path.resolve('./views'),
    defaultLayout: false,
  },
  viewPath: path.resolve('./views'),
  extName: ".hbs",
}

const saltRounds = 10;

router.post("/signup", (req, res, next) => {
    const { email, password, firstName, surname } = req.body;
   
    if (email === '' || password === '' || firstName === '' || surname === '') {
      res.status(400).json({ message: "Provide email, password and name" });
      return;
    }
   
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ messageEmail: 'Provide a valid email address.' });
      return;
    }
    
    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!passwordRegex.test(password)) {
      res.status(400).json({ messagePassword: 'Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.' });
      return;
    }
   
   
    User.findOne({ email })
      .then((foundUser) => {
        if (foundUser) {
          res.status(400).json({ message: "User already exists." });
          return;
        }
   
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(password, salt);
   
        return User.create({ email, password: hashedPassword, firstName, surname })
      })
      .then((createdUser) => {
        if (!createdUser) {
          return
        }
        const { email, _id } = createdUser;
        const user = { email, _id, firstName };
        const payload = { _id, email, firstName };
   
        const authToken = jwt.sign( 
        payload,
        `${process.env.TOKEN_SECRET}`,
        { algorithm: 'HS256', expiresIn: "6h" }
        );

        transporter.use('compile', hbs(handlebarOptions));
        
        var mailOptions = {
          from: {
            name: 'MDI Modular',
            address: 'mdimodules@gmail.com'
          },
          to: `${email}`,
          subject: 'Thanks for creating an MDI account!',
          template: 'signupEmailTemplate',
          attachments: [{
            filename: 'mdi-logo.png',
            path: 'public/images/mdi-logo.png',
            cid: 'mdilogo' //same cid value as in the html img src
        }],
          context: {
            user: user
          }
        };
        transporter.sendMail(mailOptions, (err, response) => {
          if (err) {
              console.log(err)
              res.status(401).json('there was an error')
          }
          else {
              res.status(200).json('signup email successful')
          }
        })

        const name = 'Wishlist'
          return Wishlist.create({name})
          .then(newWishlist =>{
            const name = 'Cart'
            return Cart.create({name})
            .then ((newCart)=>{
              return User.findByIdAndUpdate(_id, { $push: {wishlist: newWishlist, cart: newCart } }, {new: true})
              .then(()=>{
                res.status(200).json({ authToken, user, wishlist: newWishlist, cart: newCart })
              })
              .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
          })
          .catch(err => console.log(err))
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" })
      });
  });
 

  
module.exports = router;