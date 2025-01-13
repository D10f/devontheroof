"use client";

import { MdPalette } from "react-icons/md";
import useTheme2 from "@/hooks/useTheme2";
import Dropdown from "@/components/Dropdown";
import { CSSColorProperty } from "@/themes";
import { ThemeVariant } from "@/themes/BaseTheme";

type ThemeControllerProps = {
    themes: Record<string, Record<string, ThemeVariant>>;
};

export default function ThemeController({ themes }: ThemeControllerProps) {
    const theme = useTheme2(themes);

    return (
        <Dropdown trigger={<MdPalette className="icon" />}>
            <ul>
                <p className="unselectable">Themes</p>
                {theme.themes.map((t: string) => (
                    <li
                        key={Math.random()}
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
                {theme.variants.map((variant, idx) => (
                    <li
                        key={idx}
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
                                    backgroundColor: `${themes[theme.activeTheme][variant]["bg-color-3"]}`,
                                }}
                            />
                        </button>
                    </li>
                ))}
            </ul>

            <ul>
                <p className="unselectable">Accent</p>
                {theme.accents.map((color, idx) => (
                    <li
                        key={idx}
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
