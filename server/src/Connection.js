require("dotenv").config();

const mongoose = require("mongoose");

const connectionStr = process.env.MONGO_DB;
const db = async () => {
  try {
    await mongoose.connect(connectionStr, { useNewUrlparser: true });
    console.log("connected to mongodb");
  } catch (error) {
    console.log(err);
  }
};
// const db = mongoose
//   .connect(connectionStr, { useNewUrlparser: true })
//   .then(() => console.log("connected to mongodb"))
//   .catch((err) => console.log(err));

// mongoose.connection.on("error", (err) => {
//   console.log(err);
// });

module.exports = db;
