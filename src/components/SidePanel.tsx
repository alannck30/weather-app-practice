import { getWeather } from "@/api";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { Coords } from "../types";
import { Suspense, type Dispatch, type SetStateAction } from "react";
import Card from "./cards/Card";
import { Slider } from "./ui/slider";
import clsx from "clsx";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import Info from "../assets/info.svg?react";
import Arrow from "../assets/left-arrow.svg?react";
import SideCardSkeleton from "./skeletons/SideCardSkeleton";

type Props = {
  coords: Coords;
  isSidePanelOpen: boolean;
  setIsSidePanelOpen: Dispatch<SetStateAction<boolean>>;
};

export default function SidePanel({
  coords,
  isSidePanelOpen,
  setIsSidePanelOpen,
}: Props) {
  const { data } = useSuspenseQuery({
    queryKey: ["weather", coords],
    queryFn: () => getWeather({ lat: coords.lat, lon: coords.lon }),
  });
  return (
    <div
      className={clsx(
        "fixed top-0 right-0 h-screen w-(--sidebar-width) p-4 shadow-md bg-sidebar z-1001 overflow-y-auto transition transform duration-300 lg:translate-x-0!",
        isSidePanelOpen ? "translate-x-0" : "translate-x-full",
      )}>
      <button onClick={() => setIsSidePanelOpen(false)}>
        <Arrow className="size-8  -ml-2 lg:hidden" />
      </button>

      <div className="flex flex-col gap-4">
        {Object.entries(data.current.air_quality).map(([key, value]) => {
          const maxLevel = sliderMax[key as SliderKey];
          const bands = sliderBands[key as SliderKey];
          return (
            <Card
              key={key}
              title={key}
              childrenClassName="flex flex-col gap-3"
              className="hover:scale-102 transition-transform duration-300 from-sidebar-accent to-sidebar-accent/60">
              <div className="flex items-center gap-2">
                <span>{value}</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="size-4 " />
                    </TooltipTrigger>
                    <TooltipContent className="z-2000">
                      <p>{key}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Slider disabled min={0} max={maxLevel} value={[value]} />
              <div className="flex justify-between text-xs">
                <p>0</p>
                <p>{maxLevel}</p>
              </div>
              <div className="flex justify-between">
                {Object.entries(bands).map(([label, [min, max]]) => {
                  const isActive = value >= min && value <= max;
                  return (
                    <span
                      key={label}
                      className={clsx(
                        "px-2 py-1 rounded-md text-xs font-medium",
                        isActive
                          ? "bg-yellow-500"
                          : "bg-muted text-muted-foreground",
                      )}>
                      {label}
                    </span>
                  );
                })}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

type SliderKey =
  | "co"
  | "no2"
  | "o3"
  | "so2"
  | "pm2_5"
  | "pm10"
  | "us-epa-index"
  | "gb-defra-index";

const sliderMax: Record<SliderKey, number> = {
  co: 34000,
  no2: 200,
  o3: 300,
  so2: 500,
  pm2_5: 250,
  pm10: 300,
  "us-epa-index": 6,
  "gb-defra-index": 10,
};

type Range = {
  Good: [number, number];
  Fair: [number, number];
  Moderate: [number, number];
  Poor: [number, number];
  Hazardous: [number, number];
};

const sliderBands: Record<SliderKey, Range> = {
  co: {
    Good: [0, 5000],
    Fair: [5001, 10000],
    Moderate: [10001, 14000],
    Poor: [14001, 34000],
    Hazardous: [34000, 50000],
  },
  no2: {
    Good: [0, 40],
    Fair: [41, 80],
    Moderate: [81, 120],
    Poor: [121, 160],
    Hazardous: [161, 200],
  },
  o3: {
    Good: [0, 60],
    Fair: [61, 120],
    Moderate: [121, 180],
    Poor: [181, 240],
    Hazardous: [241, 300],
  },
  so2: {
    Good: [0, 100],
    Fair: [101, 200],
    Moderate: [201, 300],
    Poor: [301, 400],
    Hazardous: [401, 500],
  },
  pm2_5: {
    Good: [0, 25],
    Fair: [26, 50],
    Moderate: [51, 100],
    Poor: [101, 150],
    Hazardous: [151, 250],
  },
  pm10: {
    Good: [0, 50],
    Fair: [51, 100],
    Moderate: [101, 150],
    Poor: [151, 200],
    Hazardous: [201, 300],
  },
  "us-epa-index": {
    Good: [1, 1],
    Fair: [2, 2],
    Moderate: [3, 4],
    Poor: [5, 5],
    Hazardous: [6, 6],
  },
  "gb-defra-index": {
    Good: [1, 3],
    Fair: [4, 6],
    Moderate: [7, 7],
    Poor: [8, 9],
    Hazardous: [10, 10],
  },
};
