"use client";
import { CityData } from "@/lib/definitions";

import React, { useEffect, useState } from "react";

import { cityDataHeaders } from "@/lib/data";
import {
  sortByCountry,
  sortByNameAsc,
  sortByNameDes,
  sortByPopulation,
} from "@/lib/utils";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Sort, { SortOption, sortOptions } from "./sort-dropdown";

export default function CityTable({ cityData }: { cityData: CityData[] }) {
  // const paginatedCityData: PaginatedCityData = generatePagination(cityData);

  const [data, setData] = useState<CityData[]>(cityData);

  const [selectedSort, setSelectedSort] = useState<SortOption>(sortOptions[0]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    if (searchTerm?.length < 3) {
      setData(cityData);
    } else {
      const filteredData = cityData.filter((city) =>
        city.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setData(filteredData);
    }
  }, [searchTerm]);

  useEffect(() => {
    let sortedData = [...data];

    if (selectedSort.value == "name_asc") {
      sortedData = sortByNameAsc(sortedData);
    } else if (selectedSort.value == "name_des") {
      sortedData = sortByNameDes(sortedData);
    } else if (selectedSort.value == "population") {
      sortedData = sortByPopulation(sortedData);
    } else if (selectedSort.value == "ele") {
      sortedData = sortByCountry(sortedData);
    } else {
      sortedData = cityData;
    }
    setData(sortedData);
  }, [selectedSort]);

  return (
    <>
      <div className="flex justify-between px-2 mb-2">
        <h1 className="hidden md:block text-xl ">Geonames - All Cities </h1>

        <div className="relative flex ">
          <input
            className="peer block focus:outline-none rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
            placeholder="Search City"
            value={searchTerm}
            onChange={(e) => handleSearch(e)}
          />
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div>
        <Sort selectedSort={selectedSort} setSelectedSort={setSelectedSort} />
      </div>
      <div className="w-full max-h-screen overflow-x-auto space-y-2">
        <table className="w-full text-xs md:text-sm text-left text-gray-500 dark:text-gray-400 text-ellipsis whitespace-nowrap ">
          <thead className="sticky top-0 text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400  ">
            <tr>
              {cityDataHeaders.map((header, i) => (
                <th
                  key={i}
                  scope="col"
                  className="px-4 py-2 w-fit whitespace-nowrap"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className=" overflow-auto">
            {data.map((city, i) => (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 ">
                <td className="px-4 py-4">{i + 1}</td>
                <td className="px-4 py-4">{city.geoname_id}</td>
                <td className="px-4 py-4">{city.name}</td>
                <td className="px-4 py-4">{city.cou_name_en}</td>
                <td className="px-4 py-4">{city.ascii_name}</td>
                <td className="px-4 py-4 overflow-hidden text-ellipsis whitespace-nowrap max-w-56">
                  {(city.alternate_names && city?.alternate_names.join(",")) ||
                    "N/A"}
                </td>
                <td className="px-4 py-4">{city.population}</td>
                <td className="px-4 py-4">{city?.elevation || "N/A"}</td>
                <td className="px-4 py-4">{city.timezone}</td>
                <td className="px-4 py-4">{city.country_code}</td>
                <td className="px-4 py-4">
                  {city.coordinates.lat}, {city.coordinates.lon}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <Pagination
        totalPages={paginatedCityData.totalPages}
        page={page}
        setPage={setPage}
      /> */}
    </>
  );
}
