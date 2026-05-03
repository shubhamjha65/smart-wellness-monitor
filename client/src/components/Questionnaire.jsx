import { useState } from "react";
import "./Questionnaire.css";

export default function Questionnaire({ onSubmit }) {
  const [current, setCurrent] = useState("start");
  const [answers, setAnswers] = useState([]);
  const [slider, setSlider] = useState(50);

  const questionTree = {
    start: { type: "slider", question: "How are you feeling today?", category: "emotion" },

    routine: {
      question: "How did you start your day?",
      category: "habit",
      options: [
        { text: "💪 Exercise", score: 10, next: "sleep" },
        { text: "📱 Phone scrolling", score: -5, next: "sleep" },
        { text: "⚡ Rushed / chaotic", score: -10, next: "sleep" }
      ]
    },

    sleep: {
      question: "How was your sleep?",
      category: "sleep",
      options: [
        { text: "😴 Refreshing", score: 10, next: "energy" },
        { text: "😐 Average", score: 0, next: "energy" },
        { text: "😫 Poor", score: -10, next: "energy" }
      ]
    },

    energy: {
      question: "Your energy level right now?",
      category: "energy",
      options: [
        { text: "⚡ High", score: 10, next: "productivity" },
        { text: "🙂 Normal", score: 0, next: "productivity" },
        { text: "😴 Low", score: -10, next: "productivity" }
      ]
    },

    productivity: {
      question: "How productive do you feel?",
      category: "productivity",
      options: [
        { text: "🚀 Very productive", score: 10, next: "stress" },
        { text: "😐 Average", score: 0, next: "stress" },
        { text: "😓 Unproductive", score: -10, next: "stress" }
      ]
    },

    stress: {
      question: "Your stress level?",
      category: "stress",
      options: [
        { text: "😌 Low", score: 10, next: "social" },
        { text: "😐 Moderate", score: 0, next: "social" },
        { text: "😖 High", score: -15, next: "social" }
      ]
    },

    social: {
      question: "How socially connected do you feel?",
      category: "social",
      options: [
        { text: "🤝 Very connected", score: 10, next: "branch" },
        { text: "🙂 Neutral", score: 0, next: "branch" },
        { text: "😔 Isolated", score: -10, next: "branch" }
      ]
    },

    branch: { type: "branch" },

    negative_reason: {
      question: "What is affecting you the most?",
      category: "emotion",
      options: [
        { text: "📚 Studies", score: -10, next: "overthinking" },
        { text: "💔 Relationships", score: -15, next: "overthinking" },
        { text: "🏠 Family", score: -10, next: "overthinking" },
        { text: "🤷 I am not sure", score: -5, next: "overthinking" }
      ]
    },

    overthinking: {
      question: "Do you feel you're overthinking?",
      category: "mindset",
      options: [
        { text: "🧠 Yes, a lot", score: -15, next: "coping" },
        { text: "😕 Sometimes", score: -5, next: "coping" },
        { text: "🙂 Not really", score: 5, next: "coping" }
      ]
    },

    coping: {
      question: "How are you handling it?",
      category: "habit",
      options: [
        { text: "🗣 Talking to someone", score: 10, next: "end" },
        { text: "🙈 Ignoring", score: -5, next: "end" },
        { text: "🏃 Keeping busy", score: 0, next: "end" }
      ]
    },

    positive_trigger: {
      question: "What made you feel good today?",
      category: "emotion",
      options: [
        { text: "🏆 Achievement", score: 10, next: "consistency" },
        { text: "👥 Friends", score: 8, next: "consistency" },
        { text: "🛌 Relaxation", score: 6, next: "consistency" }
      ]
    },

    consistency: {
      question: "How consistent is your routine?",
      category: "habit",
      options: [
        { text: "🔥 Very consistent", score: 10, next: "growth" },
        { text: "🙂 Sometimes", score: 0, next: "growth" },
        { text: "😓 Not consistent", score: -10, next: "growth" }
      ]
    },

    growth: {
      question: "Are you working towards your goals?",
      category: "mindset",
      options: [
        { text: "🎯 Yes actively", score: 10, next: "end" },
        { text: "🤞 Trying", score: 5, next: "end" },
        { text: "😞 Not really", score: -5, next: "end" }
      ]
    }
  };

  // ✅ DEFINE FIRST
  const calculateTotalSteps = () => {
    let baseSteps = 7;
    let branchSteps = 3;
    return baseSteps + branchSteps;
  };

  const totalSteps = calculateTotalSteps();

  // ✅ THEN USE
  const progress = Math.min((answers.length / totalSteps) * 100, 100);

  const handleSlider = () => {
    const score = Math.round((slider - 50) * 0.8);
    const newAnswers = [...answers, { text: slider, score, category: "emotion" }];
    setAnswers(newAnswers);
    setCurrent("routine");
  };

  const handleOption = (opt) => {
    const newAnswers = [...answers, { ...opt, category: questionTree[current].category }];
    setAnswers(newAnswers);

    if (opt.next === "branch") branchLogic(newAnswers);
    else if (opt.next === "end") onSubmit(newAnswers);
    else setCurrent(opt.next);
  };

  const branchLogic = (answers) => {
    const emotionScore = answers[0].score;
    if (emotionScore < -10) setCurrent("negative_reason");
    else if (emotionScore > 10) setCurrent("positive_trigger");
    else onSubmit(answers);
  };

  const q = questionTree[current];

  return (
    <div className="question-wrapper">
      <div className="question-card fade-in">

        <div className="progress-bar-bg">
          <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
        </div>

        <div className="step-text">
          Question {Math.min(answers.length + 1, totalSteps)} / {totalSteps}
        </div>

        <h3>{q.question}</h3>

        {q.type === "slider" && (
          <div className="slider-box">
            <input
              type="range"
              min="0"
              max="100"
              value={slider}
              onChange={(e) => setSlider(e.target.value)}
            />
            <p>{slider}%</p>
            <button onClick={handleSlider}>Next</button>
          </div>
        )}

        {q.options && (
          <div className="options">
            {q.options.map((opt, i) => (
              <button key={i} className="option-btn" onClick={() => handleOption(opt)}>
                {opt.text}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}