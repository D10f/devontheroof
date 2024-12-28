import Catppuccin, { CatppuccinVariants } from "@/themes/catppucin";
import Everforest, { EverforestVariants } from "@/themes/everforest";
import ThemeContext from "@/themes";

export default function makeTheme(key: string) {
    if (key.startsWith("Catppuccin")) {
        return new ThemeContext(new Catppuccin());
    }

    if (key.startsWith("Everforest")) {
        return new ThemeContext(new Everforest());
    }

    throw new Error(`Unknown theme provided: ${key}`);
}
