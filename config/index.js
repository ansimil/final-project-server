const express = require("express");

const logger = require("morgan");

const cookieParser = require("cookie-parser");

const cors = require("cors");

const path = require('path');


module.exports = (app) => {
  app.set("trust proxy", 1);

  app.use(
    cors({
      credentials: true,
      origin: ["http://localhost:3000", 'https://mdi-modular.netlify.app']
    })
  );

  app.use(logger("dev"));

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.set("views", path.join(__dirname, "..", "views"));
  app.set("view engine", "hbs");
;
};
