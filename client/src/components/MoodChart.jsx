import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

export default function MoodChart({ data }) {
  if (!data || data.length === 0) return null;

  // Extract scores
  const scores = data.map(d => d.totalScore);

  // Create range (-100 to 100)
  const xValues = [];
  for (let i = -100; i <= 100; i += 10) {
    xValues.push(i);
  }

  // Gaussian function
  const gaussian = (x, mean, std) => {
    return (
      (1 / (std * Math.sqrt(2 * Math.PI))) *
      Math.exp(-((x - mean) ** 2) / (2 * std ** 2))
    );
  };

  // Calculate mean
  const mean =
    scores.reduce((a, b) => a + b, 0) / scores.length;

  // Calculate standard deviation
  const variance =
    scores.reduce((sum, val) => sum + (val - mean) ** 2, 0) /
    scores.length;

  const std = Math.sqrt(variance) || 1;

  // Generate smooth curve
  const yValues = xValues.map(x => gaussian(x, mean, std));

  const chartData = {
    labels: xValues,
    datasets: [
      {
        label: "Mood Probability Distribution",
        data: yValues,
        borderWidth: 2,
        fill: true,
        tension: 0.4 // smooth curve
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Mood Score Range"
        }
      },
      y: {
        title: {
          display: true,
          text: "Probability Density"
        }
      }
    }
  };

  return <Line data={chartData} options={options} />;
}