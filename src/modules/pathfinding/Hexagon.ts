import { HEX_SIZE, HEX_WIDTH } from "./defs";

export default class Hexagon {

    public id: string;
    public x: number;
    public y: number;
    public size: number;
    public col: number;
    public row: number;
    public color: string;
    public image: HTMLImageElement;
    public imageAngle: number;

    constructor(props: HexagonProps) {
        this.x = props.x;
        this.y = props.y;
        this.size = props.size ?? HEX_SIZE;
        this.col = props.col ?? 0;
        this.row = props.row ?? 0;
        this.color = props.color ?? '';
        this.image = new Image();
        this.image.src = props.image ?? '';
        this.imageAngle = props.imageAngle ?? 0;
        this.id = props.id ?? `${this.x},${this.y}`;
        // this.id = props.id ?? crypto.randomUUID();
    }

    render(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.moveTo(0, 0 - this.size);

        for (let i = 0; i < 3; i++) {
            ctx.lineTo(0, 0 - this.size);
            ctx.rotate(Math.PI / 3);
            ctx.lineTo(0, 0 - this.size);
            ctx.rotate(Math.PI / 3);
        }

        if (this.color) this.drawColor(ctx);
        if (this.image) this.drawImage(ctx);

        ctx.closePath();
        ctx.restore();
    }

    protected drawImage(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.rotate(this.imageAngle);
        ctx.drawImage(this.image, -HEX_WIDTH * 0.5, -HEX_SIZE)
        ctx.restore();
    }

    protected drawColor(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}
