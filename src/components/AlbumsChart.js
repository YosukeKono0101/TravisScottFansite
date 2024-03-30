import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AlbumsChart = ({ albums }) => {
  const backgroundColors = ["rgba(255, 99, 132, 0.5)", "rgba(54, 162, 235, 0.5)", "rgba(255, 206, 86, 0.5)", "rgba(75, 192, 192, 0.5)", "rgba(153, 102, 255, 0.5)", "rgba(255, 159, 64, 0.5)"];

  const data = {
    labels: albums.map((album) => album.name),
    datasets: [
      {
        label: "Play Count",
        data: albums.map((album) => album.playcount),
        backgroundColor: albums.map((_, index) => backgroundColors[index % backgroundColors.length]),
      },
    ],
  };

  const options = {
    sresponsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Top Albums Played" },
    },
    // ホバー時の設定を追加
    hover: {
      mode: "index",
      intersect: false,
    },
    tooltips: {
      mode: "index",
      intersect: false,
    },
  };

  return <Bar data={data} options={options} />;
};

export default AlbumsChart;
