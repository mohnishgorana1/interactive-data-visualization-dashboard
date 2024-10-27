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
    <div className="my-2 flex flex-col gap-y-3 p-4 bg-neutral-100 w-max">
      <div className="font-bold">Filter By Age and Gender</div>
      <section className="flex items-center gap-x-5">
        <div className="">
          <label>Age: </label>
          <select
            value={selectedAge}
            onChange={(e) => setSelectedAge(e.target.value)}
            className="bg-cyan-200 rounded-md p-1"
          >
            <option value="">All</option>
            <option value="15-25">15-25</option>
            <option value=">25"> &gt;25</option>
          </select>
        </div>
        <div className="">
          <label>Gender: </label>
          <select
            value={selectedGender}
            onChange={(e) => setSelectedGender(e.target.value)}
            className="bg-cyan-200 rounded-md p-1"
          >
            <option value="">All</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
      </section>
    </div>
  );
};

export default Filters;
