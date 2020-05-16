const jwt = require("jsonwebtoken");

const AUTH = (req, res, next) => {
  const token = req.headers["x-access-token"] || req.headers["authorization"];

  if (token) {
    if (token.startsWith("Bearer")) {
      token = token.slice(7, token.length);
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: 401,
          message: "Auth token is not supplied",
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.json({
      success: false,
      message: "Auth token is not supplied",
    });
  }
};

module.exports = AUTH;
