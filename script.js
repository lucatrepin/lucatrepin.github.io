class Game {
    constructor() {

        {
            this.canvas_game = document.getElementById("canvasGame");
            this.canvas_painel = document.getElementById("canvasPainel");
            this.ctx_game = this.canvas_game.getContext("2d");
            this.ctx_painel = this.canvas_painel.getContext("2d");
        } //referencias

        {
        this.dimensions_game = [5, 5];
        this.dimensions_painel = [this.dimensions_game[0], this.dimensions_game[1] / 8];

        this.proportion = 100;

        this.sizes_painel = [this.dimensions_painel[0] * this.proportion, this.dimensions_painel[1] * this.proportion];
        this.sizes_game = [this.dimensions_game[0] * this.proportion, this.dimensions_game[1] * this.proportion];
        this.sizes_button = [100, 30];

        this.frames = 2;
        
        this.font_textPainel = "47px Arial";
        this.color_textPainel = "#4800f0";
        } //configuraveis
        
        {
            this.canvas_game.style.backgroundColor = "gray";
            this.canvas_painel.style.backgroundColor = "gray";
            this.canvas_game.style.width = `${this.dimensions_game[0] * this.proportion}px`;
            this.canvas_game.style.height = `${this.dimensions_game[1] * this.proportion}px`;
            this.canvas_painel.style.width = `${this.dimensions_painel[0] * this.proportion}px`;
            this.canvas_painel.style.height = `${this.dimensions_painel[1] * this.proportion}px`;
            this.canvas_game.width = this.dimensions_game[0] * this.proportion;
            this.canvas_game.height = this.dimensions_game[1] * this.proportion;
            this.canvas_painel.width = this.dimensions_painel[0] * this.proportion;
            this.canvas_painel.height = this.dimensions_painel[1] * this.proportion;

            this.ctx_painel.textAlign = "center";
            this.ctx_painel.textBaseline = "center";
        } // set de dados
    }

    setScreen(stats) {
        this.ctx_game.clearRect(0, 0, this.sizes_game[0], this.sizes_game[1]);
        switch (stats) {
            case "screenInitial":
                this.setPainel("Snake Game")
                this.button_play.start();
                break;
            case "playing":
                snake.draw();
                this.setPainel("Hackeando PC...");
                setTimeout(() => {
                    this.startGame();
                }, 1000);
                break;
        }
    }
    startGame() {
        this.time = 0;
        this.score = 0;
        this.apples = [];
        this.applesToCreate = 1;
        snake.startVerifyMove();
        this.startTimer();
        this.startPainel();
        this.startFrames();
    }
    startFrames() {
        this.setFrame();
    }
    setFrame() {
        ç(snake.positions.length);
        setTimeout(() => {
            this.ctx_game.clearRect(0, 0, this.sizes_game[0], this.sizes_game[1]);
            this.apples.forEach(apple => {
                apple.draw();
            });
            snake.move();
            snake.draw();
            while (this.applesToCreate > 0) {
                this.applesToCreate--;
                this.createApple();
            }
            this.setFrame();
        }, 1000 / this.frames);
    }
    startTimer() {
        setInterval(() => {
            this.time += 0.01;
        }, 10);
    }
    
    createApple() {
        setTimeout(() => {
            this.apples.push(new Apple());
        }, getRandomNumber(100, 1000));
    }

    startPainel() {
        setInterval(() => {
            this.setPainel();
        }, 10);
    }
    setPainel(text) {
        this.ctx_painel.clearRect(0, 0, this.sizes_painel[0], this.sizes_painel[1]);
        let text_painel;
        if (text) {
            text_painel = text;
        } else {
            text_painel = this.getText_painel();
        }
        this.ctx_painel.font = this.font_textPainel;
        this.ctx_painel.fillStyle = this.color_textPainel;
        let stats_text = this.ctx_painel.measureText(text_painel);
        let size_text = stats_text.actualBoundingBoxAscent + stats_text.actualBoundingBoxDescent;
        this.positions_textPainel = [this.sizes_painel[0] / 2, size_text + ((this.sizes_painel[1] - size_text) / 2)];
        this.ctx_painel.fillText(text_painel, this.positions_textPainel[0], this.positions_textPainel[1]);
    }
    getText_painel() {
        return `Time: ${this.time.toFixed(2)} Score: ${this.score}`;
    }

    createButtons() {
        this.button_play = new Button("Play", "black", "25px Arial", "green", [(this.sizes_game[0] / 2) - (this.sizes_button[0] / 2), (this.sizes_game[1] / 2) - (this.sizes_button[1] / 2)], this.sizes_button);
    }
    buttonClicked(name) {
        switch (name) {
            case "Play":
                this.setScreen("playing");
                break;
        }
    }
}

class Button {
    constructor(name, backColor, textFont, textColor, positions, sizes) {
        this.name = name;
        this.backColor = backColor;
        this.textFont = textFont;
        this.textColor = textColor;
        this.positions = positions;
        this.sizes = sizes;
    }
    draw() {
        game.ctx_game.fillStyle = this.backColor;
        game.ctx_game.fillRect(this.positions[0], this.positions[1], this.sizes[0], this.sizes[1]);

        game.ctx_game.font = this.textFont;
        game.ctx_game.fillStyle = this.textColor;
        let statsText = game.ctx_game.measureText(this.name);
        game.ctx_game.fillText(this.name, this.positions[0] + (statsText.width / 2), this.positions[1] + statsText.actualBoundingBoxAscent + statsText.actualBoundingBoxDescent);
    }
    startCheckClick() {
        addEventListener("click", (event) => {
            if (
                event.offsetX >= this.positions[0] &&
                event.offsetX <= this.positions[0] + this.sizes[0] &&
                event.offsetY >= this.positions[1] &&
                event.offsetY <= this.positions[1] + this.sizes[1]
            ) {
                this.stopCheckClick();
                game.buttonClicked(this.name);
            }
        })
    }
    stopCheckClick() {
        removeEventListener("click", (event) => {
            if (
                event.offsetX >= this.positions[0] &&
                event.offsetX <= this.positions[0] + this.sizes[0] &&
                event.offsetY >= this.positions[1] &&
                event.offsetY <= this.positions[1] + this.sizes[1]
            ) {
                this.stopCheckClick();
                game.buttonClicked(this.name);
            }
        })
    }
    start() {
        this.draw();
        this.startCheckClick();
    }
}

class Snake {
    constructor(length, positionInitial) {
        this.size = game.proportion;
        this.direction = "up";

        this.headPosition = [getRoundNumber_interval(positionInitial[0] - this.size, this.size), getRoundNumber_interval(positionInitial[1] - this.size, this.size)];

        let index_diference_length_AND_gameDimensions = this.direction == "left" || this.direction == "right" ? 0 : 1;
        {

        while ((this.headPosition[index_diference_length_AND_gameDimensions] + ((length) * this.size)) >= game.sizes_game[index_diference_length_AND_gameDimensions]) {
        this.headPosition[index_diference_length_AND_gameDimensions] -= this.size;
        } //reajusta a position da headSnake

        this.positions = [this.headPosition];

        for (let i = 1; i < length; i++) {
            let newPosition = [this.positions[0][0], this.positions[0][1]];
            newPosition[index_diference_length_AND_gameDimensions] += i*this.size;
            this.positions.push(newPosition);
        } //cria o body (menos a head da snake)
        } //set body
    }

    draw() {
        game.ctx_game.fillStyle = "green";
        this.positions.forEach(position => {
            game.ctx_game.fillRect(position[0], position[1], this.size, this.size);
        });
    }
    move() {
        let newPosition = [this.positions[0][0], this.positions[0][1]];
        switch (this.direction) {
            case "right":
                newPosition[0] += this.size;
                break;
            case "down":
                newPosition[1] += this.size;
                break;
            case "left":
                newPosition[0] -= this.size;
                break;
            case "up":
                newPosition[1] -= this.size;
                break;
        }
        this.readyToMove = true;
        this.positions.unshift(newPosition);
        if (this.colliWall()) {
            alert("bateu na parede");
        }
        if (!this.colliApple()) {
            this.positions.pop();
        } else {
            score += 10;
            this.colliApple().remove();
        }
    }
    colliApple() {
        return game.apples.find(apple => apple.position[0] == this.positions[0][0] && apple.position[1] == this.positions[0][1]);
    }
    colliWall() {
        if (
            this.positions[0][0] == -this.size ||
            this.positions[0][0] == game.sizes_game[0] ||
            this.positions[0][1] == -this.size ||
            this.positions[0][1] == game.sizes_game[1]
        ) {
            return true;
        } else {
            return false;
        }
    }

    startVerifyMove() {
        this.readyToMove = true;
        addEventListener('keydown', (event) => {
            if (this.readyToMove == true) {
                switch (event.key.toLowerCase()) {
                    case "arrowright":
                    case "d":
                        if (this.direction != "left") this.direction = "right";
                        break;
                    case "arrowdown":
                    case "s":
                        if (this.direction != "up") this.direction = "down";
                        break;
                    case "arrowleft":
                    case "a":
                        if (this.direction != "right") this.direction = "left";
                        break;
                    case "arrowup":
                    case "w":
                        if (this.direction != "down") this.direction = "up";
                        break;
                    default:
                        return;
                }
                this.readyToMove = false;
            }
        })
    }

}

class Apple {
    constructor() {
        this.color = "red";
        this.size = game.proportion;
        do {
            this.position = [
            getRoundNumber_interval(getRandomNumber(0, game.sizes_game[0] - this.size), this.size),
            getRoundNumber_interval(getRandomNumber(0, game.sizes_game[1] - this.size), this.size)
            ]
        } while (snake.positions.some(position => position[0] === this.position[0] && position[1] === this.position[1]))
    }
    draw() {
        game.ctx_game.fillStyle = this.color;
        game.ctx_game.fillRect(this.position[0], this.position[1], this.size, this.size);
    }
    remove() {
        game.applesToCreate++;
        game.apples.splice(game.apples.indexOf(this), 1);
    }
}


function getRoundNumber_interval(n, interval) {
    return Math.round(n / interval) * interval;
}

function getRandomNumber(min, max) {
    return (Math.random() * (max - min) + min);
}

let ç = (text) => console.log(text);

let game = new Game();
let snake = new Snake(3, [game.sizes_game[0] / 2, game.sizes_game[1] / 2]);
game.createButtons();
game.setScreen("screenInitial");

