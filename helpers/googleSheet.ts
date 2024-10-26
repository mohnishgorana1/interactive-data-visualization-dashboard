"use server";

import axios from "axios";

const SHEET_URL = process.env.SHEET_URL;

export async function fetchSheetData() {
  console.log("Fetching data from Google Sheets...");

  try {
    const response = await fetch(SHEET_URL);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.text(); // Get the response as text
    const parsedData = parseCSV(data); // Parse the CSV data
    console.log("Parsed Data:", parsedData); // Log the parsed data
    return parsedData; // Return the parsed data
  } catch (error) {
    console.error("Error fetching data:", error);
    return []; // Return an empty array in case of error
  }
}

// Helper function to parse CSV text into an array of objects
function parseCSV(text) {
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
  const headers = lines[0].split(",").map((header) => header.trim());
  return lines.slice(1).map((line) => {
    const values = line.split(",").map((value) => value.trim());
    return headers.reduce((obj, header, index) => {
      obj[header] = values[index] || null; // Assign values to corresponding headers
      return obj;
    }, {});
  });
}
