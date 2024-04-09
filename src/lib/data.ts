import { PaginatedCityData } from "./definitions";
import { generatePagination } from "./utils";

const OPENDATASOFT_API = process.env.OPENDATASOFT_API;
export const getCityList = async () => {
  try {
    const response = await fetch(`${OPENDATASOFT_API}?limit=24`);
    const data = await response.json();
    const paginatedCityData: PaginatedCityData = generatePagination(
      data.results
    );
    return paginatedCityData;
  } catch (error) {
    throw new Error(error);
  }
};
