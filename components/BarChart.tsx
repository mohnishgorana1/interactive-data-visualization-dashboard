import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps {
  data: Array<{ [key: string]: string }>;
  onFeatureClick: (feature: string) => void; // For interactivity with the line chart
}

const BarChart: React.FC<BarChartProps> = ({ data, onFeatureClick }) => {
  // Aggregate data for each feature (A, B, C, etc.)
  const features = ["A", "B", "C", "D", "E", "F"];
  const totals = features.map((feature) =>
    data.reduce((sum, item) => sum + parseInt(item[feature] || "0", 10), 0)
  );

  // Chart.js data configuration
  const chartData = {
    labels: features, // Features on y-axis
    datasets: [
      {
        label: "Total Time Spent",
        data: totals,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Chart options for a horizontal bar chart
  const options = {
    indexAxis: "y" as const, // Flip the axis for horizontal bars
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Total Time Spent by Feature",
      },
    },
    onClick: (event: any, elements: any) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        const selectedFeature = features[index];
        onFeatureClick(selectedFeature); // Trigger feature click event
      }
    },
  };

  return (
    <Bar
      data={chartData}
      options={options}
      className="max-w-[50vw] max-h-[60vh] bg-neutral-100 p-2"
    />
  );
};

export default BarChart;
