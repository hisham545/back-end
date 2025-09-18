const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const emails = require("./emails.cjs");

// register
router.post("/user/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "الرجاء إدخال الإيميل والباسورد" });
    }

    const exist = await emails.findOne({ email });
    if (exist) {
      return res.status(400).json({ message: "هذا الإيميل مسجل بالفعل" });
    }

    const hash = await bcrypt.hash(password, 10);
    const user = new emails({ email, password: hash });
    await user.save();

    const token = jwt.sign({ email, id: user._id }, process.env.secret, {
      expiresIn: "1w",
    });

    res.status(201).json({ message: "تم التسجيل بنجاح", user, token });
  } catch (err) {
    res.status(500).json({ message: "خطأ في السيرفر", error: err.message });
  }
});

// signin
router.post("/user/sign", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "الرجاء إدخال الإيميل والباسورد" });
    }

    const user = await emails.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "الحساب غير موجود" });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(400).json({ message: "كلمة المرور غير صحيحة" });
    }

    const token = jwt.sign({ email, id: user._id }, process.env.secret, {
      expiresIn: "1w",
    });

    res.status(200).json({ message: "تم تسجيل الدخول بنجاح", user, token });
  } catch (err) {
    res.status(500).json({ message: "خطأ في السيرفر", error: err.message });
  }
});

module.exports = router;
