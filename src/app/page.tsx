import { getCityList } from "@/lib/data";
import { PaginatedCityData } from "@/lib/definitions";

import CityTable from "@/ui/city-table";
import { Suspense } from "react";

export default async function Home() {
  const paginatedCityData: PaginatedCityData = await getCityList();

  return (
    <main>
      <Suspense
        fallback={
          <>
            <div className="h-screen justify-center ">Loading</div>
          </>
        }
      >
        {" "}
        <CityTable paginatedCityData={paginatedCityData} />
      </Suspense>
    </main>
  );
}
