const express = require("express");
const CrowdReport = require("../models/CrowdReport");

const router = express.Router();


// SAVE CROWD REPORT
router.post("/", async (req, res) => {
  try {
    const {
  location,
  crowdLevel,
  percentage
} = req.body;

const normalizedLocation = location
  .trim()
  .toLowerCase()
  .replace(/\b\w/g, (char) => char.toUpperCase());

const report = new CrowdReport({
  location: normalizedLocation,
  crowdLevel,
  percentage
});

    await report.save();

    res.status(201).json({
      message: "Crowd report saved successfully",
      report
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to save crowd report",
      error: error.message
    });
  }
});


// GET CURRENT CROWD STATUS
router.get("/", async (req, res) => {
  try {

    const reports = await CrowdReport
      .find()
      .sort({ createdAt: -1 });

    const latestReports = {};

reports.forEach((report) => {
  const normalizedLocation = report.location
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());

  if (!latestReports[normalizedLocation]) {
    latestReports[normalizedLocation] = {
      location: normalizedLocation,
      crowdLevel: report.crowdLevel,
      percentage: report.percentage,
      updatedAt: report.createdAt
    };
  }
});

    res.json(Object.values(latestReports));

  } catch (error) {

    res.status(500).json({
      message: "Failed to fetch crowd reports",
      error: error.message
    });

  }
});


// GET CROWD HISTORY FOR ONE LOCATION
router.get("/history/:location", async (req, res) => {
  try {

    const reports = await CrowdReport
      .find({
        location: req.params.location
      })
      .sort({ createdAt: 1 })
      .limit(100);

    res.json(reports);

  } catch (error) {

    res.status(500).json({
      message: "Failed to fetch crowd history",
      error: error.message
    });

  }
});

// GET TODAY'S REPORT COUNT
router.get("/stats", async (req, res) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const reportCountToday = await CrowdReport.countDocuments({
      createdAt: { $gte: startOfDay }
    });

    res.json({
      reportCountToday
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch report statistics",
      error: error.message
    });
  }
});
module.exports = router;