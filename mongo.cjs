const mongoose = require("mongoose");
const connectDB = async function () {
  try {
    await mongoose
      .connect(process.env.MONGO)
      .then(() => console.log("connected"));
  } catch (err) {
    console.log("error");
  }
};
module.exports = connectDB;
