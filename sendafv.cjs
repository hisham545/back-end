const express = require("express");
const router = express.Router();
const fav = require("./favourites.cjs");
router.post("/", async (req, res) => {
  const { title1, desc1, image1 } = req.body;

  if (title1 && desc1 && image1) {
    const all = await fav.create({
      title1,
      desc1,
      image1,
    });
    res.status(201).json(all);
  }
});
router.get("/fav", async (req, res) => {
  const all = await fav.find();
  if (all) {
    res.status(200).json(all);
  } else {
    res.status(400).json({ message: "not found" });
  }
});
router.delete("/fav/:id", async (req, res) => {
  const { id } = req.params;
  const user = await fav.findByIdAndDelete(id);
  if (user) {
    res.status(200).json({ message: "deleted" });
  } else {
    res.status(400).json({ message: "not found" });
  }
});
module.exports = router;
