"use client";

import { useEffect, useState } from "react";
import { TfiPalette } from "react-icons/tfi";
import {
  themeOptions,
  accentOptions,
  switchTheme,
  switchAccent,
  ThemeOptions,
  AccentOptions,
  getVariableValue,
} from "@/lib/theme";
import Dropdown from "@/components/Dropdown";

export default function ThemeController() {
  const [theme, setTheme] = useState<ThemeOptions>("Cattpuccin Frappe");
  const [accent, setAccent] = useState<AccentOptions>("peach");

  useEffect(() => {
    switchTheme(theme);
    switchAccent(accent, theme);
  }, [theme, accent]);

  return (
    <Dropdown trigger={<TfiPalette className="icon" />}>
      <ul>
        <p>Themes</p>
        {themeOptions.map((themeName, idx) => (
          <li
            key={idx}
            className={
              themeName === theme
                ? "dropdown__item dropdown__item--active"
                : "dropdown__item"
            }
          >
            <button onClick={() => setTheme(themeName)}>{themeName}</button>
          </li>
        ))}
      </ul>
      <ul>
        <p>Accent</p>
        {accentOptions.map((accentColor, idx) => (
          <li
            key={idx}
            className={
              accentColor === accent
                ? "dropdown__row-item dropdown__row-item--active"
                : "dropdown__row-item"
            }
          >
            <button onClick={() => setAccent(accentColor)}>
              <span
                className="circle"
                style={{
                  backgroundColor: getVariableValue(accentColor, theme),
                }}
              />
            </button>
          </li>
        ))}
      </ul>
    </Dropdown>
  );
}
