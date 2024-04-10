import { getCityList } from "@/lib/data";
import { CityData, PaginatedCityData } from "@/lib/definitions";

import CityTable from "@/ui/city-table";
import { Suspense } from "react";

export default async function Home() {
  const cityData: CityData[] = await getCityList();

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
        <CityTable cityData={cityData} />
      </Suspense>
    </main>
  );
}
