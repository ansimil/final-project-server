const router = require("express").Router();
const { isAuthenticated } = require('../../middleware/jwt.middleware');
const cors = require('cors')

router.get('/verify', cors(), isAuthenticated, (req, res, next) => {  
    res.status(200).json(req.payload);
  });

  module.exports = router;