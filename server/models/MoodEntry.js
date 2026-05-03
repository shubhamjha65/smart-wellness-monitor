const mongoose = require("mongoose");

const moodEntrySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  answers: [
    {
      questionId: String,
      answer: String,
      score: Number
    }
  ],
  totalScore: Number,
  mood: String,
  suggestion: String
}, { timestamps: true });

module.exports = mongoose.model("MoodEntry", moodEntrySchema);