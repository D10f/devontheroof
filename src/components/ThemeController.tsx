"use client";

import { useState } from "react";
import { MdPalette } from "react-icons/md";
import useTheme from "@/hooks/useTheme";
import Dropdown from "@/components/Dropdown";
import { CSSColorProperty } from "@/themes";

type ThemeControllerProps = {
    themes: string[];
};

export default function ThemeController({ themes }: ThemeControllerProps) {
    const currentTheme = useTheme();
    const [showVariant, setShowVariant] = useState(currentTheme.theme);

    return (
        <Dropdown trigger={<MdPalette className="icon" />}>
            <ul>
                <p>Themes</p>
                {themes.map((theme: string) => (
                    <li
                        key={Math.random()}
                        className={
                            theme == currentTheme.theme
                                ? "dropdown__item dropdown__item--active"
                                : "dropdown__item"
                        }
                    >
                        <button onClick={() => currentTheme.changeTheme(theme)}>
                            {theme}
                        </button>
                    </li>
                ))}

                {/*
                <p>Variants</p>
                {currentTheme.variants.map((variant, idx) => (
                    <li
                        key={idx}
                        className={
                            variant === currentTheme.variant
                                ? "dropdown__item dropdown__item--active"
                                : "dropdown__item"
                        }
                    >
                        <button
                            onClick={() => currentTheme.changeTheme(variant)}
                        >
                            {variant}
                        </button>
                    </li>
                ))}
                */}
            </ul>

            <ul>
                <p>Variants</p>
                {currentTheme.variants.map((variant, idx) => (
                    <li
                        key={idx}
                        className={
                            variant === currentTheme.variant
                                ? "dropdown__row-item dropdown__row-item--active"
                                : "dropdown__row-item"
                        }
                    >
                        <button
                            onClick={() => currentTheme.changeVariant(variant)}
                        >
                            <span
                                className="circle"
                                style={{
                                    backgroundColor: `var(--bg-color)`,
                                }}
                            />
                        </button>
                    </li>
                ))}
            </ul>

            <ul>
                <p>Accent</p>
                {currentTheme.colors.map((color, idx) => (
                    <li
                        key={idx}
                        className={
                            color === currentTheme.accentColor
                                ? "dropdown__row-item dropdown__row-item--active"
                                : "dropdown__row-item"
                        }
                    >
                        <button
                            onClick={() =>
                                currentTheme.changeColor(
                                    color as CSSColorProperty,
                                )
                            }
                        >
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
