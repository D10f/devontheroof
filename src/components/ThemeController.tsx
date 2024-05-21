"use client";

import { useState } from "react";
import Dropdown from "./Dropdown";

type ThemeOptions =
  | "Cattpuccin Latte"
  | "Cattpuccin Frappe"
  | "Cattpuccin Mocha"
  | "Cattpuccin Macchiato";

const themes: ThemeOptions[] = [
  "Cattpuccin Latte",
  "Cattpuccin Frappe",
  "Cattpuccin Mocha",
  "Cattpuccin Macchiato",
];

export default function ThemeController() {
  const [theme, setTheme] = useState<ThemeOptions>("Cattpuccin Frappe");

  return (
    <Dropdown trigger={<span>THEME</span>}>
      <ul>
        {themes.map((themeName, idx) => (
          <li key={idx} className={themeName === theme
            ? "dropdown__item dropdown__item--active"
            : "dropdown__item"}
          >
            <button onClick={() => setTheme(themeName)}>{themeName}</button>
          </li>
        ))}
      </ul>
    </Dropdown>
  );
}

// {themeName === theme && <span className="dropdown__item--active" />}