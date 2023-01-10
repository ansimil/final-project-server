
require("dotenv/config");

require("./db");

const path = require('path');

const express = require("express");

const app = express();

require("./config")(app);

app.use(express.static(path.join(__dirname, 'public')))

const index = require("./routes/index");
app.use("/", index);

const signup = require("./routes/auth/signup")
app.use("/", signup)

const login = require("./routes/auth/login")
app.use("/", login)

const upload = require("./routes/modules/upload")
app.use("/", upload)

const verify = require("./routes/auth/verify")
app.use("/auth", verify)

const modules = require("./routes/modules/modules")
app.use('/', modules)

const cart = require("./routes/cart")
app.use('/', cart)

const checkout = require("./routes/checkout")
app.use('/', checkout)

const forgotPassword = require("./routes/forgotPassword")
app.use('/', forgotPassword)

require("./error-handling")(app);


module.exports = app;
