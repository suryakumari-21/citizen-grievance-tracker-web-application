// backend/models/Complaint.js
const mongoose = require("mongoose");

const ComplaintSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    category: {
      type: String,
      enum: ["Road", "Water", "Electricity", "Other"],
      required: true,
    },
    description: { type: String, required: true },
    photo: { type: String }, // optional image url
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Resolved"],
      default: "Pending",
    },
    comments: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        body: { type: String, required: true },
        date: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Complaint", ComplaintSchema);
