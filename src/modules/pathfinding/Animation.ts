import EventEmitter from "./EventEmitter";
import Hexagon from "./Hexagon";
import Pathfinder from "./Pathfinder";
import Scheduler from "./Scheduler";

export default class Animation {

    private scheduler: Scheduler;

    constructor(private emitter: EventEmitter, private pathfinder: Pathfinder) {
        this.scheduler = new Scheduler({ emitter, tickEvent: 'animationTick' });
        this.scheduler.pause();
        this.scheduler.loop();
        this.animationEvents();
    }

    get playing() {
        return !this.scheduler.paused;
    }

    private animationEvents() {
        this.emitter.subscribe('play', () => {
            this.pathfinder.calculatePath();
            this.scheduler.resume();
        });

        this.emitter.subscribe('pause', () => {
            this.scheduler.togglePause();
        });

        this.emitter.subscribe('playbackSpeed', (speedMultiplier: number) => {
            this.scheduler.fps = 60 * speedMultiplier;
        });

        this.emitter.subscribe('animationTick', () => {
            const { value, done } = this.pathfinder.next();

            if (!done) {
                return this.emitter.emit('insertMiddleLayer', new Hexagon({
                    x: value.x,
                    y: value.y,
                    color: 'rgba(200,75,175,0.5)'
                }));
            }

            const path = this.pathfinder.reconstructPath(value);
            this.emitter.emit('animationDone', path);

            this.scheduler.pause();
            this.pathfinder.reset();
        });
    }
}
