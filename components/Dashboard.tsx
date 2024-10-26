"use client";
import React, { useEffect, useState } from "react";
import { fetchSheetData } from "@/helpers/googleSheet"; // Adjust the import path accordingly

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const sheetData = await fetchSheetData();
        setData(sheetData); // Set the parsed data to state
        console.log("sheet data", sheetData);
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // Set loading to false when done
      }
    };

    loadData(); // Call the function to fetch data
  }, []); // Empty dependency array means this runs once on mount

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  if (error) {
    return <div>Error: {error}</div>; // Error state
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <table>
        <thead>
          <tr>
            {Object.keys(data[0] || {}).map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {Object.values(row).map((value, i) => (
                <td key={i}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
