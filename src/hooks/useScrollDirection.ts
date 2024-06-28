import useScroll from "@/hooks/useScroll";
import { useState } from "react";

export default function useScrollDirection() {
    const [position, setPosition] = useState(0);
    const [direction, setDirection] = useState(0);

    const updatePosition = () => {
        setPosition((prev) => {
            const current = window.scrollY;
            setDirection(current > prev ? 1 : -1);
            return current;
        });
    };

    useScroll(updatePosition);

    return { position, direction };
}
