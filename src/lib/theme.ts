type ThemeOptions =
  | "Cattpuccin Latte"
  | "Cattpuccin Frappe"
  | "Cattpuccin Macchiato"
  | "Cattpuccin Mocha";

export function switchTheme<T extends ThemeOptions>(theme: T) {
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
