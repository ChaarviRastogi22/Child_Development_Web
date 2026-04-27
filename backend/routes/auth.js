const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// User Schema (better: models/User.js me shift karna later)
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String
});

const User = mongoose.model("User", userSchema);

// REGISTER
router.post("/register", async (req, res) => {
  try {
    let { name, email, password } = req.body;

    email = email.trim().toLowerCase();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({
        success: false,
        message: "Account already exists"
      });
    }

    const newUser = new User({ name, email, password });
    await newUser.save();

    res.json({
      success: true,
      message: "User registered successfully"
    });

  } catch (error) {
    if (error.code === 11000) {
      return res.json({
        success: false,
        message: "Account already exists"
      });
    }

    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const email = req.body.email.trim();
    const password = req.body.password.trim();

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User not found ❌" });
    }

    if (user.password !== password) {
      return res.json({ success: false, message: "Wrong password ❌" });
    }

    res.json({
      success: true,
      message: "Login successful 🎉",
      userId: user._id   // ✅ IMPORTANT
    });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;