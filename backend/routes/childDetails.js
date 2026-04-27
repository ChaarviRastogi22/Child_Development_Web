const express = require("express");
const router = express.Router();
const ChildDetails = require("../models/ChildDetails");

// POST - save form data
router.post("/submit", async (req, res) => {
  try {
    const data = new ChildDetails(req.body);
    await data.save();

    res.status(201).json({
      message: "Form data saved successfully ✅"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error ❌" });
  }
});

module.exports = router;