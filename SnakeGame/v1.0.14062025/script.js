class Game {
    constructor(width, height, relationY_painel, backgroundColor_game, backgroundColor_painel) {

        this.size_canvasGame = [width, height];
        this.size_canvasPainel  = [width, relationY_painel*height];
        
        this.dimension = [12, 12];
        this.proportion = this.size_canvasGame[0] / this.dimension[0];

        this.canvas_painel = document.createElement("canvas");
        body.appendChild(this.canvas_painel);

        this.canvas_painel.width = this.size_canvasPainel[0];
        this.canvas_painel.height = this.size_canvasPainel[1];
        this.canvas_painel.style.width = this.size_canvasPainel[0];
        this.canvas_painel.style.height = this.size_canvasPainel[1];
        this.canvas_painel.style.backgroundColor = backgroundColor_painel;

        this.canvas_game = document.createElement("canvas");
        body.appendChild(this.canvas_game);

        this.canvas_game.width = this.size_canvasGame[0];
        this.canvas_game.height = this.size_canvasGame[1];
        this.canvas_game.style.width = `${this.size_canvasGame[0]}px`;
        this.canvas_game.style.height = `${this.size_canvasGame[1]}px`;
        this.canvas_game.style.backgroundColor = backgroundColor_game;
        
        this.ctx_game = this.canvas_game.getContext("2d");
        this.ctx_painel = this.canvas_painel.getContext("2d");
        
        this.dificult = "Pinheiro";

        this.margin_button = 20;

        this.inDelay = false;
        this.VerifyPause = (event) => {
            if (event.key == "Escape") {
                if (!this.wating) {
                    if (!this.paused) {
                        this.paused = true;
                    } else {
                        this.retakeGame();
                    }
                }
            }
        }
    }

    setButton(relations_buttons) {
        this.button_play = new Button("Play", [this.size_canvasGame[0] / 2, this.size_canvasGame[1] / 2 + -50], "black", "60px Arial", "green", [relations_buttons[0], relations_buttons[1]]);
        this.button_settings = new Button("Settings", [this.size_canvasGame[0] / 2, this.size_canvasGame[1] / 2 + 50], "black", "60px Arial", "green", [relations_buttons[0], relations_buttons[1]]);
        
        this.button_restart = new Button("Restart", [this.size_canvasGame[0] / 2, this.size_canvasGame[1] / 2], "black", "60px Arial", "green", [relations_buttons[0], relations_buttons[1]]);
        {
            let buttons = 7; //setar pra quantidade de botoes neste escopo
            let allSpace = this.size_canvasGame[1] * 0.8;
            let perButton = allSpace / buttons;
            this.button_normal = new Button("Normal", [this.size_canvasGame[0] / 2, this.size_canvasGame[1] / 2 - 3 * perButton], "black", "60px Arial", "green", [relations_buttons[0], relations_buttons[1]]);
            this.button_otavio = new Button("Otavio", [this.size_canvasGame[0] / 2, this.size_canvasGame[1] / 2 - 2 * perButton], "black", "60px Arial", "green", [relations_buttons[0], relations_buttons[1]]);
            this.button_miguel = new Button("Miguel", [this.size_canvasGame[0] / 2, this.size_canvasGame[1] / 2 - perButton], "black", "60px Arial", "green", [relations_buttons[0], relations_buttons[1]]);
            this.button_levi = new Button("Levi", [this.size_canvasGame[0] / 2, this.size_canvasGame[1] / 2], "black", "60px Arial", "green", [relations_buttons[0], relations_buttons[1]]);
            this.button_luiz = new Button("Luiz", [this.size_canvasGame[0] / 2, this.size_canvasGame[1] / 2 + perButton], "black", "60px Arial", "green", [relations_buttons[0], relations_buttons[1]]);
            this.button_pinheiro = new Button("Pinheiro", [this.size_canvasGame[0] / 2, this.size_canvasGame[1] / 2 + 2 * perButton], "black", "60px Arial", "green", [relations_buttons[0], relations_buttons[1]]);

            this.button_exitSettings = new Button("Exit", [this.size_canvasGame[0] / 2, this.size_canvasGame[1] / 2 + 3 * perButton], "black", "60px Arial", "green", [relations_buttons[0], relations_buttons[1]]);
        }
        this.buttons = [this.button_play, this.button_settings, this.button_restart, this.button_normal, this.button_otavio, this.button_miguel, this.button_levi, this.button_luiz, this.button_pinheiro, this.button_exitSettings];
    }

    setSettings() {
        this.minTime_createApple = 0;
        this.maxTime_createApple = 0;

        let newDirection = getRandomIntNumber(-1, 3);
        if (newDirection == -1) newDirection = 0;
        snake.direction = newDirection;

        switch (this.dificult) {
            case "Otavio":
                this.dimension = [10, 10];
                this.proportion = this.size_canvasGame[0] / this.dimension[0];

                this.frames = 2;

                this.delay_start = 10;
                this.delay_retake = 10;

                this.font_painel = "70px Arial";
                this.color_painel = "rgb(0, 44, 240)";

                this.apples = [];
                
                this.initialColor_food = [255, 0, 0];
                this.finalColor_food = [0, 0, 0];

                this.time_appleDeterioration = 8000;
                this.tics_appleDeterioration = 10;

                this.foodsToCreate = 2;
                
                this.img_food = img_food_Otavio;

                snake.size = this.proportion;
                snake.length = 3;

                snake.initialColor = [0, 100, 0];
                snake.finalColor = [0, 255, 0];

                snake.imgs = {
                    img_head: img_brotherHead_Otavio,
                    img_body: null
                }
                snake.imgs.img_head.invertLevel = 2;
                break;
            case "Normal":
                this.dimension = [12, 12];
                this.proportion = this.size_canvasGame[0] / this.dimension[0];

                this.frames = 2;

                this.delay_start = 10;
                this.delay_retake = 10;

                this.font_painel = "70px Arial";
                this.color_painel = "rgb(0, 44, 240)";

                this.apples = [];
                
                this.initialColor_food = [255, 0, 0];
                this.finalColor_food = [0, 0, 0];

                this.time_appleDeterioration = 7000;
                this.tics_appleDeterioration = 10;

                this.foodsToCreate = 2;
                
                this.img_food = null;

                snake.size = this.proportion;
                snake.length = 3;

                snake.initialColor = [0, 100, 0];
                snake.finalColor = [0, 255, 0];

                snake.imgs = {
                    img_head: null,
                    img_body: null
                }
                break;
            case "Miguel":
                this.dimension = [12, 12];
                this.proportion = this.size_canvasGame[0] / this.dimension[0];

                this.frames = 3;

                this.delay_start = 10;
                this.delay_retake = 10;

                this.font_painel = "70px Arial";
                this.color_painel = "rgb(0, 44, 240)";

                this.apples = [];
                
                this.initialColor_food = [255, 0, 0];
                this.finalColor_food = [0, 0, 0];

                this.time_appleDeterioration = 6500;
                this.tics_appleDeterioration = 10;

                this.foodsToCreate = 2;
                
                this.img_food = img_food_Miguel;

                snake.size = this.proportion;
                snake.length = 3;

                snake.initialColor = [0, 100, 0];
                snake.finalColor = [0, 255, 0];

                snake.imgs = {
                    img_head: img_brotherHead_Miguel,
                    img_body: null
                }
                snake.imgs.img_head.invertLevel = 2;
                break;
            case "Levi":
                this.dimension = [15, 15];
                this.proportion = this.size_canvasGame[0] / this.dimension[0];

                this.frames = 4;

                this.delay_start = 10;
                this.delay_retake = 10;

                this.font_painel = "70px Arial";
                this.color_painel = "rgb(0, 44, 240)";

                this.apples = [];
                
                this.initialColor_food = [255, 0, 0];
                this.finalColor_food = [0, 0, 0];

                this.time_appleDeterioration = 6000;
                this.tics_appleDeterioration = 10;

                this.foodsToCreate = 2;
                
                this.img_food = img_food_Levi;

                snake.size = this.proportion;
                snake.length = 3;

                snake.initialColor = [0, 100, 0];
                snake.finalColor = [0, 255, 0];

                snake.imgs = {
                    img_head: img_brotherHead_Levi,
                    img_body: null
                }
                snake.imgs.img_head.invertLevel = 3;
                break;
            case "Luiz":
                this.dimension = [20, 20];
                this.proportion = this.size_canvasGame[0] / this.dimension[0];

                this.frames = 5;

                this.delay_start = 10;
                this.delay_retake = 10;

                this.font_painel = "70px Arial";
                this.color_painel = "rgb(0, 44, 240)";

                this.apples = [];
                
                this.initialColor_food = [255, 0, 0];
                this.finalColor_food = [0, 0, 0];

                this.time_appleDeterioration = 5000;
                this.tics_appleDeterioration = 10;

                this.foodsToCreate = 2;
                
                this.img_food = img_food_Luiz;

                snake.size = this.proportion;
                snake.length = 1;

                snake.initialColor = [0, 100, 0];
                snake.finalColor = [0, 255, 0];

                snake.imgs = {
                    img_head: img_brotherHead_Luiz,
                    img_body: null
                }
                snake.imgs.img_head.invertLevel = 2;
                break;
            case "Pinheiro":
                this.dimension = [20, 20];
                this.proportion = this.size_canvasGame[0] / this.dimension[0];

                this.frames = 8;

                this.delay_start = 10;
                this.delay_retake = 10;

                this.font_painel = "70px Arial";
                this.color_painel = "rgb(0, 44, 240)";

                this.apples = [];
                
                this.initialColor_food = [255, 0, 0];
                this.finalColor_food = [0, 0, 0];

                this.time_appleDeterioration = 5000;
                this.tics_appleDeterioration = 10;

                this.foodsToCreate = 5;
                
                this.img_food = img_food_Pinheiro;

                snake.size = this.proportion;
                snake.length = 5;

                snake.initialColor = [0, 100, 0];
                snake.finalColor = [0, 255, 0];

                snake.imgs = {
                    img_head: img_brotherHead_Pinheiro,
                    img_body: null
                }
                snake.imgs.img_head.invertLevel = 1;
                break;

        }
        this.allSize_game = this.dimension[0] * this.dimension[1];
        this.percent_oneAppleScore = 100 / (this.allSize_game - snake.length);
        snake.setSnake();
    }

    setScreen(screen) {
        this.eraseGame();
        this.erasePainel();
        switch (screen) {
            case "ScreenInitial":
                this.display_textPainel("Snake Game", "70px Arial", "rgb(58, 136, 160)", this.size_canvasPainel[0], this.size_canvasPainel[1]);
                this.button_play.start();
                this.button_settings.start();
                break;
            case "Settings":
                this.button_exitSettings.start();
                this.button_normal.start();
                this.button_otavio.start();
                this.button_miguel.start();
                this.button_levi.start();
                this.button_luiz.start();
                this.button_pinheiro.start();
                break;
            case "Playing":
                this.display_textPainel("Search Sys3..", "70px Arial", "rgb(0, 38, 255)", this.size_canvasPainel[0], this.size_canvasPainel[1]);
                this.startGame();
                break;
            case "Pause":
                this.display_textPainel("Game Paused", "70px Arial", "rgb(255, 102, 0)", this.size_canvasPainel[0], this.size_canvasPainel[1]);
                break;
            case "GameOver":
                this.display_textPainel("Game Over", "70px Arial", "rgb(255, 102, 0)", this.size_canvasPainel[0], this.size_canvasPainel[1]);
                this.button_restart.start();
                break;
            case "WinGame":
                this.win = true;
                this.display_textPainel("Del.. Sy...", "70px Arial", "green", this.size_canvasPainel[0], this.size_canvasPainel[1]);
                this.display_textGame(`Time: ${this.time.toFixed(2)}`, "70px Arial", "green", this.size_canvasGame[0], this.size_canvasGame[1] * 0.72);
                this.display_textGame(`Score: ${this.score.toFixed(2)}`, "70px Arial", "green", this.size_canvasGame[0], this.size_canvasGame[1]);
                break;
        }
    }

    buttonClicked(name) {
        switch(name) {
            case "Play":
                this.setSettings();
                this.setScreen("Playing");
                break;
            case "Settings":
                this.setScreen("Settings");
                break;
            case "Exit":
                this.setScreen("ScreenInitial");
                break;
            case "Restart":
                this.setScreen("ScreenInitial");
                break;
            default:
                switch (name) {
                    case "Normal":
                        this.dificult = "Normal";
                        break;
                    case "Otavio":
                        this.dificult = "Otavio";
                        break;
                    case "Miguel":
                        this.dificult = "Miguel";
                        break;
                    case "Levi":
                        this.dificult = "Levi";
                        break;
                    case "Luiz":
                        this.dificult = "Luiz";
                        break;
                    case "Pinheiro":
                        this.dificult = "Pinheiro";
                        break;
                }
                this.setScreen("ScreenInitial")
        }
    }

    startVerifyPause() {
        addEventListener('keydown', this.VerifyPause);
    }
    stopVerifyPause() {
        removeEventListener('keydown', this.VerifyPause);
    }

    startGame() {
        this.setSettings();
        snake.draw();
        setTimeout(() => {
            this.paused = false;
            this.time = 0;
            this.score = 0;
            for (let i = 0; i < this.foodsToCreate; i++) this.createApple();
            this.foodsToCreate = 0;
            this.startPainel();
            this.startVerifyPause();
            snake.startVerifyMove();
            this.setFrame();
        }, this.delay_start);
        
    }
    stopGame(modeToSet) {
        for (let i of this.apples) i.justRemove();
        this.stopVerifyPause();
        this.stopPainel();
        clearTimeout(this.timeout_setFrame);
        this.setScreen(modeToSet);
    }
    retakeGame() {
        this.wating = true;
        let waitingTime = 0;
        this.interval_retakeGame = setInterval(() => {
            waitingTime += 10;
            this.eraseGame();
            this.drawCharacters();
            this.display_textGame(`${((this.delay_retake - waitingTime) / 1000).toFixed(2)}`, "60px Arial", "rgb(0, 47, 255)", game.size_canvasGame[0], game.size_canvasGame[1]);
            if (waitingTime == this.delay_retake) {
                this.wating = false;
                this.paused = false;
                this.setFrame();
                clearInterval(this.interval_retakeGame);
            }
        }, 10);
    }

    setFrame() {
        if (!this.paused) {
            if (!snake.move() && this.win == null) {
                this.eraseGame();
                this.drawCharacters();
                this.timeout_setFrame = setTimeout(() => {
                    this.setFrame();
                }, 1000 / this.frames);
            }
        } else {
            this.stopPainel();
        } //pause game 
    }
    drawCharacters() {
        snake.draw();
        for (let i of this.apples) {
            i.draw();
        }
    }

    startPainel() {
        this.interval_painel = setInterval(() => {
            this.time += 0.01;
            this.erasePainel();
            this.display_textPainel(`Time: ${this.time.toFixed(2)} Score: ${this.score.toFixed(2)}%`, "55px Arial", "rgb(241, 167, 9)", this.size_canvasPainel[0], this.size_canvasPainel[1]);
        }, 10);
    }
    stopPainel() {
        clearInterval(this.interval_painel);
    }

    createApple() {
        setTimeout(() => {
            if (this.apples.length + snake.length < this.allSize_game) {
                this.apples.push(new Food());
            }
        }, getRandomIntNumber(this.minTime_createApple, this.maxTime_createApple));
    }

    display_textPainel(text, font, color, x, y) {
        this.drawText(this.ctx_painel, text, font, color, x, y);
    }
    display_textGame(text, font, color, x, y) {
        this.drawText(this.ctx_game, text, font, color, x, y);
    }
    drawText(pen, text, font, color, x, y) {
        pen.font = font;
        pen.fillStyle = color;
        let stats = pen.measureText(text);
        let X = (x - stats.width) / 2;
        let t = stats.actualBoundingBoxAscent + stats.actualBoundingBoxDescent;
        let Y = t + (y - t) / 2;
        pen.fillText(text, X, Y);
    }

    eraseGame() {
        this.ctx_game.clearRect(0, 0, this.size_canvasGame[0], this.size_canvasGame[1]);
        for (let i of this.buttons) {
            i.stopVerifyClick();
        }
    }
    erasePainel() {
        this.ctx_painel.clearRect(0, 0, this.size_canvasPainel[0], this.size_canvasPainel[1]);
    }

    addScore() {
        this.score += this.percent_oneAppleScore;
    }
}

class Snake {
    setSnake() {
        const minX = 0.2;
        const maxX = 0.8;
        const minY = 0.2;
        const maxY = 0.8;
        this.positions = [getRandomPosition(game.size_canvasGame[0] * minX, game.size_canvasGame[0] * maxX, game.size_canvasGame[1] * minY, game.size_canvasGame[1] * maxY, game.proportion)];
        let direction_newPosition = [0, 0];
        switch (this.direction) {
            case 0:
                direction_newPosition[0] = - this.size;
                break;
            case 1:
                direction_newPosition[1] = - this.size;
                break;
            case 2:
                direction_newPosition[0] = this.size;
                break;
            case 3:
                direction_newPosition[1] = this.size;
                break;
        }
        for (let i = 1; i < this.length; i++) {
            this.positions[i] = [this.positions[this.positions.length - 1][0] + direction_newPosition[0], this.positions[this.positions.length - 1][1] + direction_newPosition[1]]
        }
        this.color = [this.initialColor[0], this.initialColor[1], this.initialColor[2]];
        this.diference_color = [
            this.finalColor[0] - this.initialColor[0],
            this.finalColor[1] - this.initialColor[1],
            this.finalColor[2] - this.initialColor[2],
        ]
        this.VerifyMove = (event) => {
            if (this.readyToMove) {
                switch (event.key.toLowerCase()) {
                    case "arrowright":
                    case "d":
                        if (this.direction != 2) {
                            this.direction = 0;
                        }
                        break;
                    case "arrowdown":
                    case "s":
                        if (this.direction != 3) {
                            this.direction = 1;
                        }
                        break;
                    case "arrowleft":
                    case "a":
                        if (this.direction != 0) {
                            this.direction = 2;
                        }
                        break;
                    case "arrowup":
                    case "w":
                        if (this.direction != 1) {
                            this.direction = 3;
                        }
                        break;
                }
                this.readyToMove = false;
            }
        }
        this.readyToMove = true;
    }

    move() {
        let newPosition = [this.positions[0][0], this.positions[0][1]];
        switch (this.direction) {
            case 0:
                newPosition[0] += this.size;
                break;
            case 1:
                newPosition[1] += this.size;
                break;
            case 2:
                newPosition[0] -= this.size;
                break;
            case 3:
                newPosition[1] -= this.size;
                break;
        }
        this.positions.unshift(newPosition);
        this.readyToMove = true;
        let appleColided = game.apples.find(apple => apple.position[0] == this.positions[0][0] && apple.position[1] == this.positions[0][1]);
        if (appleColided) {
            game.addScore();
            appleColided.remove();
            this.length++;
            if (this.length == game.allSize_game) {
                game.stopGame("WinGame");
                return;
            }
        } else {
            this.positions.pop();
        }
        if (
            (this.positions.filter((position, index) => index != 0).some(position => position[0] == this.positions[0][0] && position[1] == this.positions[0][1])) || verifyColliWall(this.positions[0])
        ) {
            game.stopGame("GameOver");
            return true;
        }
    }
    draw() {
        this.color[0] = this.initialColor[0];
        this.color[1] = this.initialColor[1];
        this.color[2] = this.initialColor[2];

        game.ctx_game.fillStyle = `rgb(${this.color[0]}, ${this.color[1]}, ${this.color[2]})`;
        game.ctx_game.fillRect(this.positions[0][0], this.positions[0][1], this.size, this.size);
        
        if (this.imgs.img_body) {
            for (let i = 1; i < this.length; i++) {
                game.ctx_game.drawImage(this.imgs.img_body, this.positions[i][0], this.positions[i][1], this.size, this.size);
            }
        } else {
            for (let i = 1; i < this.length; i++) {
                this.color[0] += this.diference_color[0] / (this.length - 1);
                this.color[1] += this.diference_color[1] / (this.length - 1);
                this.color[2] += this.diference_color[2] / (this.length - 1);
                game.ctx_game.fillStyle = `rgb(${this.color[0]}, ${this.color[1]}, ${this.color[2]})`;
                game.ctx_game.fillRect(this.positions[i][0], this.positions[i][1], this.size, this.size);
            }
        }
        if (this.imgs.img_head) {
            let centerX = this.positions[0][0] + this.size / 2;
            let centerY = this.positions[0][1] + this.size / 2;
            game.ctx_game.save();
            game.ctx_game.translate(centerX, centerY);
            game.ctx_game.rotate(Math.PI * (this.direction + 1 + this.imgs.img_head.invertLevel) / 2);
            game.ctx_game.drawImage(this.imgs.img_head, -this.size / 2, -this.size / 2, this.size, this.size);
            game.ctx_game.restore();
        }
    }

    startVerifyMove() {
        addEventListener("keydown", this.VerifyMove);
    }
    stopVerifyMove() {
        removeEventListener("keydown", this.VerifyMove);
    }
}

class Button {
    constructor(name, position, color_background, font_text, color_text, relations=[1.1, 1.15]) {
        this.name = name;
        this.font_text = font_text;
        this.color_text = color_text;
        this.color_background = color_background;

        game.ctx_game.font = this.font_text;
        this.stats = game.ctx_game.measureText(this.name);
        this.scale = [
            this.stats.width * relations[0],
            (this.stats.actualBoundingBoxAscent + this.stats.actualBoundingBoxDescent) * relations[1]
        ];
        this.position = [position[0] - this.scale[0] / 2, position[1] - this.scale[1] / 2];
        this.x = this.position[0] + (this.scale[0] - this.stats.width) / 2;
        this.y = this.position[1] + ((relations[1] - 1) / 2) + this.stats.actualBoundingBoxAscent +
        (this.scale[1] - (this.stats.actualBoundingBoxAscent + (this.stats.actualBoundingBoxDescent * 0.7))) / 2;

        if (this.stats.actualBoundingBoxDescent == 0) {
            let size_font = parseInt(this.font_text[0] + this.font_text[1]);
            this.y += size_font / 10;
            this.scale[1] += size_font / 5;
        }
        this.VerifyClick = (event) => {
            if (
                event.offsetX >= this.position[0] &&
                event.offsetY >= this.position[1] &&
                event.offsetX <= this.position[0] + this.scale[0] &&
                event.offsetY <= this.position[1] + this.scale[1]
            ) {
                this.stopVerifyClick();
                game.buttonClicked(this.name);
            }
        }
    }

    start() {
        this.draw();
        this.startVerifyClick();
    }
    
    startVerifyClick() {
        addEventListener('click', this.VerifyClick);
    }
    stopVerifyClick() {
        removeEventListener('click', this.VerifyClick);
    }
    
    draw() {
        //a fazer logica de arredondamento de canto
        game.ctx_game.fillStyle = this.color_background;
        game.ctx_game.fillRect(this.position[0], this.position[1], this.scale[0], this.scale[1]);

        game.ctx_game.fillStyle = this.color_text;
        game.ctx_game.fillText(this.name, this.x, this.y);
    }
}

class Food {
    constructor() {
        do {
            this.position = getRandomPosition(0, game.size_canvasGame[0] - game.proportion, 0, game.size_canvasGame[1] - game.proportion, game.proportion);
        } while(
            (snake.positions.some(position => position[0] == this.position[0] && position[1] == this.position[1]) ||
            game.apples.some(apple => apple.position[0] == this.position[0] && apple.position[1] == this.position[1]))
        )
        this.size = game.proportion;
        this.color = [game.initialColor_food[0], game.initialColor_food[1], game.initialColor_food[2]];
        this.diference_color = [
            game.finalColor_food[0] - this.color[0],
            game.finalColor_food[1] - this.color[1],
            game.finalColor_food[2] - this.color[2]
        ]
        this.interval_deterioration = setInterval(() => {
            if (!game.paused) {
                this.color[0] += this.diference_color[0] / game.tics_appleDeterioration;
                this.color[1] += this.diference_color[1] / game.tics_appleDeterioration;
                this.color[2] += this.diference_color[2] / game.tics_appleDeterioration;
                if (this.color[0] <= 0 && this.color[1] <= 0 && this.color[2] <= 0) this.remove();
            }
        }, game.time_appleDeterioration / game.tics_appleDeterioration);
    }
    draw() {
        if (game.img_food) {
            game.ctx_game.drawImage(game.img_food, this.position[0], this.position[1], this.size, this.size);
        } else {
            game.ctx_game.fillStyle = `rgb(${this.color[0]}, ${this.color[1]}, ${this.color[2]})`;
            game.ctx_game.fillRect(this.position[0], this.position[1], this.size, this.size);
        }
        
    }
    remove() {
        if (game.apples.includes(this)) {
            game.apples.splice(game.apples.indexOf(this), 1);
            game.createApple();
        }
    }
    justRemove() {
        game.apples.splice(game.apples.indexOf(this), 1);
    }
}


let body = document.getElementsByTagName("body")[0];

let img_brotherHead_Otavio = new Image();
img_brotherHead_Otavio.src = "imgs/brothers/head/otavio.png";

let img_brotherHead_Miguel = new Image();
img_brotherHead_Miguel.src = "imgs/brothers/head/miguel.png";

let img_brotherHead_Levi = new Image();
img_brotherHead_Levi.src = "imgs/brothers/head/levi.png";

let img_brotherHead_Luiz = new Image();
img_brotherHead_Luiz.src = "imgs/brothers/head/luiz.png";

let img_brotherHead_Pinheiro = new Image();
img_brotherHead_Pinheiro.src = "imgs/brothers/head/pinheiro.png";


// let img_brotherBody_Otavio = new Image();
// img_brotherBody_Otavio.src = "imgs/brothers/body/otavio.png";

let img_food_Otavio = new Image();
img_food_Otavio.src = "imgs/foods/otavio.png";

let img_food_Miguel = new Image();
img_food_Miguel.src = "imgs/foods/miguel.png";

let img_food_Levi = new Image();
img_food_Levi.src = "imgs/foods/levi.png";

let img_food_Luiz = new Image();
img_food_Luiz.src = "imgs/foods/luiz.png";

let img_food_Pinheiro = new Image();
img_food_Pinheiro.src = "imgs/foods/pinheiro.png";


let game = new Game(750, 750, 0.11, "gray", "gray");
let snake = new Snake();

game.setButton([1.2, 1.3]);

game.setScreen("ScreenInitial");

function getRandomPosition(minX, maxX, minY, maxY, interval) {
    let x = Math.round((Math.random() * (maxX - minX) + minX) / interval) * interval;
    let y = Math.round((Math.random() * (maxY - minY) + minY) / interval) * interval;
    return [x, y]
}

function getRandomIntNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function setColor_site(button) {
    if (button.textContent == "Light Mode") {
        button.textContent = "Dark Mode";
        body.style.backgroundColor = "white";
    } else {
        button.textContent = "Light Mode";
        body.style.backgroundColor = "black";
    }
}

function verifyColliWall(position) {
    if (
        position[0] < 0 ||
        position[0] > game.size_canvasGame[0] - game.proportion ||
        position[1] < 0 ||
        position[1] > game.size_canvasGame[1] - game.proportion
    ) return true;
}