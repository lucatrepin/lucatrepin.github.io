import { Apple } from "./apple.js";
import { RGBA } from "./rgba.js";
import { Snake, Controls, DIRECTION } from "./snake.js";
import { Rect } from "./rect.js";

class Game {
    constructor(canvas, infos, game_over, game_win) {
        this.last_time = 0;

        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.game_over = game_over;
        this.game_win = game_win;
        
        this.change_config(infos);
    }

    change_config(infos) {
        switch (infos.game_difficulty) {
            case "0":
                this.frames = 2;
                break;
            case "1":
                this.frames = 5;
                break;
            case "2":
                this.frames = 10;
                break;
            default:
                console.warn("Unknown game difficulty:", infos.game_difficulty);
                break;
        }
    }

    start() {
        this.start_classic();
    }

    get_void_rect(scale, entities) {
        let x;
        let y;
        let rect;
        while (true) {
            x = Math.floor(Math.random() * (this.canvas.width - scale) / scale) * scale;
            y = Math.floor(Math.random() * (this.canvas.height - scale) / scale) * scale;
            rect = new Rect(x, y, scale, scale, new RGBA(255, 0, 0, 1));
            if (!entities.some(entity => entity.checkCollisionAABB(rect))) {
                break;
            }
        }
        return rect;
    }

    start_classic() {
        let scale = 120; // alterar par ser respectivo ao tamanho da tela
        this.snakes = [new Snake(
            new Controls(),
            3,
            scale,
            0,
            0,
            DIRECTION.DOWN,
            { width: this.canvas.width, height: this.canvas.height },
            new RGBA(0, 255, 0, 1),
            new RGBA(0, 100, 0, 1),
            [],
        )];

        const apples_count = 1;
        this.apples = [];
        
        // cria as maçãs iniciais
        for (let i = 0; i < apples_count; i++) {
            let apple = new Apple(this.get_void_rect(scale, [...this.snakes, ...this.apples]));
            this.apples.push(apple);
        }

        this.last_time = Date.now();
        this.draw();
        let loop = setInterval(() => {
            let delta = Date.now() - this.last_time;
            this.last_time = Date.now();

            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            // update global
            for (let snake of this.snakes) {
                snake.update(delta, this.canvas.width, this.canvas.height);
            }
            for (let apple of this.apples) {
                apple.update(delta);
            }

            // verifica se as snakes colidiram com as maçãs
            for (let snake of this.snakes) {
                for (let apple of this.apples) {
                    if (snake.checkCollisionAABB(apple)) {
                        snake.grow();
                        let apple_pos = this.get_void_rect(scale, [...this.snakes, ...this.apples]);
                        apple.respawn(
                            apple_pos.x,
                            apple_pos.y
                        );
                    }
                }
            }

            // verifica se a snake atingio o tamanho máximo (ganhou o jogo)
            for (let snake of this.snakes) {
                console.log(0, window.screen.width / scale * window.screen.height / scale);
                console.log(1, (window.screen.width / scale) * (window.screen.height / scale));
                if (snake.body.length >= (window.screen.width / scale) * (window.screen.height / scale)) {
                    clearInterval(loop);
                    this.game_win();
                }
            }

            this.draw();

            if (!this.snakes[0].is_alive) {
                clearInterval(loop);
                this.game_over();
            }
        }, 1000.0 / this.frames);
    }

    draw() {
        for (let snake of this.snakes) {
            snake.draw(this.ctx);
        }
        for (let apple of this.apples) {
            apple.draw(this.ctx);
        }
    }
}

export { Game };