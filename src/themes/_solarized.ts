import { ThemeVariant } from "./defs";

export const solarized: Record<string, ThemeVariant> = {
    light: {
        red: "#BF616A",
        orange: "#D08770",
        yellow: "#EBCB8B",
        green: "#A3BE8C",
        blue: "#81A1C1",
        purple: "#B48EAD",
        "bg-color-2": "#434C5E",
        "bg-color": "#3B4252",
        "bg-color-3": "#2E3440",
        "text-color": "#ECEFF4",
        "subtext-color": "#D8DEE9",
    },
    dark: {
        red: "#DC322F",
        orange: "#CB4B16",
        yellow: "#B58900",
        green: "#859900",
        blue: "#268BD2",
        purple: "#D33682",
        "bg-color": "#002B36",
        "bg-color-3": "#073642",
        "bg-color-2": "#586E75",
        "text-color": "#FDF6E3",
        "subtext-color": "#EEE8D5",
    },
};
