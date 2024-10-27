import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend, Title } from "chart.js";

// Register necessary chart components
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend, Title);

interface LineChartProps {
  data: { day: string; value: number }[];
  feature: string;
}

const LineChart: React.FC<LineChartProps> = ({ data, feature }) => {
  const chartData = {
    labels: data.map((entry) => entry.day), // X-axis labels (dates)
    datasets: [
      {
        label: `Time Trend for ${feature}`,
        data: data.map((entry) => entry.value), // Y-axis data (values for selected feature)
        borderColor: "rgba(75, 192, 192, 1)",
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true, position: "top" as const },
      title: { display: true, text: `Time Trend for ${feature}` },
    },
    scales: {
      x: { title: { display: true, text: "Date" } },
      y: { title: { display: true, text: "Time Spent" }, beginAtZero: true },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default LineChart;
