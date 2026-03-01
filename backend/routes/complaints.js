// backend/routes/complaints.js
const express = require("express");
const router = express.Router();
const Complaint = require("../models/Complaint");
const { authenticate } = require("../middleware/authMiddleware");

// Create complaint (citizen)
router.post("/", authenticate, async (req, res) => {
  try {
    const { title, category, description, photo } = req.body;
    const newComplaint = new Complaint({
      user: req.user._id,
      title,
      category,
      description,
      photo: photo || "",
      status: "Pending",
    });
    const saved = await newComplaint.save();
    await saved.populate("user", ["name", "email"]);
    res.json(saved);
  } catch (err) {
    console.error("Create complaint error:", err.message);
    res.status(500).send("Server error");
  }
});

// Get all complaints (admin -> all, citizen -> own)
router.get("/", authenticate, async (req, res) => {
  try {
    let complaints;
    if (req.user.role === "admin") {
      complaints = await Complaint.find()
        .populate("user", ["name", "email"])
        .sort({ createdAt: -1 });
    } else {
      complaints = await Complaint.find({ user: req.user._id })
        .populate("user", ["name", "email"])
        .sort({ createdAt: -1 });
    }
    res.json(complaints);
  } catch (err) {
    console.error("Get complaints error:", err.message);
    res.status(500).send("Server error");
  }
});

// ⚠️ IMPORTANT: /stats/weekly MUST be defined BEFORE /:id
// otherwise Express will interpret "stats" as an :id param
router.get("/stats/weekly", authenticate, async (req, res) => {
  try {
    if (req.user.role !== "admin")
      return res.status(403).json({ msg: "Access denied" });

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const resolvedThisWeek = await Complaint.countDocuments({
      status: "Resolved",
      updatedAt: { $gte: oneWeekAgo },
    });

    res.json({ resolvedThisWeek });
  } catch (err) {
    console.error("Stats error:", err.message);
    res.status(500).send("Server error");
  }
});

// Update status (admin only)
router.put("/:id/status", authenticate, async (req, res) => {
  try {
    if (req.user.role !== "admin")
      return res.status(403).json({ msg: "Access denied" });

    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) return res.status(404).json({ msg: "Not found" });

    complaint.status = req.body.status;
    await complaint.save();

    await complaint
      .populate("user", ["name", "email"])
      .populate({ path: "comments.user", select: "name email" });

    res.json({ msg: "Status updated", complaint });
  } catch (err) {
    console.error("Update status error:", err.message);
    res.status(500).send("Server error");
  }
});

// Add comment (citizen or admin)
router.post("/:id/comments", authenticate, async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) return res.status(404).json({ msg: "Not found" });

    const comment = {
      user: req.user._id,
      body: req.body.body || "",
      date: new Date(),
    };

    complaint.comments.push(comment);
    await complaint.save();

    await complaint
      .populate("user", ["name", "email"])
      .populate({ path: "comments.user", select: "name email" });

    res.json({ msg: "Comment added", complaint });
  } catch (err) {
    console.error("Add comment error:", err.message);
    res.status(500).send("Server error");
  }
});

// Get single complaint by id (admin can view any; citizen only own)
router.get("/:id", authenticate, async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id)
      .populate("user", ["name", "email"])
      .populate({ path: "comments.user", select: "name email" });

    if (!complaint) return res.status(404).json({ msg: "Not found" });

    if (
      req.user.role !== "admin" &&
      complaint.user._id.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ msg: "Access denied" });
    }

    res.json(complaint);
  } catch (err) {
    console.error("Get complaint by id error:", err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
