import { useEffect, useState } from "react";
import API from "../services/api";
import MoodChart from "../components/MoodChart";
import Navbar from "../components/Navbar";
import "./History.css";

export default function History() {
  const [data, setData] = useState([]); // ✅ always array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await API.get("/mood/history");

        // ✅ ensure always array
        setData(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error(err);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  // ----------------------
  // 🧠 Trend Calculation
  // ----------------------
  const getTrend = () => {
    if (!data || data.length < 2) return "Not enough data";

    const latest = data[0]?.totalScore || 0;
    const previous = data[1]?.totalScore || 0;

    if (latest > previous) return "📈 Improving";
    if (latest < previous) return "📉 Declining";
    return "➡️ Stable";
  };

  // ----------------------
  // 🔮 Prediction (simple logic)
  // ----------------------
  const predictMood = () => {
    if (!data || data.length < 3) return "Not enough data";

    const avg =
      data.slice(0, 3).reduce((sum, d) => sum + (d.totalScore || 0), 0) / 3;

    if (avg > 15) return "😄 Likely Happy";
    if (avg > 0) return "🙂 Likely Neutral";
    if (avg > -15) return "😔 Likely Sad";
    return "😢 Likely Very Sad";
  };

  return (
    <>
      <Navbar />

      <div className="container">
        <h2>History</h2>

        {loading ? (
          <p>Loading...</p>
        ) : data.length === 0 ? (
          <p>No history available.</p>
        ) : (
          <>
            {/* Chart */}
            <div className="chart-container">
              <MoodChart data={data} />
            </div>

            {/* Trend */}
            <div className="trend-box">
              <h4>Trend</h4>
              <p>{getTrend()}</p>
            </div>

            {/* Prediction */}
            <div className="prediction-box">
              <h4>Tomorrow Prediction</h4>
              <p>{predictMood()}</p>
            </div>
          </>
        )}
      </div>
    </>
  );
}