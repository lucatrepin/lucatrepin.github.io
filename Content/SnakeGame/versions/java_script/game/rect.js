import { RGBA } from "./rgba.js";

class Rect {
    constructor(x, y, width, height, color = new RGBA(255, 255, 255, 1)) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    draw(ctx) {
        ctx.fillStyle = this.color.toString();
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

export { Rect };