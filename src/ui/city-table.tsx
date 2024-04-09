"use client";

import { PaginatedCityData } from "@/lib/definitions";

import React, { useState } from "react";
import Pagination from "./pagination";

export default function CityTable({
  paginatedCityData,
}: {
  paginatedCityData: PaginatedCityData;
}) {
  const [page, setPage] = useState(0);
  const cityDataHeaders = [
    "No.",
    "Geoname ID",
    "Name",
    "Country name EN",
    "ASCII Name",
    "Alternate Names",
    "Population",
    "DIgital Elevation Model",
    "Timezone",
    "Country Code",
    "Coordinates",
  ];

  return (
    <>
      {" "}
      <h1>Geonames - All Cities </h1>
      <div className="h-screen w-full overflow-auto">
        <table className="w-full text-xs md:text-sm text-left text-gray-500 dark:text-gray-400 table table-auto text-ellipsis whitespace-nowrap ">
          <thead className="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400 table-header-group ">
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
          <tbody>
            {paginatedCityData?.cityData[page].map((city, i) => (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 ">
                <td className="px-4 py-4">{i + 1}</td>
                <td className="px-4 py-4">{city.geoname_id}</td>
                <td className="px-4 py-4">{city.name}</td>
                <td className="px-4 py-4">{city.cou_name_en}</td>
                <td className="px-4 py-4">{city.ascii_name}</td>
                <td className="px-4 py-4 overflow-hidden text-ellipsis whitespace-nowrap max-w-56">
                  {city?.alternate_names.join(",") || "N/A"}
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
      <Pagination
        totalPages={paginatedCityData.totalPages}
        page={page}
        setPage={setPage}
      />
    </>
  );
}
