import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register the necessary plugins for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Functional component for the top tracks chart
const TopTracksChart = ({ tracks }) => {
  // Data for the top tracks chart
  const chartData = {
    labels: tracks.map((track) => track.title),
    // Datasets for the top tracks chart
    datasets: [
      {
        label: "Play Count",
        data: tracks.map((track) => track.playcount),
        backgroundColor: "rgba(53, 162, 235, 0.7)",
        borderColor: "rgba(255, 255, 255, 1)",
        borderWidth: 2,
      },
    ],
  };

  // Options for the top tracks chart
  const chartOptions = {
    responsive: true,
    // Maintain the aspect ratio of the chart
    plugins: {
      legend: { position: "top", labels: { color: "white" } },
    },
    // Customize the chart scales
    scales: {
      x: { ticks: { color: "white" } },
      y: { ticks: { color: "white" }, beginAtZero: true },
    },
  };

  return <Bar data={chartData} options={chartOptions} />;
};

export default TopTracksChart;
