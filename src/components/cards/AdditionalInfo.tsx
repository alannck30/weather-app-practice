import Card from "./Card";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getWeather } from "../../api";
import Wind from "../../assets/wind.svg?react";
import Cloud from "../../assets/cloud.svg?react";
import Uv from "../../assets/uv.svg?react";
import Pressure from "../../assets/pressure.svg?react";
import type { Coords } from "../../types";

type Props = {
  coords: Coords;
};

export default function AdditionalInfo({ coords }: Props) {
  const { data } = useSuspenseQuery({
    queryKey: ["weather", coords],
    queryFn: () => getWeather(coords),
  });
  return (
    <Card
      title="Additional Weather Info"
      childrenClassName="flex flex-col gap-8">
      {rows.map(({ label, value, Icon }) => (
        <div className="flex justify-between" key={value}>
          <div className="flex gap-4">
            <span className="text-gray-500">{label}</span>
            <Icon className="size-8 invert" />
          </div>
          <span>{data.current[value]}</span>
        </div>
      ))}
    </Card>
  );
}

const rows = [
  {
    label: "Cloudiness (%)",
    value: "cloud",
    Icon: Cloud,
  },
  {
    label: "UV Index",
    value: "uv",
    Icon: Uv,
  },
  {
    label: "Wind Direction",
    value: "wind_dir",
    Icon: Wind,
  },
  {
    label: "Pressure (hpa)",
    value: "pressure_mb",
    Icon: Pressure,
  },
] as const;
