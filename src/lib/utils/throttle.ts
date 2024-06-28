export default function throttle(fn: Function, timeInMs: number) {
    let throttle = false;

    return function (...args: any[]) {
        if (throttle) return;

        fn(...args);
        throttle = true;
        setTimeout(() => {
            throttle = false;
        }, timeInMs);
    };
}
