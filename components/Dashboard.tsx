"use client";
import React, { useEffect, useState } from "react";
import { fetchSheetData } from "@/helpers/googleSheet"; // Adjust the import path accordingly
import BarChart from "./BarChart";
import Filters from "./Filters";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  //   filters
  const [selectedAge, setSelectedAge] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

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
        setFilteredData(sheetData);
        console.log("sheet data", sheetData);
      } catch (err) {
        setError(err?.message);
      } finally {
        setLoading(false); // Set loading to false when done
      }
    };

    loadData(); // Call the function to fetch data
  }, []);

  //   // Filter data whenever selectedAge or selectedGender changes
  //   useEffect(() => {
  //     let updatedData = data;
  //     console.log("selected filters", selectedAge, selectedGender);

  //     if (selectedAge) {
  //       updatedData = updatedData.filter((item: any) => item.Age === selectedAge);
  //     }
  //     if (selectedGender) {
  //       updatedData = updatedData.filter(
  //         (item) => item.Gender === selectedGender
  //       );
  //     }

  //     setFilteredData(updatedData);
  //   }, [selectedAge, selectedGender, data]);

  // Helper function to parse dates in DD/MM/YYYY format
  const parseDate = (dateStr: string) => {
    const [day, month, year] = dateStr.split("/").map(Number);
    return new Date(year, month - 1, day); // month is zero-indexed in JavaScript Date
  };
  const formatDateToDDMMYYYY = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const applyFilters = () => {
    // Convert startDate and endDate to comparable format if they are not null
    const formattedStartDate = startDate ? new Date(startDate) : null;
    const formattedEndDate = endDate ? new Date(endDate) : null;

    console.log("Filters apply", selectedAge, selectedGender);
    console.log("start date", formattedStartDate);
    console.log("end date", formattedEndDate);

    const filtered = data.filter((entry: any) => {
      const entryDate = parseDate(entry.Day); // Convert entry date to Date object

      const matchesAge = selectedAge ? entry.Age === selectedAge : true;

      const matchesGender = selectedGender
        ? entry.Gender === selectedGender
        : true;

      const isInDateRange =
        (!formattedStartDate || entryDate >= formattedStartDate) &&
        (!formattedEndDate || entryDate <= formattedEndDate);

      return isInDateRange && matchesAge && matchesGender;
    });
    console.log("filrered data", filtered);

    setFilteredData(filtered);
  };

  // Call applyFilters whenever filter states change
  useEffect(() => {
    applyFilters();
  }, [startDate, endDate, selectedAge, selectedGender]);
  if (loading) <div>Loading...</div>;
  if (error) <div>Error: {error}</div>;

  return (
    <div className="flex flex-col items-center justify-center pt-8">
      <h1 className="font-bold text-4xl sm:text-6xl">Dashboard</h1>

      <section className="w-full p-4 flex flex-col gap-y-2">
        <section className="flex items-center justify-center gap-x-6 bg-slate-300 w-full">
          <Filters
            selectedAge={selectedAge}
            setSelectedAge={setSelectedAge}
            selectedGender={selectedGender}
            setSelectedGender={setSelectedGender}
          />
          <div className="my-2 flex flex-col gap-y-3 p-4 bg-neutral-100 w-max">
            <label className="font-bold">Date Range: </label>
            <div className="flex">
              <DatePicker
                selected={startDate}
                onChange={(date: Date | null) => {
                  console.log("Selected Start Date:", date);
                  setStartDate(date);
                }}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                placeholderText="Start Date"
                showYearDropdown
                dropdownMode="select" // Optional: shows dropdown for month and year
              />

              <DatePicker
                selected={endDate}
                onChange={(date: Date | null) => {
                  console.log("Selected End Date:", date);
                  setEndDate(date);
                }}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                placeholderText="End Date"
                showYearDropdown
                dropdownMode="select"
              />
            </div>
          </div>
        </section>

        <section className="">
          <BarChart data={filteredData} onFeatureClick={handleFeatureClick} />

          {selectedFeature && (
            <div>Display line chart for: {selectedFeature}</div>
          )}
        </section>
      </section>
    </div>
  );
};

export default Dashboard;
