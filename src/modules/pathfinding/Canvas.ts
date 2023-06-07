import Cursor from './Cursor';
import EventEmitter from './EventEmitter';
import Renderer from './Renderer';
import Scheduler from './Scheduler';
import World from './World';

export default class Canvas {

    public emitter: EventEmitter;
    private scheduler: Scheduler;
    private renderer: Renderer;
    private world: World;
    public cursor: Cursor;

    constructor(canvas: HTMLCanvasElement) {
        this.emitter = new EventEmitter();
        this.scheduler = new Scheduler({ emitter: this.emitter });
        this.renderer = new Renderer(canvas);
        this.cursor = new Cursor(canvas, this.renderer, this.emitter);
        this.world = new World(this.renderer, this.emitter);
        this.registerEvents();
    }

    private registerEvents() {
        this.emitter.subscribe('tick', () => {
            this.renderer.clear();
            this.world.render();
            this.cursor.render();
        });
    }

    init() {
        this.scheduler.loop();
    }
}
