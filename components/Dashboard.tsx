"use client";
import React, { useEffect, useState } from "react";
import { fetchSheetData } from "@/helpers/googleSheet"; // Adjust the import path accordingly
import BarChart from "./BarChart";
import Filters from "./Filters";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import LineChart from "./LineChart";
import { parseDate } from "@/helpers/utils";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [trendData, setTrendData] = useState<
    { date: string; timeSpent: number }[]
  >([]);
  const [lineChartData, setLineChartData] = useState([]);

  //   filters
  const [selectedAge, setSelectedAge] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const [loading, setLoading] = useState(true);
  const [isApplyingFilter, setIsApplyingFilter] = useState(false)
  const [error, setError] = useState(null);

  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);

  const handleFeatureClick = (feature: string) => {
    setSelectedFeature(feature); // Set the feature for the line chart
    console.log(`Selected feature for trend: ${feature}`);

    // Filter `filteredData` for the selected feature and format it for the line chart
    const featureData = filteredData.map((entry) => ({
      day: entry.Day,
      value: parseInt(entry[feature] || "0", 10),
    }));
    setLineChartData(featureData); // Update the line chart data
    setSelectedFeature(feature); // Set the feature for the line chart
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

  // Call applyFilters whenever filter states change
  useEffect(() => {
    applyFilters();
  }, [startDate, endDate, selectedAge, selectedGender]);
  if (loading) <div>Loading...</div>;
  if (error) <div>Error: {error}</div>;

  return (
    <div className="w-full flex flex-col items-center justify-center pt-8 gap-y-5">
      <h1 className="font-bold text-4xl sm:text-6xl text-center text-cyan-950 pb-1 border-b-[1px] hover:border-b-cyan-950 duration-300">
        Data Visualization Dashboard
      </h1>

      <section className="w-full p-2 lg:p-4 flex flex-col gap-y-2">
        {/* filters */}

        <section className="min-w-[90vw] bg-neutral-300 rounded-lg hover:shadow-md hover:shadow-cyan-200 py-4 lg:py-6 px-2 flex flex-col items-center justify-center gap-y-4">
          <div className="font-bold text-xl">Filters</div>
          <div className="flex flex-col items-center justify-center gap-y-4 lg:gap-x-8">
            <Filters
              selectedAge={selectedAge}
              setSelectedAge={setSelectedAge}
              selectedGender={selectedGender}
              setSelectedGender={setSelectedGender}
            />
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-y-2 gap-x-2">
              <label className="font-bold">Date Range: </label>
              <div className="flex flex-col lg:flex-row lg:items-center gap-y-2 gap-x-2 justify-between lg:justify-normal ">
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
                  className="text-center rounded-lg bg-neutral-800 text-white"
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
                  className="text-center rounded-lg bg-neutral-800 text-white"
                />
              </div>
            </div>
          </div>
        </section>

        {/* chart secction */}
        <section className="grid lg:grid-cols-2">
          <div className="">
            <BarChart data={filteredData} onFeatureClick={handleFeatureClick} />
          </div>
          {/* Line Chart for the selected feature */}
          {selectedFeature && (
            <div className="">
              <LineChart data={lineChartData} feature={selectedFeature} />
            </div>
          )}
        </section>
      </section>
    </div>
  );
};

export default Dashboard;
