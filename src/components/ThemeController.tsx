"use client";

import { useEffect, useState } from "react";
import { TfiPalette } from "react-icons/tfi";
import { switchTheme } from "@/lib/theme";
import Dropdown from "@/components/Dropdown";

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

  useEffect(() => switchTheme(theme), [theme]);

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
