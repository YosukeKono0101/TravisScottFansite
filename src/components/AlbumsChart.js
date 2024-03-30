import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AlbumsChart = ({ albums }) => {
  const backgroundColors = ["rgba(53, 162, 235, 0.7)", "rgba(255, 205, 86, 0.7)", "rgba(75, 192, 192, 0.7)", "rgba(255, 99, 132, 0.7)", "rgba(153, 102, 255, 0.7)", "rgba(255, 159, 64, 0.7)"];

  const data = {
    labels: albums.map((album) => album.name),
    datasets: [
      {
        label: "Play Count",
        data: albums.map((album) => album.playcount),
        backgroundColor: backgroundColors,
        borderColor: "rgba(255,255,255,1)",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top", labels: { color: "white" } },
    },
    scales: {
      x: { ticks: { color: "white" } },
      y: { ticks: { color: "white" }, beginAtZero: true },
    },
  };

  return <Bar data={data} options={options} />;
};

export default AlbumsChart;
