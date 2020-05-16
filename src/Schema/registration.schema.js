const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const Schema = mongoose.Schema;

const UserRegistration = new Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    gender: {
      type: String,
    },
    no: {
      type: Number,
      unique: true,
    },
  },
  { versionKey: false, timestamps: true, collection: "user_registration" }
);

//Hash user password
// if i use ()=> not success
UserRegistration.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, saltRounds);
  next();
});
const userData = mongoose.model("user_registration", UserRegistration);
module.exports = userData;
