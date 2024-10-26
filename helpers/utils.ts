export const parseData = (data) => {
    return data.map(item => ({
      ...item,
      Day: new Date(item.Day).toISOString().split('T')[0],
    }));
  };
  
  export const applyFilters = (data, filters) => {
    return data.filter(item => {
      const ageMatch = filters.age ? item.Age === filters.age : true;
      const genderMatch = filters.gender ? item.Gender === filters.gender : true;
      const dateMatch = filters.dateRange.length
        ? new Date(item.Day) >= new Date(filters.dateRange[0]) &&
          new Date(item.Day) <= new Date(filters.dateRange[1])
        : true;
      return ageMatch && genderMatch && dateMatch;
    });
  };
  