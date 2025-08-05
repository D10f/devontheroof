"use client";

import useTheme from "@/hooks/useTheme";
import Dropdown from "@/components/Dropdown";
import { ThemeVariant } from "@/themes/defs";

type ThemeControllerProps = {
    themes: Record<string, Record<string, ThemeVariant>>;
};

export default function ThemeController({ themes }: ThemeControllerProps) {
    const theme = useTheme(themes);

    return (
        <Dropdown>
            <ul>
                <p className="unselectable">Themes</p>
                {theme.themes.map((t: string) => (
                    <li
                        key={t}
                        className={
                            t == theme.activeTheme
                                ? "dropdown__item dropdown__item--active"
                                : "dropdown__item"
                        }
                    >
                        <button onClick={() => theme.setActiveTheme(t)}>
                            {t}
                        </button>
                    </li>
                ))}
            </ul>

            <ul>
                <p className="unselectable">Variants</p>
                {theme.variants.map((variant) => (
                    <li
                        key={variant}
                        className={
                            variant === theme.activeVariant
                                ? "dropdown__row-item dropdown__row-item--active"
                                : "dropdown__row-item"
                        }
                    >
                        <button
                            onClick={() => {
                                theme.setActiveVariant(variant);
                            }}
                        >
                            <span
                                className="circle"
                                style={{
                                    backgroundColor: `${themes[theme.activeTheme][variant]["bg-color"]}`,
                                }}
                            />
                        </button>
                    </li>
                ))}
            </ul>

            <ul>
                <p className="unselectable">Accent</p>
                {theme.accents.map((color) => (
                    <li
                        key={color}
                        className={
                            color === theme.activeAccent
                                ? "dropdown__row-item dropdown__row-item--active"
                                : "dropdown__row-item"
                        }
                    >
                        <button onClick={() => theme.setActiveAccent(color)}>
                            <span
                                className="circle"
                                style={{
                                    backgroundColor: `var(--${color})`,
                                }}
                            />
                        </button>
                    </li>
                ))}
            </ul>
        </Dropdown>
    );
}
