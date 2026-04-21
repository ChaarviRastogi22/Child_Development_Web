const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();


// Middleware
app.use(cors());
app.use(express.json());

// ================== DB CONNECT ==================
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log(err));

// ================== SCHEMAS ==================

// Child Schema
const childSchema = new mongoose.Schema({
  name: String,
  age: Number,
  parentName: String
});

const Child = mongoose.model("Child", childSchema);

// User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String
});

const User = mongoose.model("User", userSchema);

// ================== ROUTES ==================

// Test route
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// ---------- CHILD ROUTES ----------

// GET all children
app.get("/api/child", async (req, res) => {
  try {
    const children = await Child.find();
    res.json(children);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST child data
app.post("/api/child", async (req, res) => {
  try {
    const newChild = new Child(req.body);
    const savedChild = await newChild.save();

    res.json({
      message: "Child data saved ✅",
      data: savedChild
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ---------- AUTH ROUTES ----------

// REGISTER
app.post("/api/register", async (req, res) => {
  try {
    let { name, email, password } = req.body;

    //clean email
    email = email.trim().toLowerCase();

    //check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ 
        success: false,
        message: "Account already exists" });
    }
    // ✅ Create new user
    const newUser = new User({
      name,
      email,
      password
    });

    await newUser.save();

    res.json({
      success: true,
      message: "User registered successfully"
    });

  } catch (error) {

    // 🔥 Handle duplicate error (extra safety)
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
app.post("/api/login", async (req, res) => {
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

    res.json({ success: true, message: "Login successful 🎉" });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ================== SERVER ==================

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});