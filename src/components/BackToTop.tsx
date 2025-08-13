"use client";

import { useMemo } from "react";
import { FaChevronUp } from "react-icons/fa6";
import useScrollDirection from "@/hooks/useScrollDirection";

export default function BackToTop() {
    const { direction } = useScrollDirection();
    const hideBtn = direction > 0;

    const btnStyle = useMemo(() => {
        const baseStyles = "btn btn--round btn--float js-required ";
        return baseStyles + (hideBtn ? "btn--hidden" : "");
    }, [hideBtn]);

    function scrollUp() {
        document.body.scrollIntoView({ behavior: "smooth" });
    }

    return (
        <button className={btnStyle} onClick={scrollUp}>
            <FaChevronUp />
        </button>
    );
}
