import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TopTracksChart = ({ tracks }) => {
  const chartData = {
    labels: tracks.map((track) => track.title),
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

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top", labels: { color: "white" } },
    },
    scales: {
      x: { ticks: { color: "white" } },
      y: { ticks: { color: "white" }, beginAtZero: true },
    },
  };

  return <Bar data={chartData} options={chartOptions} />;
};

export default TopTracksChart;
