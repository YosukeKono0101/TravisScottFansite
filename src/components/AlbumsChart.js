import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register the necessary plugins for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Functional component for the albums chart
const AlbumsChart = ({ albums }) => {
  // Data for the albums chart
  const data = {
    labels: albums.map((album) => album.name),
    // Datasets for the albums chart
    datasets: [
      {
        label: "Play Count",
        data: albums.map((album) => album.playcount),
        backgroundColor: "rgba(255, 99, 132, 0.7)",
        borderColor: "rgba(255,255,255,1)",
        borderWidth: 2,
      },
    ],
  };

  // Options for the albums chart
  const options = {
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

  return <Bar data={data} options={options} />;
};

export default AlbumsChart;
