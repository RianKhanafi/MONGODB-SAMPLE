//Import
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
require("./libs/connection.js");
const RouterNavigation = require("./Routes/index");

//Defined
const app = express();
const port = process.env.PORT || 5000;

// Require

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", cors(), RouterNavigation);

app.get("/welcome", (req, res) => {
  res.send("Hello World");
});

// add not found route must on bottom
app.get("*", (req, res) => {
  res.send("Sorry, 404 not found");
});

app.listen(port, () =>
  console.log(`Server is running at http://localhoost:${port}`)
);
