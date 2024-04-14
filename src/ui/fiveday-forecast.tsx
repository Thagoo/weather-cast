import { convertToDate } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import { ForecastType } from "@/lib/definitions";

export default function Forecast({ forecast }: { forecast: ForecastType }) {
  return (
    <>
      <Card className="h-fit  md:w-3/5">
        <CardHeader>
          <CardTitle>
            <i>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 invert dark:invert-0"
              >
                <path
                  d="M8 2V5"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16 2V5"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3.5 9.08984H20.5"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15.6947 13.7002H15.7037"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15.6947 16.7002H15.7037"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11.9955 13.7002H12.0045"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11.9955 16.7002H12.0045"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.29431 13.7002H8.30329"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.29431 16.7002H8.30329"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </i>
            {forecast.list.length - 1}-Day Forecast
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-base font-normal md:mb-1">
          {forecast &&
            forecast.list.map((item, i) => (
              <div key={item.dt}>
                <div className="flex w-full flex-row items-center justify-between ">
                  <p className="min-w-[3rem] font-medium">
                    {i === 0
                      ? "Today"
                      : convertToDate(forecast.city.timezone, item.dt, "short")}
                  </p>
                  <Image
                    alt="icon"
                    src={`/assets/icons/${item.weather[0].icon}.svg`}
                    width={30}
                    height={30}
                    className=" invert-0 dark:invert"
                  />

                  <div className="flex w-[60%] flex-row gap-2  overflow-hidden">
                    <p className="flex w-[3rem] min-w-fit justify-center items-center">
                      {item.weather[0].description}
                    </p>
                    <div className="flex w-full select-none flex-col items-end gap-2 text-sm">
                      <p className="flex w-[3rem] min-w-fit justify-start text-neutral-600 dark:text-neutral-400">
                        min {Math.floor(item.main.temp_min)}&deg;
                      </p>

                      <p className="flex w-[3rem] min-w-fit justify-start">
                        max {Math.floor(item.main.temp_max)}&deg;
                      </p>
                    </div>
                  </div>
                </div>
                {i !== forecast.list.length - 1 && (
                  <div className="border-b"></div>
                )}
              </div>
            ))}
        </CardContent>
      </Card>
    </>
  );
}
