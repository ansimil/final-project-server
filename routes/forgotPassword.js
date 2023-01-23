const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const User = require("../models/User");
const router = require('express').Router();
const nodemailer = require('nodemailer');
require('dotenv').config();
const cors = require("cors");

const address = process.env.NODE_ENV == 'dev' ? 'http://localhost:3000' : 'https://mdi-modular.netlify.app'

const saltRounds = 10;

router.post('/forgotpassword', cors(), (req, res) => {
    if (!req.body.email) {
        res.status(400).json('email required')
        return
    }
    User.findOne({email: req.body.email})
    .then((user) => {
        if (!user) {
            res.status(403).json('email does not exist in the database')
            return
        }
        else {
            const token = crypto.randomBytes(20).toString('hex');
            User.updateOne({"_id": user._id}, {
                $set: {
                    'resetPasswordToken': token,
                    'resetPasswordExpires': Date.now() + 3600000
                }}) 
            .then(() => {
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: `${process.env.EMAIL_ADDRESS}`,
                        pass: `${process.env.EMAIL_PASSWORD}`
                    },
                })
                
                const mailOptions = {
                    from: {
                        name: 'MDI Modular',
                        address: 'mdimodules@gmail.com'
                    },
                    to: `${user.email}`,
                    subject: 'Reset your password',
                    text: 
                    'To reset your password, simply click on the following link.\n\n'
                    + `${address}/resetpassword/${token}\n\n`
                    + 'If you did not request this, simply ignore this email'
                }
                
                transporter.sendMail(mailOptions, (err, response) => {
                    if (err) {
                        console.log(err)
                        res.status(401).json('there was an error', err)
                    }
                    else {
                        res.status(200).json('password reset email sent')
                    }
                })
            })
            .catch(err => console.log(err))
            
            
        }
    })
    .catch(err => console.log(err))
})

router.get('/resetpassword/:resetId', (req, res) => {
    const resetId = req.params.resetId
    User.find({'resetPasswordToken': resetId})
    .then((user) => {
        const tokenExpires = user[0].resetPasswordExpires
        if (tokenExpires > Date.now()){
        res.status(200).json('good')
        }
        else {
        res.status(400).json('not valid')
        }
    })
    .catch(err => console.log(err))
})

router.put('/reset/:resetId', (req, res) => {
    const resetId = req.params.resetId
    const password = req.body.password
    User.find({'resetPasswordToken': resetId})
    .then((user) => {
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(password, salt)
        User.findByIdAndUpdate(user[0]._id, {
            $set: {
            'password': hashedPassword,
            'resetPasswordToken': '',
            'resetPasswordExpires': 0
        }})
        .then (() => {
            res.status(200).json('good')
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

module.exports = router;