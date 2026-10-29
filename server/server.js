const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const crowdRoutes = require("./routes/crowdRoutes");
const locationRoutes = require("./routes/locationRoutes");
const surveyRoutes = require("./routes/surveyRoutes");
const surveyResponseRoutes = require("./routes/surveyResponseRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/crowd", crowdRoutes);
app.use("/api/locations", locationRoutes);
app.use("/api/surveys", surveyRoutes);
app.use("/api/survey-responses", surveyResponseRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Campus CrowdSense API is running"
  });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    app.listen(5000, () => {
      console.log("Server running on port 5000");
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });