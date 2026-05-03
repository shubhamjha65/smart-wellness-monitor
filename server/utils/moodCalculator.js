exports.calculateMood = (answers, userProfile = null) => {
  let totalScore = 0;

  const categoryScores = {
    stress: 0,
    sleep: 0,
    social: 0,
    productivity: 0,
    emotion: 0
  };

  // Default weights
  let weights = {
    stress: 1,
    sleep: 1,
    social: 1,
    productivity: 1,
    emotion: 1
  };

  // If user has history → adapt
  if (userProfile?.learningProfile) {
    weights = userProfile.learningProfile.categoryWeights;
  }

  // Apply weighted scoring
  answers.forEach(ans => {
    const cat = ans.category || "emotion";
    const weight = weights[cat] || 1;

    const weightedScore = ans.score * weight;

    totalScore += weightedScore;
    categoryScores[cat] += weightedScore;
  });

  // Adjust with baseline
  if (userProfile?.learningProfile) {
    totalScore += userProfile.learningProfile.baselineMood;
  }

  // Mood classification
  let mood = "Neutral";
  if (totalScore > 25) mood = "Happy";
  else if (totalScore < -25) mood = "Sad";

  // Suggestions (adaptive)
  const suggestions = [];

  if (categoryScores.stress < 0)
    suggestions.push("Reduce stress with breathing or short breaks");

  if (categoryScores.sleep < 0)
    suggestions.push("Improve sleep schedule (consistent timing)");

  if (categoryScores.social < 0)
    suggestions.push("Connect with someone you trust");

  if (categoryScores.productivity < 0)
    suggestions.push("Start with small tasks to build momentum");

  if (categoryScores.emotion < 0)
    suggestions.push("Try journaling or mindfulness");

  return {
    totalScore,
    mood,
    categoryScores,
    suggestions
  };
};