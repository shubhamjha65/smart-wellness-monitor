const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { submitMood, getHistory } = require("../controllers/moodController");

router.post("/submit", auth, submitMood);
router.get("/history", auth, getHistory);

module.exports = router;