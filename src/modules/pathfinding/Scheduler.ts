import EventEmitter from "./EventEmitter";
import { FPS } from "./defs";

type SchedulerProps = {
    emitter: EventEmitter,
    updateInterval?: number,
    fps?: number,
    tickEvent?: string
};

export default class Scheduler {
    private emitter: EventEmitter;
    private updateInterval: number;
    private _fps: number;
    private lastTick: number;
    private timer: number;
    // private animationFrameId: number;
    private tickEvent: string;
    public paused: boolean;


    // constructor(private eventEmitter: EventEmitter) {
    constructor(props: SchedulerProps) {
        this.emitter = props.emitter;
        this.lastTick = 0;
        this.timer = 0;
        // this.updateInterval = 1000 / FPS;
        this._fps = props.fps ?? FPS;
        this.updateInterval = props.updateInterval ?? 1000;
        this.tickEvent = props.tickEvent ?? 'tick';
        this.paused = false;
        // this.animationFrameId = 0;
    }

    get interval() {
        return this.updateInterval / this.fps;
    }

    get fps() {
        return this._fps;
    }

    set fps(newValue: number) {
        this._fps = newValue;
    }

    togglePause() {
        this.paused = !this.paused;
    }

    pause() {
        this.paused = true;
    }

    resume() {
        this.paused = false;
    }

    increaseCount(timeInMs: number) {
        this.timer += timeInMs;
    }

    loop(timestamp = 0) {
        if (!this.paused) {
            const delta = timestamp - this.lastTick;
            this.lastTick = timestamp;

            if (this.timer < this.interval) {
                // this.timer += delta;
                this.increaseCount(delta);
            } else {
                this.emitter.emit(this.tickEvent, timestamp);
                this.timer = 0;
            }
        }

        // this.animationFrameId = window.requestAnimationFrame(this.loop.bind(this));
        window.requestAnimationFrame(this.loop.bind(this));
    }
}
