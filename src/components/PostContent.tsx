"use client";

import { useRef } from "react";
import { useEventListener } from "usehooks-ts";

type PostContentProps = {
    title: string;
    subtitle?: string;
    date: string;
    content: string;
};

export default function PostContent({
    title,
    subtitle,
    date,
    content,
}: PostContentProps) {
    const postContentRef = useRef<HTMLElement>(null);

    const handleCodeCopy = (event: MouseEvent) => {
        const target = event.target as HTMLButtonElement;

        if (
            !target.classList.contains("codeblock__copy-btn") ||
            target.classList.contains("rotating-btn--active")
        )
            return;

        if (navigator === null || !navigator.clipboard) {
            console.warn("Clipboard not supported.");
            return;
        }

        const listingBlock = target.nextElementSibling as HTMLDivElement;
        const codeElement = listingBlock.getElementsByTagName("code")[0];
        const codeLanguage = listingBlock.getAttribute("data-language");

        const strToCopy = Array.from(codeElement.children).reduce(
            (acc, curr) => {
                if (!curr.classList.contains("remove")) {
                    let line = (curr as HTMLSpanElement).innerText;
                    line = line.replace(/[❶❷❸❹❺❻❼❽❾]*$/g, "");

                    if (codeLanguage === "console") {
                        line = line.replace(/^[#$]\s*/g, "");
                    }

                    acc += line + "\n";
                }

                return acc;
            },
            "",
        );

        navigator.clipboard
            .writeText(strToCopy)
            .then(() => {
                target.classList.add("rotating-btn--active");
                setTimeout(() => {
                    target.classList.remove("rotating-btn--active");
                    target.blur();
                }, 2000);
            })
            .catch(() => console.warn("Failed to copy to clipboard."));
    };

    useEventListener("click", handleCodeCopy, postContentRef);

    return (
        <div className="layout-content">
            <header>
                <h1 className="post__title">{title}</h1>
                {subtitle && <h2 className="post__subtitle">{subtitle}</h2>}
            </header>

            <aside className="post__metadata">
                <span>{date}</span>
            </aside>

            <main
                ref={postContentRef}
                className="post__content"
                dangerouslySetInnerHTML={{ __html: content }}
            />
        </div>
    );
}
