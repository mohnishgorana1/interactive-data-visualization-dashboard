"use client";
import React, { useEffect, useState } from "react";
import { fetchSheetData } from "@/helpers/googleSheet"; // Adjust the import path accordingly
import BarChart from "./BarChart";

const Dashboard = () => {
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);

  const handleFeatureClick = (feature: string) => {
    setSelectedFeature(feature); // Set the feature for the line chart
    console.log(`Selected feature for trend: ${feature}`);
  };
  useEffect(() => {
    const loadData = async () => {
      try {
        const sheetData = await fetchSheetData();
        setData(sheetData); // Set the parsed data to state
        console.log("sheet data", sheetData);
      } catch (err) {
        setError(err?.message);
      } finally {
        setLoading(false); // Set loading to false when done
      }
    };

    loadData(); // Call the function to fetch data
  }, []); // Empty dependency array means this runs once on mount

  if (loading) <div>Loading...</div>;
  if (error) <div>Error: {error}</div>;

  return (
    <div className="flex flex-col items-center justify-center pt-8">
      <h1 className="font-bold text-4xl sm:text-6xl">Dashboard</h1>

      <section className="w-full p-4">
        <BarChart data={data} onFeatureClick={handleFeatureClick} />
        {selectedFeature && (
          <div>Display line chart for: {selectedFeature}</div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
