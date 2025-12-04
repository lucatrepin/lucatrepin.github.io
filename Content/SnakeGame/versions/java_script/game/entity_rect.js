import { Rect } from "./rect.js";

class EntityRects {
    constructor(body = [new Rect(0, 0, 10, 10, "blue")]) {
        this.body = body;
    }

    update(delta) {

    }

    // draw(ctx) {
    //     ctx.moveTo(0, 0);
    //     this.body.forEach(part => {
    //         part.draw(ctx);
    //     });
    // }

    draw(ctx) {
        for (let i = this.body.length - 1; i >= 0 ; i--) {
            this.body[i].draw(ctx);
        }
    }

    checkCollisionAABB(other) {
        if (other instanceof Rect) {
            // compara contra um único Rect
            const r = other;
            return this.body.some(part =>
                part.x < r.x + r.width &&
                part.x + part.width > r.x &&
                part.y < r.y + r.height &&
                part.y + part.height > r.y
            );
        }
        // EntityRects: compara todos os pares
        return this.body.some(a =>
            other.body.some(b =>
                a.x < b.x + b.width &&
                a.x + a.width > b.x &&
                a.y < b.y + b.height &&
                a.y + a.height > b.y
            )
        );
    }

}

export { EntityRects };