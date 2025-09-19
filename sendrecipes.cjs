const express = require("express");
const router = express.Router();
const multer = require("multer");
const recipe = require("./recipes.cjs"); // الـ Mongoose model

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/add", upload.single("image"), async (req, res) => {
  const { title, desc } = req.body;
  const file = req.file;
  if (title && desc && file) {
    const image = `https://my-backend.vercel.app
/uploads/${req.file.filename}`;
    const all = await recipe.create({
      title,
      desc,
      image,
    });
    res.status(201).json(all);
  }
});
router.get("/", async (req, res) => {
  const all = await recipe.find();
  if (all) {
    res.status(200).json(all);
  }
});
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await recipe.findByIdAndDelete(id);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(400).json({ message: "user is not found" });
  }
});

module.exports = router;
