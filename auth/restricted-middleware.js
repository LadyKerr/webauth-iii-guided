const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets");

module.exports = (req, res, next) => {
  //get token from Authorization header
  const token = req.headers.authorization;
  //verify token
  if (token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "you shall not pass." }); //invalid token
      } else {
        req.jwtToken = decodedToken; //valid token - makes token available to rest of the app
        next();
      }
    });
  } else {
    res.status(401).json({ message: "you shall not pass; no token provided." });
  }
};
