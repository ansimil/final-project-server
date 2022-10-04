// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here
// Contrary to the views version, all routes are controlled from the routes/index.js
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

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
