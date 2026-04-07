import { type Dispatch, type SetStateAction } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type Props = {
  mapType: string;
  setMapType: Dispatch<SetStateAction<string>>;
};

export default function MapTypeDropdown({ mapType, setMapType }: Props) {
  return (
    <Select value={mapType} onValueChange={(value) => setMapType(value)}>
      <SelectTrigger className="w-45">
        <SelectValue placeholder="Map Type" />
      </SelectTrigger>
      <SelectContent className="z-1001">
        <SelectGroup>
          {mapTypes.map(({ key, label }) => (
            <SelectItem key={key} value={key} className="capitalize">
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

const mapTypes = [
  { key: "tmp2m", label: "Temperature" },
  { key: "precip", label: "Precipitation" },
  { key: "pressure", label: "Pressure" },
  { key: "wind", label: "Wind" },
];
