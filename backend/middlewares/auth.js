// middlewares/auth.js

const jwt = require("jsonwebtoken");

var moment = require('moment');

module.exports = (req, res, next) => {
  if (!req.header('Authorization')) {
    return res.status(401).send({ message: 'Please make sure your request has an Authorization header' });
  }
  var token = req.header('Authorization').split(' ')[1];

  var payload = null;
  try {
    payload = jwt.decode(token, 'YOUR_UNIQUE_JWT_TOKEN_SECRET');
  }
  catch (err) {
    return res.status(401).send({ message: err.message });
  }

  if (payload.exp <= moment().unix()) {
    return res.status(401).send({ message: 'Token has expired' });
  }

  req.user = payload.userId;
  req.userEmail = payload.email;
  req.admin = payload.admin;
  next();
}