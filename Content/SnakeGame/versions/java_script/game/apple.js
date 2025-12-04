import { EntityRects } from "./entity_rect.js";
import { Rect } from "./rect.js";

class Apple extends EntityRects {
    constructor(rect) {
        super();
        this.body = [rect];
    }

    respawn(x, y) {
        this.body[0].x = x;
        this.body[0].y = y;
    }
}

export { Apple };