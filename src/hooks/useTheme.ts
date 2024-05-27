import {
  DEFAULT_THEME,
  DEFAULT_ACCENT_COLOR,
  CSSColorProperty,
} from "@/themes";
import makeTheme from "@/themes/factory";
import { useState, useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";

export default function useTheme() {
  const [storedTheme, setStoredTheme] = useLocalStorage(
    "theme",
    DEFAULT_THEME,
    { initializeWithValue: true }, // NOTE: disable for SSR
  );

  const [storedAccent, setStoredAccent] = useLocalStorage<CSSColorProperty>(
    "accent",
    DEFAULT_ACCENT_COLOR,
    { initializeWithValue: true }, // NOTE: disable for SSR
  );

  const [currentTheme, setCurrentTheme] = useState(makeTheme(storedTheme));

  useEffect(() => {
    if (typeof window === "undefined") return;
    currentTheme.updateCSSThemeProps();
    currentTheme.updateCodeBlockProps();
    currentTheme.updateCSSAccentColorProps(storedAccent);
  }, [currentTheme]);

  function changeTheme(themeName: string) {
    setCurrentTheme(makeTheme(themeName));
    setStoredTheme(themeName);
  }

  function changeColor(color: CSSColorProperty) {
    setStoredAccent(color);
    currentTheme.updateCSSAccentColorProps(color);
  }

  return {
    changeTheme,
    changeColor,
    accentColor: storedAccent,
    colors: currentTheme.colors,
    variant: currentTheme.variant,
    variants: currentTheme.variants,
  };
}
