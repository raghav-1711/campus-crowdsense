const mongoose = require("mongoose");

const crowdReportSchema = new mongoose.Schema(
  {
    location: {
      type: String,
      required: true
    },

    crowdLevel: {
      type: String,
      enum: ["Low", "Moderate", "High"],
      required: true
    },

    percentage: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("CrowdReport", crowdReportSchema);