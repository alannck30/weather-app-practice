import DailyForecast from "./components/cards/DailyForecast";
import HourlyForecast from "./components/cards/HourlyForecast";
import CurrentWeather from "./components/cards/CurrentWeather";
import AdditionalInfo from "./components/cards/AdditionalInfo";
import Map from "./components/Map";
import { Suspense, useState } from "react";
import type { Coords } from "./types";
import LocationDropdown from "./components/dropdowns/LocationDropdown";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getGeocode } from "./api";
import MapTypeDropdown from "./components/dropdowns/MapTypeDropdown";
import CurrentSkeleton from "./components/skeletons/CurrentSkeleton";
import DailySkeleton from "./components/skeletons/DailySkeleton";
import HourlySkeleton from "./components/skeletons/HourlySkeleton";
import AdditionalInfoSkeleton from "./components/skeletons/AdditionalInfoSkeleton";
import SidePanel from "./components/SidePanel";
import Menu from "./assets/menu.svg?react";
import SideCardSkeleton from "./components/skeletons/SideCardSkeleton";
import ThemeToggle from "./components/ThemeToggle";

function App() {
  const [coordinates, setCoords] = useState<Coords>({ lat: 40, lon: 55 });
  const [location, setLocation] = useState("New York");
  const [mapType, setMapType] = useState("tmp2m");
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);

  const { data: geocodeData } = useSuspenseQuery({
    queryKey: ["geocode", location],
    queryFn: () => getGeocode(location),
  });

  const onMapClick = (lat: number, lon: number) => {
    setCoords({ lat, lon });
    setLocation("custom");
  };

  const coords =
    location === "custom"
      ? coordinates
      : { lat: geocodeData?.[0].lat ?? 0, lon: geocodeData?.[0].lon ?? 0 };

  return (
    <>
      <div className="flex flex-col gap-8 p-8 w-full lg:w-[calc(100dvw-var(--sidebar-width))] 2xl:h-screen">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex gap-4 items-center">
            <h1 className="text-2xl font-semibold">Location: </h1>
            <LocationDropdown location={location} setLocation={setLocation} />
          </div>
          <div className="flex gap-4 items-center">
            <h1 className="text-2xl font-semibold text-nowrap">Map Type: </h1>
            <MapTypeDropdown mapType={mapType} setMapType={setMapType} />
          </div>
          <div className="ml-auto flex gap-4 items-center">
            <ThemeToggle />
            <button onClick={() => setIsSidePanelOpen(true)}>
              <Menu className="size-6  lg:hidden" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 2xl:flex-1 2xl:min-h-0 md:grid-cols-2 2xl:grid-cols-4 2xl:grid-rows-4 gap-4">
          <div className="h-120 2xl:h-auto col-span-1 md:col-span-2 2xl:col-span-4 2xl:row-span-2 order-1">
            <Map coords={coords} onMapClick={onMapClick} mapType={mapType} />
          </div>
          <div className="col-span-1 2xl:row-span-2 order-2">
            <Suspense fallback={<CurrentSkeleton />}>
              <CurrentWeather coords={coords} />
            </Suspense>
          </div>
          <div className="col-span-1 order-3 2xl:order-4 2xl:row-span-2">
            <Suspense fallback={<DailySkeleton />}>
              <DailyForecast coords={coords} />
            </Suspense>
          </div>
          <div className="col-span-1 md:col-span-2 2xl:row-span-1 order-4 2xl:order-3">
            <Suspense fallback={<HourlySkeleton />}>
              <HourlyForecast coords={coords} />
            </Suspense>
          </div>
          <div className="col-span-1 md:col-span-2 2xl:row-span-1 order-5">
            <Suspense fallback={<AdditionalInfoSkeleton />}>
              <AdditionalInfo coords={coords} />
            </Suspense>
          </div>
        </div>
      </div>
      <Suspense fallback={<SideCardSkeleton />}>
        <SidePanel
          coords={coords}
          isSidePanelOpen={isSidePanelOpen}
          setIsSidePanelOpen={setIsSidePanelOpen}
        />
      </Suspense>
    </>
  );
}

export default App;
