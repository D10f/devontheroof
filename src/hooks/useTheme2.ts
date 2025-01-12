import { ThemeCSSProps, ThemeVariant } from "@/themes/BaseTheme";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { useLocalStorage } from "usehooks-ts";

type AvailableThemes = Record<string, Record<string, ThemeVariant>>;

export default function useTheme2(themes: AvailableThemes) {
    const currentName = useRef<string>();
    const currentTheme = useRef<Record<string, ThemeVariant>>();
    const currentVariant = useRef<ThemeVariant>();
    const path = usePathname();

    const [activeTheme, setActiveTheme] = useLocalStorage(
        "activeTheme",
        Object.keys(themes)[0],
        {
            initializeWithValue: true, // NOTE: disable for SSR
        },
    );

    const [activeVariant, setActiveVariant] = useLocalStorage(
        "activeVariant",
        Object.keys(themes[activeTheme])[0],
        {
            initializeWithValue: true, // NOTE: disable for SSR
        },
    );

    const [activeAccent, setActiveAccent] = useLocalStorage(
        "activeAccent",
        Object.keys(themes[activeTheme][activeVariant])[0],
        {
            initializeWithValue: true, // NOTE: disable for SSR
        },
    );

    currentName.current = activeTheme;
    currentTheme.current = themes[activeTheme];
    currentVariant.current = themes[activeTheme][activeVariant];

    useEffect(() => {
        console.log("running");
        const newVariant = Object.keys(themes[activeTheme])[0];
        currentName.current = activeTheme;
        currentTheme.current = themes[activeTheme];
        currentVariant.current = themes[activeTheme][newVariant];
        setActiveVariant(newVariant);
        setActiveAccent(Object.keys(currentVariant.current!)[0]);
    }, [
        activeTheme,
        currentTheme,
        currentVariant,
        setActiveVariant,
        setActiveAccent,
        themes,
    ]);

    useEffect(() => {
        console.log("running!!");
        for (const key in currentVariant.current) {
            document.documentElement.style.setProperty(
                `--${key}`,
                currentVariant.current[key as ThemeCSSProps],
            );
        }

        if (path.startsWith("/blog")) {
            const codeblocks = document.getElementsByClassName("shiki");

            for (let i = 0, l = codeblocks.length; i < l; ++i) {
                const codeblock = codeblocks[i] as HTMLElement;
                codeblock.style.setProperty(
                    "background-color",
                    `var(--shiki-${currentName.current!.toLowerCase()}-${activeVariant}-bg)`,
                );

                const tokens = codeblock.getElementsByTagName("span");
                for (let j = 0, l = tokens.length; j < l; ++j) {
                    const token = tokens[j] as HTMLElement;
                    token.style.setProperty(
                        "color",
                        `var(--shiki-${currentName.current!.toLowerCase()}-${activeVariant})`,
                    );
                }
            }
        }
    }, [activeVariant, setActiveAccent, path, currentName]);

    useEffect(() => {
        for (const key in currentVariant.current) {
            document.documentElement.style.setProperty(
                `--${key}`,
                currentVariant.current[key as ThemeCSSProps],
            );
        }

        document.documentElement.style.setProperty(
            "--primary-color",
            currentVariant.current![activeAccent as ThemeCSSProps],
        );
    }, [activeAccent]);

    return {
        themes: Object.keys(themes),
        variants: Object.keys(currentTheme.current),
        accents: Object.keys(currentVariant.current).slice(0, 6),
        activeTheme,
        activeVariant,
        activeAccent,
        setActiveTheme,
        setActiveVariant,
        setActiveAccent,
    };
}
