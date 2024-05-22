export const themeOptions = [
  "Cattpuccin Latte",
  "Cattpuccin Frappe",
  "Cattpuccin Macchiato",
  "Cattpuccin Mocha",
] as const;

export const accentOptions = [
  "red",
  "peach",
  "yellow",
  "green",
  "sky",
  "mauve",
] as const;

export type ThemeOptions = (typeof themeOptions)[number];
export type AccentOptions = (typeof accentOptions)[number];

export function switchTheme(theme: ThemeOptions) {
  const variant = theme.split(" ").at(-1)?.toLowerCase();
  const bgColor = getComputedStyle(document.documentElement).getPropertyValue(
    `--ctp-${variant}-crust`,
  );
  const bgColor2 = getComputedStyle(document.documentElement).getPropertyValue(
    `--ctp-${variant}-base`,
  );

  const textColor = getComputedStyle(document.documentElement).getPropertyValue(
    `--ctp-${variant}-text`,
  );

  const subtextColor = getComputedStyle(
    document.documentElement,
  ).getPropertyValue(`--ctp-${variant}-subtext0`);

  document.documentElement.style.setProperty("--bg-color", bgColor);
  document.documentElement.style.setProperty("--bg-color-2", bgColor2);
  document.documentElement.style.setProperty("--text-color", textColor);
  document.documentElement.style.setProperty("--subtext-color", subtextColor);
}

export function switchAccent(color: AccentOptions, theme: ThemeOptions) {
  const variant = theme.split(" ").at(-1)?.toLowerCase();
  const accentColor = getComputedStyle(
    document.documentElement,
  ).getPropertyValue(`--ctp-${variant}-${color}`);

  document.documentElement.style.setProperty("--primary-color", accentColor);
}

export function getVariableValue(color: AccentOptions, theme: ThemeOptions) {
  const variant = theme.split(" ").at(-1)?.toLowerCase();
  return getComputedStyle(document.documentElement).getPropertyValue(
    `--ctp-${variant}-${color}`,
  );
}
