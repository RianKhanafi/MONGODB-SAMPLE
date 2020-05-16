const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;
mongoose.Promise = global.Promise;
db.once("open", () => console.log("Mongoose default connection open"));
db.once("error", console.error.bind(console, "Mongo db connection error"));
