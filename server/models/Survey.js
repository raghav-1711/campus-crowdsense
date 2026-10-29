const mongoose = require("mongoose");

const surveySchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true
    },

    location: {
      type: String,
      required: true
    },

    options: {
      type: [String],
      required: true
    },

    active: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Survey", surveySchema);