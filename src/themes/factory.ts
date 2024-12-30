import Catppuccin from "@/themes/catppucin";
import Everforest from "@/themes/everforest";
import Nord from "@/themes/nord";
import OneDark from "@/themes/oneDark";
import ThemeContext from "@/themes";

export default function makeTheme(key: string) {
    if (key.startsWith("Catppuccin")) {
        return new ThemeContext(new Catppuccin());
    }

    if (key.startsWith("Everforest")) {
        return new ThemeContext(new Everforest());
    }

    if (key.startsWith("Nord")) {
        return new ThemeContext(new Nord());
    }

    if (key.startsWith("OneDark")) {
        return new ThemeContext(new OneDark());
    }

    throw new Error(`Unknown theme provided: ${key}`);
}
