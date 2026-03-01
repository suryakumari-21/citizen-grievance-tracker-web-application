// backend/routes/stats.js
const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/authMiddleware");
const Complaint = require("../models/Complaint");

// @route   GET /api/stats
// @desc    Get complaint statistics for admin
// @access  Private (Admin only)
router.get("/", authenticate, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "Access denied: Admins only" });
    }

    const total = await Complaint.countDocuments();
    const pending = await Complaint.countDocuments({ status: "Pending" });
    const inProgress = await Complaint.countDocuments({ status: "In Progress" });
    const resolved = await Complaint.countDocuments({ status: "Resolved" });

    res.json({
      total,
      pending,
      inProgress,
      resolved,
    });
  } catch (err) {
    console.error("Stats error:", err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
