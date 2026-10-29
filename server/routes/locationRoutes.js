const express = require("express");
const Location = require("../models/Location");

const router = express.Router();

// ADD LOCATION
router.post("/", async (req, res) => {
  try {
    const {
      name,
      latitude,
      longitude,
      capacity
    } = req.body;

    const location = new Location({
      name,
      latitude,
      longitude,
      capacity
    });

    await location.save();

    res.status(201).json(location);
  } catch (error) {
    res.status(500).json({
      message: "Failed to add location",
      error: error.message
    });
  }
});

// GET ALL LOCATIONS
router.get("/", async (req, res) => {
  try {
    const locations = await Location.find().sort({ name: 1 });

    res.json(locations);

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch locations",
      error: error.message
    });
  }
});

// DELETE LOCATION
router.delete("/:id", async (req, res) => {
  try {
    await Location.findByIdAndDelete(req.params.id);

    res.json({
      message: "Location deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to delete location",
      error: error.message
    });
  }
});

module.exports = router;