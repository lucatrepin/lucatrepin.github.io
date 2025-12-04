import { Node } from "./node.js";
import { Rect } from "../scripts/rect.js";

class EntityRect {
    constructor(body = [new Rect(0, 0, 10, 10, "blue")]) {
        this.body = body;
    }

    draw(ctx) {
        this.body.forEach(part => {
            part.draw(ctx);
        });
    }

    checkCollisionAABB(other) {
        for (let partA of this.body) {
            for (let partB of other.body) {
                if (partA.x < partB.x + partB.width &&
                    partA.x + partA.width > partB.x &&
                    partA.y < partB.y + partB.height &&
                    partA.y + partA.height > partB.y) {
                    return true;
                }
            }
        }
        return false;
    }
}

export { EntityRect };