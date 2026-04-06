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
  location: string;
  setLocation: Dispatch<SetStateAction<string>>;
};

export default function LocationDropdown({ location, setLocation }: Props) {
  return (
    <Select value={location} onValueChange={(value) => setLocation(value)}>
      <SelectTrigger className="w-45">
        <SelectValue placeholder="Cities" />
      </SelectTrigger>
      <SelectContent className="z-1001">
        <SelectGroup>
          {popularCities.map((city) => (
            <SelectItem key={city} value={city}>
              {city}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

const popularCities = [
  "New York",
  "London",
  "Tokyo",
  "Paris",
  "Hong Kong",
  "Singapore",
  "Sydney",
  "Dubai",
  "Los Angeles",
  "Toronto",
  "Berlin",
  "Rome",
  "Bangkok",
  "Barcelona",
  "San Francisco",
];
