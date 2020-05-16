const express = require("express");
const Router = express.Router();

/** Import Router */
const Registrasi = require(`./registrasi`);
const Finance = require("./finance");
Router.use("/api/", Registrasi);
Router.use("/api/", Finance);
module.exports = Router;
