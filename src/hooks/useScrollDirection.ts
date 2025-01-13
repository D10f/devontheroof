import useScroll from "@/hooks/useScroll";
import { useCallback, useState } from "react";

export default function useScrollDirection() {
    const [position, setPosition] = useState(0);
    const [direction, setDirection] = useState(0);

    const updatePosition = useCallback(() => {
        setPosition((prev) => {
            const current = window.scrollY;
            setDirection(current > prev ? 1 : -1);
            return current;
        });
    }, []);

    useScroll(updatePosition);

    return { position, direction };
}
