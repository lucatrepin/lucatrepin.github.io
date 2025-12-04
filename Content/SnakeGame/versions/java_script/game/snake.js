import { EntityRects } from "./entity_rect.js";
import { Rect } from "./rect.js";
import { RGBA } from "./rgba.js";

class Controls {
    constructor(up = "W", right = "D", down = "S", left = "A") {
        this.up = up;
        this.right = right;
        this.down = down;
        this.left = left;
    }
}

const DIRECTION = {
    UP: 0,
    RIGHT: 1,
    DOWN: 2,
    LEFT: 3
}

class Snake extends EntityRects {
    constructor(
            controls = new Controls(),
            parts_count = 3,
            size = 100,
            tail_x = 0,
            tail_y = 0,
            direction = DIRECTION.DOWN,
            canvas_size = { width: 800, height: 600 },
            head_color = new RGBA(0, 255, 0, 1),
            tail_color = new RGBA(0, 100, 0, 1),
            foods = [],
        ) {

        super();
        this.is_alive = true;
        this.ready_to_change_direction = true;
        document.addEventListener("keydown", (event) => {
            if (!this.ready_to_change_direction) return;
            this.ready_to_change_direction = false;
            const key = event.key.toUpperCase();
            switch (key) {
                case controls.up:
                    if (this.direction !== DIRECTION.DOWN) {
                        this.direction = DIRECTION.UP;
                    }
                    break;
                case controls.right:
                    if (this.direction !== DIRECTION.LEFT) {
                        this.direction = DIRECTION.RIGHT;
                    }
                    break;
                case controls.down:
                    if (this.direction !== DIRECTION.UP) {
                        this.direction = DIRECTION.DOWN;
                    }
                    break;
                case controls.left:
                    if (this.direction !== DIRECTION.RIGHT) {
                        this.direction = DIRECTION.LEFT;
                    }
                    break;
            }
        });

        this.direction = direction;
        this.size = size;
        this.body = [new Rect(tail_x, tail_y, size, size, head_color)];
        this.direction = DIRECTION.DOWN;
        this.head_color = head_color;
        this.tail_color = tail_color;

        // initialize snake body
        for (let i = 0; i < parts_count - 1; i++) {
            let last_head = this.body[i];
            let newHead = this.get_new_head(last_head, canvas_size.width, canvas_size.height);
            while (!newHead) {
                this.direction = (this.direction + 1) % 4;
                newHead = this.get_new_head(last_head, canvas_size.width, canvas_size.height);
            }
            this.body.push(newHead);
        }
        this.body.reverse();
        this.set_color_snake(head_color, tail_color);
    }

    get_new_head(last_head, canvas_width, canvas_height) {
        let head = last_head;
        let newHead;
        const step = this.size;
        switch (this.direction) {
            case DIRECTION.UP:
                newHead = new Rect(head.x, head.y - step, head.width, head.height, head.color);
                break;
            case DIRECTION.RIGHT:
                newHead = new Rect(head.x + step, head.y, head.width, head.height, head.color);
                break;
            case DIRECTION.DOWN:
                newHead = new Rect(head.x, head.y + step, head.width, head.height, head.color);
                break;
            case DIRECTION.LEFT:
                newHead = new Rect(head.x - step, head.y, head.width, head.height, head.color);
                break;
        }
        // verifica se saiu da tela
        if (newHead.x < 0 || newHead.x + newHead.width > canvas_width ||
            newHead.y < 0 || newHead.y + newHead.height > canvas_height) {
            console.log("Snake collided with the wall!");
            return null;
        }
        // verifica se colidiu com o próprio corpo
        for (let i = 0; i < this.body.length; i++) {
            let part = this.body[i];
            if (newHead.x === part.x && newHead.y === part.y) {
                console.log("Snake collided with itself!");
                return null;
            }
        }

        return newHead;
    }

    set_color_snake(head_color, tail_color) {
        let increment = head_color.subtract(tail_color);
        let index = this.body.length - 1;
        increment = new RGBA(
            increment.r / index,
            increment.g / index,
            increment.b / index,
            increment.a / index,
        );
        for (let i = 0; i < this.body.length; i++) {
            this.body[i].color = new RGBA(
                Math.min(255, tail_color.r + increment.r * i),
                Math.min(255, tail_color.g + increment.g * i),
                Math.min(255, tail_color.b + increment.b * i),
                Math.min(1, tail_color.a + increment.a * i),
            );
        }
    }

    update(delta, canvas_width, canvas_height) {
        this.ready_to_change_direction = true;
        let last_head = this.body[0];
        let newHead = this.get_new_head(last_head, canvas_width, canvas_height);
        if (newHead) {
            this.body.pop();
            this.body.unshift(newHead);
            this.set_color_snake(this.head_color, this.tail_color);
        } else {
            this.is_alive = false;
            console.log("Snake died!");
        }
    }

    on_head_collision(other) {
        let head = this.body[0];
        for (let partB of other.body) {
            if (head.x < partB.x + partB.width &&
                head.x + head.width > partB.x &&
                head.y < partB.y + partB.height &&
                head.y + head.height > partB.y) {
                return true;
            }
        }
        return false;
    }

    grow() {
        let tail = this.body[this.body.length - 1];
        let newPart = new Rect(tail.x, tail.y, tail.width, tail.height, tail.color);
        this.body.push(newPart);
    }
}

export { Snake, Controls, DIRECTION };