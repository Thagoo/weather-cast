import React from "react";

export type SortOption = {
  value: string;
  label: string;
};

export const sortOptions: SortOption[] = [
  { value: "", label: "Sort By" },
  { value: "name_asc", label: "Name (A to Z)" },
  { value: "name_des", label: "Name (Z to A)" },
  { value: "population", label: "Population" },
  { value: "country", label: "Country" },
];

const Sort: React.FC = ({ selectedSort, setSelectedSort }) => {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    const selectedOption = sortOptions.find(
      (option) => option.value === selectedValue
    );
    if (selectedOption) {
      setSelectedSort(selectedOption);
    }
  };

  return (
    <div className="relative">
      <select
        value={selectedSort.value}
        onChange={handleSelectChange}
        className="block appearance-none w-full bg-white  px-4 py-2 pr-8 rounded  leading-tight focus:outline-none focus:shadow-outline"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M5.59 7l5 5 5-5H5.59z" />
        </svg>
      </div>
    </div>
  );
};

export default Sort;
