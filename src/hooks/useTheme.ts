import { useCallback, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLocalStorage } from "usehooks-ts";
import {
    ThemeCSSProps,
    ThemeVariant,
    DEFAULT_ACCENT_COLOR,
    DEFAULT_THEME,
    DEFAULT_VARIANT,
    accentColors,
} from "@/themes/defs";

type AvailableThemes = Record<string, Record<string, ThemeVariant>>;

export default function useTheme(themes: AvailableThemes) {
    const [activeTheme, setActiveTheme] = useLocalStorage(
        "activeTheme",
        DEFAULT_THEME,
        {
            initializeWithValue: true, // NOTE: disable for SSR
        },
    );

    const [activeVariant, setActiveVariant] = useLocalStorage(
        "activeVariant",
        DEFAULT_VARIANT,
        {
            initializeWithValue: true, // NOTE: disable for SSR
        },
    );

    const [activeAccent, setActiveAccent] = useLocalStorage(
        "activeAccent",
        DEFAULT_ACCENT_COLOR,
        {
            initializeWithValue: true, // NOTE: disable for SSR
        },
    );

    const pathname = usePathname();

    const getTheme = useCallback(
        () => themes[activeTheme],
        [themes, activeTheme],
    );
    const getVariant = useCallback(
        () => getTheme()[activeVariant],
        [getTheme, activeVariant],
    );
    const getAccent = useCallback(
        () => getVariant()[activeAccent as ThemeCSSProps],
        [getVariant, activeAccent],
    );
    const updateStyles = useCallback(() => {
        const variantStyles = getVariant();
        for (const key in variantStyles) {
            document.documentElement.style.setProperty(
                `--${key}`,
                variantStyles[key as ThemeCSSProps],
            );
        }
    }, [getVariant]);

    const updateAccent = useCallback(() => {
        document.documentElement.style.setProperty(
            "--primary-color",
            getAccent(),
        );
    }, [getAccent]);

    const updateCodeBlocks = useCallback(() => {
        const codeblocks = document.getElementsByClassName("shiki");

        for (let i = 0, l = codeblocks.length; i < l; ++i) {
            const codeblock = codeblocks[i] as HTMLElement;
            codeblock.style.setProperty(
                "background-color",
                `var(--shiki-${activeTheme.toLowerCase()}-${activeVariant}-bg)`,
            );

            const tokens = codeblock.getElementsByTagName("span");
            for (let j = 0, l = tokens.length; j < l; ++j) {
                const token = tokens[j] as HTMLElement;
                token.style.setProperty(
                    "color",
                    `var(--shiki-${activeTheme.toLowerCase()}-${activeVariant})`,
                );
            }
        }
    }, [activeTheme, activeVariant]);

    const updateTheme = (theme: string) => {
        const newTheme = themes[theme];

        // By convention, the themes use the first position in the object
        // for light theme. This ensures that switching themes doesn't
        // change the theme too harshly on the eyes.
        //const newVariantIdx = window.matchMedia("(prefers-color-scheme: dark)")
        //    .matches
        //    ? 1
        //    : 0;
        //
        //const newVariant = Object.keys(newTheme)[newVariantIdx];
        setActiveTheme(theme);
        //setActiveVariant(newVariant);
    };

    useEffect(() => {
        updateStyles();
        updateAccent();
        updateCodeBlocks();
    }, [updateStyles, updateAccent, updateCodeBlocks, pathname]);

    return {
        themes: Object.keys(themes),
        variants: Object.keys(getTheme()),
        accents: accentColors,
        activeTheme,
        activeVariant,
        activeAccent,
        setActiveTheme: updateTheme,
        setActiveVariant,
        setActiveAccent,
    };
}
