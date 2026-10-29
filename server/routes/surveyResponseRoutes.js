const express = require("express");
const SurveyResponse = require("../models/SurveyResponse");
const CrowdReport = require("../models/CrowdReport");

const router = express.Router();

// SAVE SURVEY RESPONSE
router.post("/", async (req, res) => {
  try {
    const { surveyId, location, crowdLevel } = req.body;

    const response = new SurveyResponse({
      surveyId,
      location,
      crowdLevel
    });

    await response.save();

    // GET ALL RESPONSES FOR THIS LOCATION
const responses = await SurveyResponse.find({
  location
});

let totalScore = 0;

responses.forEach((item) => {
  if (item.crowdLevel === "Low") {
    totalScore += 25;
  }

  if (item.crowdLevel === "Moderate") {
    totalScore += 60;
  }

  if (item.crowdLevel === "High") {
    totalScore += 90;
  }
});

const percentage = Math.round(
  totalScore / responses.length
);

let calculatedLevel;

if (percentage < 40) {
  calculatedLevel = "Low";
} else if (percentage < 70) {
  calculatedLevel = "Moderate";
} else {
  calculatedLevel = "High";
}

// UPDATE CROWD REPORT
const report = new CrowdReport({
  location,
  crowdLevel: calculatedLevel,
  percentage
});

res.status(201).json({
  message: "Survey response saved and crowd updated",
  response,
  crowdLevel: calculatedLevel,
  percentage
});

  } catch (error) {
    res.status(500).json({
      message: "Failed to save survey response",
      error: error.message
    });
  }
});

// GET SURVEY RESPONSES
router.get("/", async (req, res) => {
  try {
    const responses = await SurveyResponse
      .find()
      .sort({ createdAt: -1 });

    res.json(responses);

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch survey responses",
      error: error.message
    });
  }
});

// CALCULATE CROWD LEVEL FOR A LOCATION
router.get("/calculate/:location", async (req, res) => {
  try {
    const location = req.params.location;

    const responses = await SurveyResponse.find({
      location
    });

    if (responses.length === 0) {
      return res.json({
        location,
        percentage: 0,
        crowdLevel: "Low",
        responses: 0
      });
    }

    let totalScore = 0;

    responses.forEach((response) => {
      if (response.crowdLevel === "Low") {
        totalScore += 25;
      }

      if (response.crowdLevel === "Moderate") {
        totalScore += 60;
      }

      if (response.crowdLevel === "High") {
        totalScore += 90;
      }
    });

    const percentage = Math.round(
      totalScore / responses.length
    );

    let crowdLevel;

    if (percentage < 40) {
      crowdLevel = "Low";
    } else if (percentage < 70) {
      crowdLevel = "Moderate";
    } else {
      crowdLevel = "High";
    }

    // Save calculated result as a crowd report
    const report = new CrowdReport({
      location,
      crowdLevel,
      percentage
    });

    await report.save();

    res.json({
      message: "Crowd level calculated and updated",
      location,
      percentage,
      crowdLevel,
      responses: responses.length,
      report
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to calculate crowd level",
      error: error.message
    });
  }
});

module.exports = router;