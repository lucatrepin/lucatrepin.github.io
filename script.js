

class Button {
    constructor(name, backColor, textFont, textColor, positions, sizes) {
        this.name = name;
        this.backColor = backColor;
        this.textFont = textFont;
        this.textColor = textColor;
        this.positions = positions;
        this.sizes = sizes;

        this.verifyClick = (event) => {
            if (
                event.offsetX >= this.positions[0] &&
                event.offsetX <= this.positions[0] + this.sizes[0] &&
                event.offsetY >= this.positions[1] &&
                event.offsetY <= this.positions[1] + this.sizes[1]
            ) {
                game.buttonClicked(this.name);
                this.stopCheckClick();
            }
        }
    }
    draw() {
        game.ctx_game.fillStyle = this.backColor;
        game.ctx_game.fillRect(this.positions[0], this.positions[1], this.sizes[0], this.sizes[1]);

        game.ctx_game.font = this.textFont;
        game.ctx_game.fillStyle = this.textColor;
        let statsText = game.ctx_game.measureText(this.name);
        let Y = statsText.actualBoundingBoxDescent;
        if (Y == 0) Y = statsText.actualBoundingBoxAscent * 0.3;
        game.ctx_game.fillText(this.name, this.positions[0] + ((game.sizes_button[0] - statsText.width) / 2), this.positions[1] + statsText.actualBoundingBoxAscent + Y);
    }

    startCheckClick() {
        addEventListener("click", this.verifyClick);
    }
    stopCheckClick() {
        removeEventListener("click", this.verifyClick);
    }

    start() {
        this.draw();
        this.startCheckClick();
    }
}
class Game {
    constructor() {

        {
            this.canvas_game = document.getElementById("canvasGame");
            this.canvas_painel = document.getElementById("canvasPainel");
            this.ctx_game = this.canvas_game.getContext("2d");
            this.ctx_painel = this.canvas_painel.getContext("2d");
        } //referencias

        {
            this.sizes_game = [500, 500];
            this.sizes_painel = [500, 500];
            
            this.proportion = 25;

            this.dimensions_game = [this.sizes_game[0] / this.proportion, this.sizes_game[1] / this.proportion];
            this.dimensions_painel = [this.dimensions_game[0], this.dimensions_game[1] / 8];

            this.frames = 10;

            this.sizes_button = [100, 30];
            this.margin_button = 10;
            
            this.font_textPainel = "47px Arial";
            this.color_textPainel = "#4800f0";

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

        } // cofigs base
        this.dificult = "normal";
    }

    load() {
        this.createButtons();
        this.setScreen("screenInitial");
    }
    changeSettings() { //colocar posteriormente só o set de vars configuraveis
        //colocar posteriormente só o set de vars configuraveis
        this.time = 0;
        this.score = 0;
        this.foods = [];
        this.foodsToCreate = 1;
        switch (this.dificult) {
            case "otavio":
                this.sizes_game = [500, 500];
                this.sizes_painel = [500, 500];
                
                this.proportion = 50;

                this.dimensions_game = [this.sizes_game[0] / this.proportion, this.sizes_game[1] / this.proportion];
                this.dimensions_painel = [this.dimensions_game[0], this.dimensions_game[1] / 8];

                this.frames = 2;

                snake.size = game.proportion;
                snake.img_head = img_BrotherOtavio;
                snake.headColor = [0, 180, 0];
                snake.tailColor = [0, 255, 0];
                snake.diference_colors = [
                    snake.tailColor[0] - snake.headColor[0],
                    snake.tailColor[1] - snake.headColor[1],
                    snake.tailColor[2] - snake.headColor[2]
                ];
                this.time_deterioration = 7000;
                this.tics_deterioration = 20;

                this.img_food = img_FoodOtavio;
                this.initialColor_food = [255, 0, 0];
                this.finalColor_food = [0, 0, 0];

                break;
            case "levi":
                this.sizes_game = [500, 500];
                this.sizes_painel = [500, 500];
                
                this.proportion = 50;

                this.dimensions_game = [this.sizes_game[0] / this.proportion, this.sizes_game[1] / this.proportion];
                this.dimensions_painel = [this.dimensions_game[0], this.dimensions_game[1] / 8];

                this.frames = 2;

                snake.size = game.proportion;
                snake.img_head = img_BrotherOtavio;
                snake.headColor = [0, 180, 0];
                snake.tailColor = [0, 255, 0];
                snake.diference_colors = [
                    snake.tailColor[0] - snake.headColor[0],
                    snake.tailColor[1] - snake.headColor[1],
                    snake.tailColor[2] - snake.headColor[2]
                ];
                this.time_deterioration = 7000;
                this.tics_deterioration = 20;

                this.img_food = img_BrotherMiguel;
                this.initialColor_food = [255, 0, 0];
                this.finalColor_food = [0, 0, 0];

                break;
            case "normal":
                this.dimensions_game = [20, 20];
                this.dimensions_painel = [this.dimensions_game[0], this.dimensions_game[1] / 8];

                this.proportion = 25;

                this.frames = 2;
                
                this.sizes_painel = [this.dimensions_painel[0] * this.proportion, this.dimensions_painel[1] * this.proportion];
                this.sizes_game = [this.dimensions_game[0] * this.proportion, this.dimensions_game[1] * this.proportion];
                this.sizes_button = [100, 30];

                snake.img_head = null;
                snake.headColor = [0, 180, 0];
                snake.tailColor = [0, 255, 0];
                snake.diference_colors = [
                    snake.tailColor[0] - snake.headColor[0],
                    snake.tailColor[1] - snake.headColor[1],
                    snake.tailColor[2] - snake.headColor[2]
                ];
                this.time_deterioration = 7000;
                this.tics_deterioration = 20;

                this.img_food = null;
                this.initialColor_food = [255, 0, 0];
                this.finalColor_food = [0, 0, 0];
                break;
            case "miguel":
                this.sizes_game = [500, 500];
                this.sizes_painel = [500, 500];
                
                this.proportion = 50;

                this.dimensions_game = [this.sizes_game[0] / this.proportion, this.sizes_game[1] / this.proportion];
                this.dimensions_painel = [this.dimensions_game[0], this.dimensions_game[1] / 8];

                this.frames = 2;

                snake.size = game.proportion;
                snake.img_head = img_BrotherMiguel;
                snake.headColor = [0, 180, 0];
                snake.tailColor = [0, 255, 0];
                snake.diference_colors = [
                    snake.tailColor[0] - snake.headColor[0],
                    snake.tailColor[1] - snake.headColor[1],
                    snake.tailColor[2] - snake.headColor[2]
                ];
                this.time_deterioration = 7000;
                this.tics_deterioration = 20;

                this.img_food = img_FoodMiguel;
                this.initialColor_food = [255, 0, 0];
                this.finalColor_food = [0, 0, 0];

                break;
            case "luiz":
                
                break;
            case "pinheiro":
                
                break;
        }
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
        this.eraseScreen_game();
        switch (stats) {
            case "screenInitial":
                this.setPainel("Snake Game")
                this.button_play.start();
                this.button_settings.start();
                break;
            case "playing":
                this.startGame();
                break;
            case "settings":
                this.buttonMode_otavio.start();
                this.buttonMode_levi.start();
                this.buttonMode_normal.start();
                this.buttonMode_miguel.start();
                this.buttonMode_luiz.start();
                this.buttonMode_pinheiro.start();
                break;
        }
    }
    startGame() {
        this.changeSettings();
        snake.changeSettings(3, [game.sizes_game[0] / 2, game.sizes_game[1] / 2])
        this.setPainel("Hackeando PC...");

        snake.draw();

        setTimeout(() => {
            snake.startVerifyMove();
            this.startTimer();
            this.startPainel();
            this.startFrames();
        }, 1000);
        
    }
    startFrames() {
        this.setFrame();
    }
    setFrame() {
        setTimeout(() => {
            this.ctx_game.clearRect(0, 0, this.sizes_game[0], this.sizes_game[1]);
            this.foods.forEach(food => {
                food.draw();
            });
            snake.move();
            snake.draw();
            while (this.foodsToCreate > 0) {
                this.foodsToCreate--;
                this.createFood();
            }
            this.setFrame();
        }, 1000 / this.frames);
    }
    startTimer() {
        setInterval(() => {
            this.time += 0.01;
        }, 10);
    }
    
    createFood() {
        setTimeout(() => {
            this.foods.push(new Food());
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
        this.button_play = new Button("Play", "black", "25px Arial", "green",
        [(this.sizes_game[0] / 2) - (this.sizes_button[0] / 2), (this.sizes_game[1] / 2) - (this.sizes_button[1] / 2)], this.sizes_button);
        this.button_settings = new Button("Settings", "black", "25px Arial", "green",
        [(this.sizes_game[0] / 2) - (this.sizes_button[0] / 2), (this.sizes_game[1] / 2) - (this.sizes_button[1] / 2) + this.margin_button + this.sizes_button[1]], this.sizes_button);
        this.button_restart = new Button("Restart", "black", "25px Arial", "green",
        [(this.sizes_game[0] / 2) - (this.sizes_button[0] / 2), (this.sizes_game[1] / 2) - (this.sizes_button[1] / 2)], this.sizes_button);

        this.buttonMode_otavio = new Button("Otavio", "black", "25px Arial", "green",
        [(this.sizes_game[0] / 2) - (this.sizes_button[0] / 2), (this.sizes_game[1] / 2) - (this.sizes_button[1] / 2) - (2.5* (this.margin_button + this.sizes_button[1]))], this.sizes_button);
        this.buttonMode_levi = new Button("Levi", "black", "25px Arial", "green",
        [(this.sizes_game[0] / 2) - (this.sizes_button[0] / 2), (this.sizes_game[1] / 2) - (this.sizes_button[1] / 2) - (1.5* (this.margin_button + this.sizes_button[1]))], this.sizes_button);
        this.buttonMode_normal = new Button("Normal", "black", "25px Arial", "green",
        [(this.sizes_game[0] / 2) - (this.sizes_button[0] / 2), (this.sizes_game[1] / 2) - (this.sizes_button[1] / 2) - (0.5* (this.margin_button + this.sizes_button[1]))], this.sizes_button);
        this.buttonMode_miguel = new Button("Miguel", "black", "25px Arial", "green",
        [(this.sizes_game[0] / 2) - (this.sizes_button[0] / 2), (this.sizes_game[1] / 2) - (this.sizes_button[1] / 2) + (0.5* (this.margin_button + this.sizes_button[1]))], this.sizes_button);
        this.buttonMode_luiz = new Button("Luiz", "black", "25px Arial", "green",
        [(this.sizes_game[0] / 2) - (this.sizes_button[0] / 2), (this.sizes_game[1] / 2) - (this.sizes_button[1] / 2) + (1.5* (this.margin_button + this.sizes_button[1]))], this.sizes_button);
        this.buttonMode_pinheiro = new Button("Pinheiro", "black", "25px Arial", "green",
        [(this.sizes_game[0] / 2) - (this.sizes_button[0] / 2), (this.sizes_game[1] / 2) - (this.sizes_button[1] / 2) + (2.5* (this.margin_button + this.sizes_button[1]))], this.sizes_button);
        this.buttons = [this.button_play, this.button_settings, this.button_restart, this.buttonMode_otavio, this.buttonMode_levi,
            this.buttonMode_normal, this.buttonMode_miguel, this.buttonMode_luiz, this.buttonMode_pinheiro
        ]
    }
    eraseScreen_game() {
        this.ctx_game.clearRect(0, 0, this.sizes_game[0], this.sizes_game[1]);
        this.buttons.forEach(button => {
            button.stopCheckClick();
        });
    }
    buttonClicked(name) {
        switch (name) {
            case "Play":
                this.button_play.stopCheckClick();
                this.setScreen("playing");
                break;
            case "Settings":
                game.ctx_game.clearRect(0, 0, this.sizes_game[0], this.sizes_game[1]);
                this.setScreen("settings");
                break;
            case "Otavio":
                ç("easy");
                this.dificult = "easy";
                this.setScreen("screenInitial");
                break;
            case "Levi":
                ç("false");
                this.dificult = "false";
                this.setScreen("screenInitial");
                break;
            case "Normal":
                ç("normal");
                this.dificult = "normal";
                this.setScreen("screenInitial");
                break;
            case "Miguel":
                ç("anormal");
                this.dificult = "anormal";
                this.setScreen("screenInitial");
                break;
            case "Luiz":
                ç("veryHard");
                this.dificult = "veryHard";
                this.setScreen("screenInitial");
                break;
            case "Pinheiro":
                ç("developerMode");
                this.dificult = "developerMode";
                this.setScreen("screenInitial");
                break;
        }
    }
}
class Snake {
    changeSettings(length, positionInitial) {
        this.size = game.proportion;
        this.direction = "up";
        this.length = length;
        this.img_head;
        this.color = [];

        {

        this.headPosition = [getRoundNumber_interval(positionInitial[0] - this.size, this.size), getRoundNumber_interval(positionInitial[1] - this.size, this.size)];
        let index_diference_length_AND_gameDimensions = this.direction == "left" || this.direction == "right" ? 0 : 1;

        while ((this.headPosition[index_diference_length_AND_gameDimensions] + ((length) * this.size)) >= game.sizes_game[index_diference_length_AND_gameDimensions]) {
        this.headPosition[index_diference_length_AND_gameDimensions] -= this.size;
        } //reajusta a position da headSnake

        this.positions = [this.headPosition];

        for (let i = 1; i < length; i++) {
            let newPosition = [this.positions[0][0], this.positions[0][1]];
            newPosition[index_diference_length_AND_gameDimensions] += i*this.size;
            this.positions.push(newPosition);
        } //seta o body (menos a head da snake)

        } // criacao e reajuste de posicao de snake
    }

    draw() {
        this.color[0] = this.headColor[0];
        this.color[1] = this.headColor[1];
        this.color[2] = this.headColor[2];
        game.ctx_game.fillStyle = `rgb(${this.color[0]}, ${this.color[1]}, ${this.color[2]})`;
        if (this.img_head == null) {
            game.ctx_game.fillRect(this.positions[0][0], this.positions[0][1], this.size, this.size);
        } else {
            this.drawImage();
        }
        for (let i = 1; i < this.length; i++) {
            this.color[0] += parseInt((this.diference_colors[0] / (this.length)).toFixed());
            this.color[1] += parseInt((this.diference_colors[1] / (this.length)).toFixed());
            this.color[2] += parseInt((this.diference_colors[2] / (this.length)).toFixed());
            game.ctx_game.fillStyle = `rgb(${this.color[0]}, ${this.color[1]}, ${this.color[2]})`;
            game.ctx_game.fillRect(this.positions[i][0], this.positions[i][1], this.size, this.size);
        }
    }
    drawImage() {
        let rotation;
        switch (this.direction) {
            case "right":
                rotation = 1;
                break;
            case "down":
                rotation = 2;
                break;
            case "left":
                rotation = 3;
                break;
            case "up":
                rotation = 0;
                break;
        }
        game.ctx_game.save();
        game.ctx_game.translate(this.positions[0][0] + (this.size / 2), this.positions[0][1] + (this.size / 2));
        game.ctx_game.rotate(Math.PI / 2 * rotation);
        game.ctx_game.drawImage(this.img_head, -(this.size / 2), -(this.size / 2), this.size, this.size);
        game.ctx_game.restore();
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
        if (this.positions.some((position, index) => index != 0 && position[0] == this.positions[0][0] && position[1] == this.positions[0][1])) {
            ç("bati em min");
        }
        if (this.colliWall()) {
            ç("bateu na parede");
        }
        if (!this.colliFood()) {
            this.positions.pop();
        } else {
            console.log("colidio com comida");
            this.length++;
            game.score += 10;
            game.foodsToCreate++;
            this.colliFood().remove();
        }
    }
    colliFood() {
        return game.foods.find(food => food.position[0] == this.positions[0][0] && food.position[1] == this.positions[0][1]);
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

class Food {
    constructor() {
        this.color = [game.initialColor_food[0], game.initialColor_food[1], game.initialColor_food[2]];
        this.size = game.proportion;
        this.img = game.img_food;

        do {
            this.position = [
            getRoundNumber_interval(getRandomNumber(0, game.sizes_game[0] - this.size), this.size),
            getRoundNumber_interval(getRandomNumber(0, game.sizes_game[1] - this.size), this.size)
            ]
        } while (snake.positions.some(position => position[0] === this.position[0] && position[1] === this.position[1]))

        let diference_colors = [
            game.finalColor_food[0] - game.initialColor_food[0],
            game.finalColor_food[1] - game.initialColor_food[1],
            game.finalColor_food[2] - game.initialColor_food[2],
        ]
        
        let interval_deterioration = setInterval(() => {
            if (
                this.color[0] == game.finalColor_food[0] &&
                this.color[1] == game.finalColor_food[1] &&
                this.color[2] == game.finalColor_food[2]
            ) {
                if (game.foods.includes(this)) {
                    game.foodsToCreate++;
                    this.remove();
                }
                clearInterval(interval_deterioration);
            } else {
                this.color[0] += diference_colors[0] / game.tics_deterioration;
                this.color[1] += diference_colors[1] / game.tics_deterioration;
                this.color[2] += diference_colors[2] / game.tics_deterioration;
            }
        }, game.time_deterioration / game.tics_deterioration); // terminar logica de apodrecimeento e checar
    }
    draw() {
        if (this.img == null) {
            game.ctx_game.fillStyle = `rgb(${this.color[0]}, ${this.color[1]}, ${this.color[2]})`;
            game.ctx_game.fillRect(this.position[0], this.position[1], this.size, this.size);
            //this.color = setColorRGB(this.color, [0, 100, 0]);
        } else {
            this.drawImage();
        }
        
    }
    drawImage() {
        game.ctx_game.drawImage(this.img, this.position[0], this.position[1], this.size, this.size);
    }
    remove() {
        game.foods.splice(game.foods.indexOf(this), 1);
    }
}


let ç = (text) => console.log(text);


{
function getRoundNumber_interval(n, interval) {
    return Math.round(n / interval) * interval;
}

function getRandomNumber(min, max) {
    return (Math.random() * (max - min) + min);
}
} //funcoes de number



let img_BrotherOtavio = new Image();
img_BrotherOtavio.src = "imgs/brothers/otavio.png";
let img_FoodOtavio = new Image();
img_FoodOtavio.src = "imgs/foods/otavio.png";

let img_BrotherMiguel = new Image();
img_BrotherMiguel.src = "imgs/brothers/miguel.png";
let img_FoodMiguel = new Image();
img_FoodMiguel.src = "imgs/foods/miguel.png";

// let img_BrotherLevi = new Image();
// img_BrotherLevi.src = "imgs/brothers/levi.png";
// let img_FoodLevi = new Image();
// img_FoodLevi.src = "imgs/foods/levi.png";

// let img_BrotherPinheiro = new Image();
// img_BrotherPinheiro.src = "imgs/brothers/pinheiro.png";
// let img_FoodPinheiro = new Image();
// img_FoodPinheiro.src = "imgs/foods/pinheiro.png";

// let img_BrotherLuiz = new Image();
// img_BrotherLuiz.src = "imgs/brothers/luiz.png";
// let img_FoodLuiz = new Image();
// img_FoodLuiz.src = "imgs/foods/luiz.png";


let game = new Game();
let snake = new Snake();

game.load();


//lembrar de pesquisar e adequar ao script de delay programacao com Promise();