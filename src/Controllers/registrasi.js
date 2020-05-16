const userData = require("../Schema/registration.schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  GET_REGISTERED_USER: (req, res) => {
    userData
      .find()
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  },
  SAVE_USER: (req, res) => {
    const { name, email, password, gender, no } = req.body;
    const user = { name, email, password, gender, no };

    const newUser = new userData(user);
    newUser
      .save()
      .then(() => res.status(200).json({ status: 200, message: "User Added" }))
      .catch((error) => {
        res.status(500).json({ status: 500, message: error.errmsg });
      });
  },
  LOGIN: (req, res, next) => {
    const { email, password } = req.body;
    userData.findOne({ email: email }, (err, result) => {
      if (err) {
        next(err);
      } else {
        if (bcrypt.compareSync(password, result.password)) {
          const TOKEN = jwt.sign(
            { id: result._id },
            process.env.JWT_SECRET_KEY,
            {
              expiresIn: "1h",
            }
          );

          res.status(200).json({
            status: 200,
            message: "User Found!",
            token: TOKEN,
            data: result,
          });
        } else {
          res
            .status(500)
            .json({ status: 500, message: "User Not Found!", data: null });
        }
      }
    });
  },
};
