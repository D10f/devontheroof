"use client";

import { useEffect, useState } from "react";
import { TfiPalette } from "react-icons/tfi";
import Dropdown from "./Dropdown";

type ThemeOptions =
  | "Cattpuccin Latte"
  | "Cattpuccin Frappe"
  | "Cattpuccin Macchiato"
  | "Cattpuccin Mocha";

const themes: ThemeOptions[] = [
  "Cattpuccin Latte",
  "Cattpuccin Frappe",
  "Cattpuccin Macchiato",
  "Cattpuccin Mocha",
];

export default function ThemeController() {
  const [theme, setTheme] = useState<ThemeOptions>("Cattpuccin Frappe");

  useEffect(() => {
    const variant = theme.split(" ").at(-1)?.toLowerCase();
    const bgColor = getComputedStyle(document.documentElement).getPropertyValue(
      `--ctp-${variant}-crust`,
    );
    const bgColor2 = getComputedStyle(
      document.documentElement,
    ).getPropertyValue(`--ctp-${variant}-base`);

    const textColor = getComputedStyle(
      document.documentElement,
    ).getPropertyValue(`--ctp-${variant}-text`);

    document.documentElement.style.setProperty("--bg-color", bgColor);
    document.documentElement.style.setProperty("--bg-color-2", bgColor2);
    document.documentElement.style.setProperty("--text-color", textColor);
  }, [theme]);

  return (
    <Dropdown trigger={<TfiPalette className="icon" />}>
      <ul>
        {themes.map((themeName, idx) => (
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
    </Dropdown>
  );
}
