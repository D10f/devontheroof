import Cattpuccin, { CattpuccinVariants } from "@/themes/cattpuccin";
import ThemeContext from "@/themes";

export default function makeTheme(key: string) {
  if (key.startsWith("Cattpuccin")) {
    return new ThemeContext(new Cattpuccin(key as CattpuccinVariants));
  }

  throw new Error("Unknown theme provided.");
}
