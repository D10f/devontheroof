export default class Renderer {

    private ctx: CanvasRenderingContext2D;

    constructor(private canvas: HTMLCanvasElement) {
        this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    render(entities: any[] | any) {
        if (entities instanceof Array) {
            for (let i = 0, l = entities.length; i < l; i++) {
                entities[i].render(this.ctx);
            }
        } else {
            entities.render(this.ctx);
        }
    }
}
