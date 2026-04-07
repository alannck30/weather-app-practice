import { Switch } from "./ui/switch";
import Dark from "../assets/dark.svg?react";
import Light from "../assets/light.svg?react";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="flex items-center gap-2">
      <Light className="size-8" />
      <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} />
      <Dark className="size-5" />
    </div>
  );
}
