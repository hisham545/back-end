const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
app.use(cors());
app.use(express.json());
const connecDB = require("./mongo.cjs");
connecDB();
const fs = require("fs");
if (!fs.existsSync("./uploads")) {
  fs.mkdirSync("./uploads");
}
app.use("/uploads", express.static("uploads"));
app.use("/", require("./sendrecipes.cjs"));
app.use("/", require("./sendafv.cjs"));
app.use("/", require("./sendemail.cjs"));
app.listen(PORT, () => {
  console.log(PORT);
});
