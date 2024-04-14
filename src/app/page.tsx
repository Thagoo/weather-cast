import { getCityList } from "@/lib/data";
import { CityData } from "@/lib/definitions";

import CityTable from "@/ui/city-table";
import { Suspense } from "react";

export default async function Home() {
  const cityData: CityData[] = await getCityList();

  return (
    <main>
      <div className="flex flex-col px-2 md:px-48 ">
        <CityTable cityData={cityData} />
      </div>
    </main>
  );
}
