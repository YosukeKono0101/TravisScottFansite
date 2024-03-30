import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TopTracksChart = ({ tracks = [] }) => {
  const chartData = {
    labels: tracks.map((track) => track.title),
    datasets: [
      {
        label: "Play Count",
        data: tracks.map((track) => track.playcount),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Top Tracks Played" },
    },

    hover: {
      mode: "index",
      intersect: false,
    },
    tooltips: {
      mode: "index",
      intersect: false,
    },
  };
  return <Bar data={chartData} options={chartOptions} />;
};

export default TopTracksChart;
