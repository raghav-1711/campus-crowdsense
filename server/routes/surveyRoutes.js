const express = require("express");
const Survey = require("../models/Survey");

const router = express.Router();

// CREATE SURVEY
router.post("/", async (req, res) => {
  try {
    const { question, location, options } = req.body;

    const survey = new Survey({
      question,
      location,
      options
    });

    await survey.save();

    res.status(201).json({
      message: "Survey created successfully",
      survey
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to create survey",
      error: error.message
    });
  }
});

// GET ALL SURVEYS
router.get("/", async (req, res) => {
  try {
    const surveys = await Survey.find().sort({ createdAt: -1 });

    res.json(surveys);

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch surveys",
      error: error.message
    });
  }
});

// TOGGLE SURVEY ACTIVE STATUS
router.patch("/:id/toggle", async (req, res) => {
  try {
    const survey = await Survey.findById(req.params.id);

    if (!survey) {
      return res.status(404).json({
        message: "Survey not found"
      });
    }

    survey.active = !survey.active;

    await survey.save();

    res.json({
      message: "Survey status updated",
      survey
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to update survey status",
      error: error.message
    });
  }
});

// DELETE SURVEY
router.delete("/:id", async (req, res) => {
  try {
    await Survey.findByIdAndDelete(req.params.id);

    res.json({
      message: "Survey deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to delete survey",
      error: error.message
    });
  }
});

module.exports = router;