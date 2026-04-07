import Card from "./Card";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getWeather } from "../../api";
import WeatherIcon from "../WeatherIcon";
import type { Coords } from "../../types";

type Props = {
  coords: Coords;
};

export default function DailyForecast({ coords }: Props) {
  const { data } = useSuspenseQuery({
    queryKey: ["weather", coords],
    queryFn: () => getWeather({ lat: coords.lat, lon: coords.lon }),
  });

  return (
    <Card
      title="Daily Forecast"
      childrenClassName="flex flex-col gap-4 2xl:justify-between">
      {data?.forecast.forecastday.map((day) => (
        <div key={day.date_epoch} className="flex justify-between">
          <p className="size-9 text-end">
            {new Date(day.date).toLocaleDateString("en-US", {
              weekday: "short",
            })}
          </p>
          <WeatherIcon
            src={day.day.condition.icon}
            alt={day.day.condition.text}
          />
          <p className="size-9 text-end">
            {Math.round(day.day.avgtemp_c)}&deg;C
          </p>
          <p className="size-9 text-end text-gray-500/75">
            {Math.round(day.day.maxtemp_c)}&deg;C
          </p>
          <p className="size-9 text-end text-gray-500/75">
            {Math.round(day.day.mintemp_c)}&deg;C
          </p>
        </div>
      ))}
    </Card>
  );
}
