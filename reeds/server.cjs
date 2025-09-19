const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config();
const port = process.port || 3000;
const multer = require("multer");
const stroage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + req.file.originalname);
  },
});
app.use("/uploads", express.static("uploads"));
const upload = multer({ storage: stroage });
app.post("/", upload.single("image"), async (req, res) => {
  const file = req.file;
  if (file) {
    res.status(200).json({ message: "is found" });
    const image = `http://localhost:5000/uploads/${req.file.filename}`;
  }
});
let food = ["fghfgh", "fghfgh", "fghfgh"];
food.charAt(0);
const jws = require("jsonwebtoken");
const token = jws.sign({ email, id: UserActivation._id }, process.env.secret, {
  expiresIn: "1w",
});
