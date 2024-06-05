"use client";

import { MdPalette } from "react-icons/md";
import useTheme from "@/hooks/useTheme";
import Dropdown from "@/components/Dropdown";
import { CSSColorProperty } from "@/themes";

export default function ThemeController() {
    const theme = useTheme();
    return (
        <Dropdown trigger={<MdPalette className="icon" />}>
            <ul>
                <p>Themes</p>
                {theme.variants.map((variant, idx) => (
                    <li
                        key={idx}
                        className={
                            variant === theme.variant
                                ? "dropdown__item dropdown__item--active"
                                : "dropdown__item"
                        }
                    >
                        <button onClick={() => theme.changeTheme(variant)}>
                            {variant}
                        </button>
                    </li>
                ))}
            </ul>
            <ul>
                <p>Accent</p>
                {theme.colors.map((color, idx) => (
                    <li
                        key={idx}
                        className={
                            color === theme.accentColor
                                ? "dropdown__row-item dropdown__row-item--active"
                                : "dropdown__row-item"
                        }
                    >
                        <button
                            onClick={() =>
                                theme.changeColor(color as CSSColorProperty)
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
