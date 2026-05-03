const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  refreshToken: { type: String }, // ✅ added

  //Learning profile
  learningProfile: {
  baselineMood: { type: Number, default: 0 },
  categoryWeights: {
    stress: { type: Number, default: 1 },
    sleep: { type: Number, default: 1 },
    social: { type: Number, default: 1 },
    productivity: { type: Number, default: 1 },
    emotion: { type: Number, default: 1 }
  }
}
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);