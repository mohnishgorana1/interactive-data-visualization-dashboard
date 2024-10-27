// Helper function to parse dates in DD/MM/YYYY format
export const parseDate = (dateStr: string) => {
  const [day, month, year] = dateStr.split("/").map(Number);
  return new Date(year, month - 1, day); // month is zero-indexed in JavaScript Date
};
