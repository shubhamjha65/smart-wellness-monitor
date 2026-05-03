const MoodEntry = require("../models/MoodEntry");
const User = require("../models/User");
const { calculateMood } = require("../utils/moodCalculator");

// ----------------------
// Submit Mood
// ----------------------
exports.submitMood = async (req, res) => {
  try {
    const { answers } = req.body;

    const user = await User.findById(req.user.id);

    // ✅ Ensure learning profile exists (important for old users)
    if (!user.learningProfile) {
      user.learningProfile = {
        baselineMood: 0,
        categoryWeights: {
          stress: 1,
          sleep: 1,
          social: 1,
          productivity: 1,
          emotion: 1
        }
      };
    }

    // ✅ Calculate mood (adaptive)
    const result = calculateMood(answers, user);

    // ✅ Save mood entry
    const newEntry = new MoodEntry({
      userId: req.user.id,
      answers,
      totalScore: result.totalScore,
      mood: result.mood
    });

    await newEntry.save();

    // ----------------------
    // 🧠 LEARNING UPDATE
    // ----------------------
    const lp = user.learningProfile;

    // Update baseline (moving average)
    lp.baselineMood = (lp.baselineMood + result.totalScore) / 2;

    // Adjust category weights dynamically
    Object.keys(result.categoryScores).forEach(cat => {
      const score = result.categoryScores[cat];

      if (score < -10) {
        lp.categoryWeights[cat] += 0.1; // increase importance
      } else if (score > 10) {
        lp.categoryWeights[cat] -= 0.05; // decrease importance
      }

      // Clamp values (prevent extreme weights)
      lp.categoryWeights[cat] = Math.max(
        0.5,
        Math.min(2, lp.categoryWeights[cat])
      );
    });

    await user.save();

    // ✅ Send response
    res.json(result);

  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

// ----------------------
// Get Mood History
// ----------------------
exports.getHistory = async (req, res) => {
  try {
    const data = await MoodEntry.find({ userId: req.user.id })
      .sort({ createdAt: -1 });

    res.json(data);

  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};