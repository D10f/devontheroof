import {
    DEFAULT_THEME,
    DEFAULT_VARIANT,
    DEFAULT_ACCENT_COLOR,
    CSSColorProperty,
} from "@/themes";
import makeTheme from "@/themes/factory";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";

export default function useTheme() {
    const [storedTheme, setStoredTheme] = useLocalStorage(
        "theme",
        DEFAULT_THEME,
        { initializeWithValue: true }, // NOTE: disable for SSR
    );

    const [storedVariant, setStoredVariant] = useLocalStorage(
        "variant",
        DEFAULT_VARIANT,
        { initializeWithValue: true }, // NOTE: disable for SSR
    );

    const [storedAccent, setStoredAccent] = useLocalStorage<CSSColorProperty>(
        "accent",
        DEFAULT_ACCENT_COLOR,
        { initializeWithValue: true }, // NOTE: disable for SSR
    );

    const [currentTheme, setCurrentTheme] = useState(makeTheme(storedTheme));
    const path = usePathname();

    useEffect(() => {
        // if (typeof window === "undefined") return;
        currentTheme.updateCSSThemeProps();
        currentTheme.updateCodeBlockProps();
        currentTheme.updateCSSAccentColorProps(storedAccent);
    }, [currentTheme, storedAccent]);

    useEffect(() => {
        if (!path.startsWith("/blog/")) return;
        currentTheme.updateCodeBlockProps();
    }, [currentTheme, path]);

    function changeTheme(themeName: string) {
        const newTheme = makeTheme(themeName);
        changeVariant(newTheme.variant);
        setCurrentTheme(newTheme);
        setStoredTheme(newTheme.name);
    }

    function changeVariant(variantName: string) {
        const newTheme = makeTheme(currentTheme.name);
        newTheme.variant = variantName;
        setCurrentTheme(newTheme);
        setStoredVariant(newTheme.variant);
    }

    function changeColor(color: CSSColorProperty) {
        setStoredAccent(color);
        currentTheme.updateCSSAccentColorProps(color);
    }

    return {
        changeTheme,
        changeVariant,
        changeColor,
        accentColor: storedAccent,
        theme: currentTheme.name,
        colors: currentTheme.colors,
        variant: currentTheme.variant,
        variants: currentTheme.variants,
        cssPrefix: currentTheme.cssPrefix,
    };
}
