const mongoose = require("mongoose");

const surveyResponseSchema = new mongoose.Schema(
  {
    surveyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Survey",
      required: true
    },

    location: {
      type: String,
      required: true
    },

    crowdLevel: {
      type: String,
      enum: ["Low", "Moderate", "High"],
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "SurveyResponse",
  surveyResponseSchema
);