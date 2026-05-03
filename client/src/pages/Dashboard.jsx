import Questionnaire from "../components/Questionnaire";
import API from "../services/api";
import { useState } from "react";
import Navbar from "../components/Navbar";
import "./Dashboard.css";

export default function Dashboard() {
  const [result, setResult] = useState(null);

  const submitAnswers = async (answers) => {
    try {
      const formatted = answers.map((a, i) => ({
        questionId: i.toString(),
        answer: a.text,
        score: a.score,
        category: a.category
      }));

      const res = await API.post("/mood/submit", { answers: formatted });
      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert("Error submitting answers");
    }
  };

  const moodEmoji = {
    "Very Happy": "😄",
    "Happy": "🙂",
    "Neutral": "😐",
    "Sad": "😔",
    "Very Sad": "😢"
  };

  return (
    <>
      <Navbar />

      <div className="container">
        <h2>Dashboard</h2>

        {!result ? (
          <Questionnaire onSubmit={submitAnswers} />
        ) : (
          <div className="result-box fade-in">

            {/* Mood */}
            <h3 className={`mood-${result.mood?.toLowerCase().replace(/\s+/g, "-")}`}>
              {moodEmoji[result.mood] || "🙂"} Mood: {result.mood}
            </h3>

            <p className="score">Score: {result.totalScore}</p>

            {/* Insights */}
            <div className="insights-box">
              <h4>🔍 Insights</h4>

              {result?.insights?.length > 0 ? (
                <ul>
                  {result.insights.map((ins, i) => (
                    <li key={i}>⚠️ {ins}</li>
                  ))}
                </ul>
              ) : (
                <p>No major concerns detected.</p>
              )}
            </div>

            {/* Suggestions */}
            <div className="suggestions-box">
              <h4>💡 Suggestions</h4>

              {result?.suggestions?.length > 0 ? (
                <ul>
                  {result.suggestions.map((sug, i) => (
                    <li key={i}>✅ {sug}</li>
                  ))}
                </ul>
              ) : (
                <p>No suggestions available.</p>
              )}
            </div>

            {/* Retake */}
            <button onClick={() => setResult(null)}>
              Retake Test
            </button>

          </div>
        )}
      </div>
    </>
  );
}