import React from "react";

type FiltersProps = {
  selectedAge: string;
  setSelectedAge: React.Dispatch<React.SetStateAction<string>>;
  selectedGender: string;
  setSelectedGender: React.Dispatch<React.SetStateAction<string>>;
};

const Filters: React.FC<FiltersProps> = ({
  selectedAge,
  setSelectedAge,
  selectedGender,
  setSelectedGender,
}) => {
  return (
    <div className="flex items-center justify-between gap-x-5 my-2">
      <div className="flex flex-col lg:flex-row gap-x-2 lg:items-center">
        <label className="font-bold">Age: </label>
        <select
          value={selectedAge}
          onChange={(e) => setSelectedAge(e.target.value)}
          className="bg-neutral-800 text-white rounded-md p-1"
        >
          <option value="">All</option>
          <option value="15-25">15-25</option>
          <option value=">25"> &gt;25</option>
        </select>
      </div>
      <div className="flex flex-col lg:flex-row gap-x-2 lg:items-center">
        <label className="font-bold">Gender: </label>
        <select
          value={selectedGender}
          onChange={(e) => setSelectedGender(e.target.value)}
          className="bg-neutral-800 text-white rounded-md p-1"
        >
          <option value="">All</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
