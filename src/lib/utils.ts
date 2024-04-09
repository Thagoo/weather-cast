import { CityData, PaginatedCityData } from "./definitions";

export const generatePagination = (cityData: CityData[]) => {
  if (cityData.length < 1) {
    throw new Error("No city list");
  }
  const pageSize = 20;
  const totalPages = Math.ceil(cityData.length / pageSize);
  let pages = cityData,
    chunk = [];

  while (pages.length > 0) {
    chunk.push(cityData.splice(0, pageSize));
  }
  const paginatedCityData: PaginatedCityData = {
    cityData: chunk,
    pageSize: pageSize,
    totalPages: totalPages,
  };
  return paginatedCityData;
};
