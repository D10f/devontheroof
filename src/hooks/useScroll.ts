import { useEventListener } from "usehooks-ts";
import throttle from "@/lib/utils/throttle";

export default function useScroll(
    callback: (e: Event) => void,
    throttleTime = 100,
) {
    useEventListener("scroll", throttle(callback, throttleTime));
}
