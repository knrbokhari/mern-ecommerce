require("dotenv").config();

const mongoose = require("mongoose");

const connectionStr = process.env.MONGO_DB;

mongoose
  .connect(connectionStr, { useNewUrlparser: true })
  .then(() => console.log("connected to mongodb"))
  .catch((err) => console.log(err));

mongoose.connection.on("error", (err) => {
  console.log(err);
});
