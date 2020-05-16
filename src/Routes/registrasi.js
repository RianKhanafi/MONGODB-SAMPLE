const express = require("express");
const Router = express.Router();
const authToken = require("../libs/jwtAuth");

/** Import Controller **/
const RegistrasiController = require("../Controllers/registrasi");

/**Router**/
Router.get(
  "/registered-user",
  authToken,
  RegistrasiController.GET_REGISTERED_USER
);
Router.post("/register-user", RegistrasiController.SAVE_USER);
Router.post("/login", RegistrasiController.LOGIN);

module.exports = Router;
