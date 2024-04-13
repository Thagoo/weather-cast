"use client";
import { CityData } from "@/lib/definitions";

import React, { useEffect, useState } from "react";

import {
  deepSearch,
  sortByCountry,
  sortByNameAsc,
  sortByNameDes,
  sortByPopulation,
} from "@/lib/utils";
import Sort, { SortOption, sortOptions } from "./sort-dropdown";

import { useRouter } from "next/navigation";
import { cityDataHeaders } from "@/lib/config";
import TableSearchInput from "./table-search";

export default function CityTable({ cityData }: { cityData: CityData[] }) {
  // const paginatedCityData: PaginatedCityData = generatePagination(cityData);

  const [data, setData] = useState<CityData[]>(cityData);

  const [selectedSort, setSelectedSort] = useState<SortOption>(sortOptions[0]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const router = useRouter();

  const handleWeather = (e: any, lat: number, lon: number) => {
    e.preventDefault();
    router.push(`/weather-forecast?lat=${lat}&lon=${lon}`);
  };

  useEffect(() => {
    if (searchTerm?.length < 3) {
      setData(cityData);
    } else {
      const filteredData = deepSearch(data, searchTerm);

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
      <div className="flex justify-between px-2 mb-2 ">
        <h1 className="hidden md:block text-lg text-accent-foreground">
          Geonames - All Cities - {cityData.length}
        </h1>

        <TableSearchInput
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <Sort selectedSort={selectedSort} setSelectedSort={setSelectedSort} />
      </div>
      <div className="w-full max-h-screen overflow-x-auto space-y-2">
        <table className="w-full text-xs md:text-sm text-left text-gray-500 dark:text-gray-400 text-ellipsis whitespace-nowrap ">
          <thead className="sticky top-0 text-xs text-gray-700  bg-background dark:text-gray-400  ">
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
              <tr
                className="border-b  bg-background border border-accent hover:bg-accent/50 cursor-pointer"
                onClick={(e) =>
                  handleWeather(e, city.coordinates.lat, city.coordinates.lon)
                }
              >
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
        {data.length < 1 && (
          <div className="h-56 w-full flex justify-center items-center">
            <span>No data found</span>
          </div>
        )}
      </div>
      {/* <Pagination
        totalPages={paginatedCityData.totalPages}
        page={page}
        setPage={setPage}
      /> */}
    </>
  );
}
