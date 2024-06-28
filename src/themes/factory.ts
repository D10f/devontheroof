import Catppuccin, { CatppuccinVariants } from "@/themes/catppucin";
import ThemeContext from "@/themes";

export default function makeTheme(key: string) {
    if (key.startsWith("Catppuccin")) {
        return new ThemeContext(new Catppuccin(key as CatppuccinVariants));
    }

    throw new Error("Unknown theme provided.");
}
