const screenInitial = document.getElementById("screenInitial");
const screenSettings = document.getElementById("screenSettings");
const screenGame = document.getElementById("screenGame");
const screenGameOver = document.getElementById("screenGameOver");
const screenGameWon = document.getElementById("screenGameWon");
const screens = [screenInitial, screenSettings, screenGame, screenGameOver, screenGameWon];

const buttons = document.getElementsByClassName("buttons");

const conteinerGame = document.getElementById("conteinerGame");
const painel = document.getElementById("painel");
const HR = document.getElementById("hrSeparation");
const canvasGame = document.getElementById("canvasGame");
const conteinerScreen = document.getElementById("conteinerScreen");
const formSettings = document.getElementById("formSettings");

const spanPainel = document.getElementById("spanPainel");
const spanTimeGameOver = document.getElementById("spanTimeGameOver");
const spanScoreGameOver = document.getElementById("spanScoreGameOver");
const spanTimeGameWon = document.getElementById("spanTimeGameWon");
const spanScoreGameWon = document.getElementById("spanScoreGameWon");

const btnPlay = document.getElementById("btnPlay");
const btnSettings = document.getElementById("btnSettings");
const btnExitSettings = document.getElementById("btnExitSettings");
const btnRestartGameOver = document.getElementById("restartGameOver");
const btnRestartGameWon = document.getElementById("restartGameWon");

btnPlay.addEventListener('click', startGame);
btnSettings.addEventListener('click', openSettings);
btnExitSettings.addEventListener('click', exitSettings);
btnRestartGameOver.addEventListener('click', restartGame);
btnRestartGameWon.addEventListener('click', restartGame);

const ctx_game = canvasGame.getContext("2d");
ctx_game.imageSmoothingEnabled = false; // Desativa o anti-aliasing
// Para navegadores mais antigos (compatibilidade):
ctx_game.mozImageSmoothingEnabled = false; // Firefox
ctx_game.webkitImageSmoothingEnabled = false; // Chrome/Safari
ctx_game.msImageSmoothingEnabled = false; // Edge/IE


let timeoutUpdateGame;
let intervalTimer;
let intervalPainel;

let readyToMove = true;
let direction = 0;
let actualDirection;

let snake;
let foods;
let colorFoods;

let lengthSnake;
let time;
let score;
let gameIsOver;

function startGame() {
    gameIsOver = false
    openScreen(screenGame);
    spanPainel.textContent = "Del.. Sy3..";

    actualDirection = direction;
    requestAnimationFrame(update)

    setTimeout(() => {
        startPainel();
        updateGame();
    }, config.delayToPlay);
}
function gameOver() {
    gameIsOver = true;
    openScreen(screenGameOver);
    stopPainel();
    spanPainel.textContent = "GAME OVER";
    spanTimeGameOver.textContent = `Time: ${(time / 1000).toFixed(3)}s`;
    spanScoreGameOver.textContent = `Score: ${(100 / (config.pixels - config.initialLengthSnake) * score).toFixed(2)}%`;
}
function gameWon() {
    openScreen(screenGameWon);
    stopPainel();
    spanPainel.textContent = "GAME WON";
    spanTimeGameWon.textContent = `Time: ${(time / 1000).toFixed(3)}s`;
    spanScoreGameWon.textContent = `Score: ${(100 / (config.pixels - config.initialLengthSnake) * score).toFixed(2)}%`;
}

function restartGame() {
    config.load();
    openScreenInitial();
}


function update() {
    if (snake.length == config.pixels) {
        gameWon();
        return;
    }
    ctx_game.clearRect(0, 0, config.screenWidth, config.screenHeight);

    for (let i = 0; i < colorFoods.length; i++) {
        let color = colorFoods[i];
        let diference = config.delayDeteriorationFoods / 16.6666666666666666666; //tem colocar delta
        color[0] += config.diferenceColorFoods[0] / diference;
        if (color[0] < 0) {
            if (foods.includes(foods[i])) {
                removeFood(foods[i]);
                createFood();
            } 
            break;
        }
        color[1] += config.diferenceColorFoods[1] / diference;
        if (color[1] < 0) {
            if (foods.includes(foods[i])) {
                removeFood(foods[i]);
                createFood();
            } 
            break;
        }
        color[2] += config.diferenceColorFoods[2] / diference;
        if (color[2] < 0) {
            if (foods.includes(foods[i])) {
                removeFood(foods[i]);
                createFood();
            } 
            break;
        }
    }
    foods.forEach((food, index) => drawRect(food, `rgb(${colorFoods[index][0]}, ${colorFoods[index][1]}, ${colorFoods[index][2]})`));

    let colorSnake = [config.initialColorSnake[0], config.initialColorSnake[1], config.initialColorSnake[2]];

    drawRect(snake[0], `rgb(${colorSnake[0]}, ${colorSnake[1]}, ${colorSnake[2]})`);
    if (config.imgHeadSnake) drawImage(snake[0], config.imgHeadSnake, 90 * (actualDirection + config.diferenceDirection));

    if (config.imgBodySnake) {
        for (let i = 1; i < snake.length; i++) {
            drawImage(snake[i], config.imgBodySnake, 90 * (actualDirection + config.diferenceDirection));
        }
    } else {
        for (let i = 1; i < snake.length; i++) {
            colorSnake[0] += config.diferenceColorSnake[0] / (snake.length - 1);
            colorSnake[1] += config.diferenceColorSnake[1] / (snake.length - 1);
            colorSnake[2] += config.diferenceColorSnake[2] / (snake.length - 1);
            drawRect(snake[i], `rgb(${colorSnake[0]}, ${colorSnake[1]}, ${colorSnake[2]})`);
        }
    }

    if (!gameIsOver) requestAnimationFrame(update);
}


function drawRect(n, color, borderRadius) {
    let [w, h] = get2DPosition(n);
    ctx_game.fillStyle = color;
    ctx_game.fillRect(w * config.proportion, h * config.proportion, config.proportion, config.proportion);
}
function drawImage(n, image, rotateGraus) {
    let [w, h] = get2DPosition(n);
    ctx_game.save();
    ctx_game.translate(w * config.proportion + config.proportion / 2, h * config.proportion + config.proportion / 2);
    ctx_game.rotate(rotateGraus * Math.PI / 180);
    ctx_game.drawImage(image, -config.proportion / 2, -config.proportion / 2, config.proportion, config.proportion);
    ctx_game.restore();
}


function startTimer() {
    timeInitial = performance.now();
    intervalTimer = setInterval(() => {
        time = performance.now() - timeInitial;
    }, 1);
}
function stopTimer() {
    clearInterval(intervalTimer);
}


function startPainel() {
    startTimer();
    intervalPainel = setInterval(() => {
        spanPainel.textContent = `Time: ${(time / 1000).toFixed(3)} Score: ${(100 / (config.pixels - snake.length) * score).toFixed(2)}%`;
        console.log(config.pixels, snake.length);
    }, 1)
}
function stopPainel() {
    clearInterval(intervalPainel);
    stopTimer();
}


function VF_move(event) {
    if (readyToMove) {
        switch (event.key.toLowerCase()) {
            case "d":
            case "arrowright":
                if (direction != 2) direction = 0;
                break;
            case "s":
            case "arrowdown":
                if (direction != 3) direction = 1;
                break;
            case "a":
            case "arrowleft":
                if (direction != 0) direction = 2;
                break;
            case "w":
            case "arrowup":
                if (direction != 1) direction = 3;
                break;
        }
        readyToMove = false;
    }
}


function openScreen(screenToSet) {
    screens.forEach(screen => {
        if (screen == screenToSet) {
            screen.style.display = "flex";
        } else {
            screen.style.display = "none";
        }
    })
}

function openScreenInitial() {
    openScreen(screenInitial);
    spanPainel.textContent = "Snake Game";
}

function openSettings() {
    openScreen(screenSettings);
    spanPainel.textContent = "Settings";
}
function exitSettings() {
    openScreenInitial();
    config.load();
}
function setSettings() {
    switch (dificult) {
        case "baby":
            config.toLoad();
            break;
        case "normal":
            config.toLoad();
            break;
        case "medium":
            config.toLoad();
            break;
        case "hard":
            config.toLoad();
            break;
        case "impossible":
            config.toLoad();
            break;  
    }
}

class Config {
    load(multiplyHeightPainel=0.1, heightHR=2) {
        switch (inputDificult.value) {
            case "baby":
                this.frames = 1;
                this.maxFoods = 2;
                this.delayDeteriorationFoods = 5000;
                this.delayToPlay = 1000;

                this.dimenX = 8;
                this.dimenY = 6;

                this.initialLengthSnake = 3;
                break;
            case "normal":
                this.frames = 1;
                this.maxFoods = 2;
                this.delayDeteriorationFoods = 5000;
                this.delayToPlay = 1000;

                this.dimenX = 8;
                this.dimenY = 6;

                this.initialLengthSnake = 3;
                break;
            case "medium":
                this.frames = 1;
                this.maxFoods = 2;
                this.delayDeteriorationFoods = 5000;
                this.delayToPlay = 1000;

                this.dimenX = 8;
                this.dimenY = 6;

                this.initialLengthSnake = 3;
                break;
            case "hard":
                this.frames = 1;
                this.maxFoods = 2;
                this.delayDeteriorationFoods = 5000;
                this.delayToPlay = 1000;

                this.dimenX = 8;
                this.dimenY = 6;

                this.initialLengthSnake = 3;
                break;
            case "impossible":
                this.frames = 1;
                this.maxFoods = 2;
                this.delayDeteriorationFoods = 5000;
                this.delayToPlay = 1000;

                this.dimenX = 8;
                this.dimenY = 6;

                this.initialLengthSnake = 3;
                break;
        }
        switch (inputModeGame.value) {
            case "normal":
                this.initialColorSnake = [0, 100, 0];
                this.finalColorSnake = [0, 255, 0];
                this.initialColorFood = [255, 0, 0];
                this.finalColorFood = [0, 0, 0];

                this.imgHeadSnake = null;
                this.imgBodySnake = null;
                this.imgFood = null;

                this.diferenceDirection = 0;
                break;
            case "otavio":
                this.initialColorSnake = [0, 100, 0];
                this.finalColorSnake = [0, 255, 0];
                this.initialColorFood = [255, 0, 0];
                this.finalColorFood = [0, 0, 0];

                this.imgHeadSnake = imgBrother_otavio;
                this.imgBodySnake = null;
                this.imgFood = imgFood_otavio;
                this.diferenceDirection = 1;
                break;
            case "miguel":
                this.initialColorSnake = [0, 100, 0];
                this.finalColorSnake = [0, 255, 0];
                this.initialColorFood = [255, 0, 0];
                this.finalColorFood = [0, 0, 0];

                this.imgHeadSnake = imgBrother_miguel;
                this.imgBodySnake = null;
                this.imgFood = imgFood_miguel;
                this.diferenceDirection = -1;
                break;
            case "levi":
                this.initialColorSnake = [0, 100, 0];
                this.finalColorSnake = [0, 255, 0];
                this.initialColorFood = [255, 0, 0];
                this.finalColorFood = [0, 0, 0];

                this.imgHeadSnake = imgBrother_levi;
                this.imgBodySnake = null;
                this.imgFood = imgFood_levi;
                this.diferenceDirection = 0;
                break;
            case "luiz":
                this.initialColorSnake = [0, 100, 0];
                this.finalColorSnake = [0, 255, 0];
                this.initialColorFood = [255, 0, 0];
                this.finalColorFood = [0, 0, 0];

                this.imgHeadSnake = imgBrother_luiz;
                this.imgBodySnake = null;
                this.imgFood = imgFood_luiz;
                this.diferenceDirection = -1;
                break;
            case "pinheiro":
                this.initialColorSnake = [0, 100, 0];
                this.finalColorSnake = [0, 255, 0];
                this.initialColorFood = [255, 0, 0];
                this.finalColorFood = [0, 0, 0];

                this.imgHeadSnake = imgBrother_pinheiro;
                this.imgBodySnake = null;
                this.imgFood = imgFood_pinheiro;
                this.diferenceDirection = 2;
                break;
        }
        this.diferenceColorSnake = [
            (this.finalColorSnake[0] - this.initialColorSnake[0]),
            (this.finalColorSnake[1] - this.initialColorSnake[1]),
            (this.finalColorSnake[2] - this.initialColorSnake[2])
        ];
        this.diferenceColorFoods = [
            (this.finalColorFood[0] - this.initialColorFood[0]),
            (this.finalColorFood[1] - this.initialColorFood[1]),
            (this.finalColorFood[2] - this.initialColorFood[2])
        ];
        let multiplySizeScreen;
        const viewportWidthNoScrollbar = document.documentElement.clientWidth;
        const viewportHeightNoScrollbar = document.documentElement.clientHeight;

        this.conteinerWidth = parseInt((viewportWidthNoScrollbar));
        this.conteinerHeight = parseInt((viewportHeightNoScrollbar));
        
        this.painelHeight = parseInt(multiplyHeightPainel * this.conteinerHeight);
        this.screenWidth = this.conteinerWidth;
        this.screenHeight = this.conteinerHeight - this.painelHeight - heightHR;
        this.pixels = this.dimenX * this.dimenY;
        this.proportion = parseInt(Math.min(this.screenWidth / this.dimenX, this.screenHeight / this.dimenY));
        
        conteinerGame.style.width = `${this.conteinerWidth}px`;
        conteinerGame.style.height = `${this.conteinerHeight}px`;
        painel.style.height = `${this.painelHeight}px`;
        painel.style.fontSize = `${this.painelHeight * 0.8}px`;
        HR.style.minHeight = `${heightHR}px`;
        conteinerScreen.style.width = `${this.screenWidth}px`;
        conteinerScreen.style.height = `${this.screenHeight}px`;

        canvasGame.width = this.proportion * this.dimenX;
        canvasGame.height = this.proportion * this.dimenY;
        canvasGame.style.width = `${canvasGame.width}px`;
        canvasGame.style.height = `${canvasGame.height}px`;

        for (let i = 0; i < buttons.length; i++) {
            buttons[i].style.width = `${this.screenWidth * 0.25}px`;
            buttons[i].style.height = `${this.screenHeight * 0.125}px`;
            buttons[i].style.fontSize = `${this.conteinerWidth / 25}px`;
        }

        screens.forEach(screen => {
            screen.style.width = `${this.screenWidth}px`;
            screen.style.height = `${this.screenHeight}px`;
        })

        inputModeGame.style.width = `${this.screenWidth * 0.3}px`;
        inputModeGame.style.height = `${this.screenHeight * 0.075}px`;
        inputDificult.style.width = `${this.screenWidth * 0.3}px`;
        inputDificult.style.height = `${this.screenHeight * 0.075}px`;
        inputModeScreen.style.width = `${this.screenWidth * 0.3}px`;
        inputModeScreen.style.height = `${this.screenHeight * 0.075}px`;

        let vBase = multiplySizeScreen * this.screenWidth * 0.03;

        inputModeGame.parentElement.getElementsByTagName("label")[0].style.fontSize = `${vBase}px`;
        inputDificult.parentElement.getElementsByTagName("label")[0].style.fontSize = `${vBase}px`;
        inputModeScreen.parentElement.getElementsByTagName("label")[0].style.fontSize = `${vBase}px`;

        inputModeGame.style.fontSize = `${vBase}px`;
        inputDificult.style.fontSize = `${vBase}px`;
        inputModeScreen.style.fontSize = `${vBase}px`;

        formSettings.style.width = `${multiplySizeScreen * this.screenWidth * 0.7}px`;

        spanTimeGameOver.style.fontSize = `${55}px`;
        spanScoreGameOver.style.fontSize = `${55}px`;
        spanTimeGameWon.style.fontSize = `${55}px`;
        spanScoreGameWon.style.fontSize = `${55}px`;

        foods = [];
        colorFoods = [];
        createSnake();
        for (let i = 0; i < this.maxFoods; i++) createFood();
        score = 0;
        time = 0;
    } 
}

function createSnake() {
    while (true) {
        snake = [getInt(0, config.pixels)];
        direction = getInt(0, 4);
        let newP;
        let cont;
        for (let i = 1; i < config.initialLengthSnake + 1; i++) {
            cont = 0;
            newP = getNewP(snake[i - 1], snake);
            while (cont < 4 && newP === false) {
                direction ++;
                if (direction == 4) direction = 0;
                newP = getNewP(snake[snake.length - 1], snake);
                cont ++;
            }
            snake[i] = newP;
            if (cont == 4) break;
        }
        if (cont < 4) {
            snake.pop();
            snake = snake.reverse();
            break;
        } 
    }
}

function createFood(delayMin = 100, delayMax = 1000) {
    setTimeout(function() {
        let p = getInt(0, config.pixels);
        while (snake.includes(p)) p = getInt(0, config.pixels);
        foods[foods.length] = p;
        colorFoods[colorFoods.length] = [config.initialColorFood[0], config.initialColorFood[1], config.initialColorFood[2]];
    }, Math.random() * (delayMax - delayMin) + delayMin)
}

function removeFood(food) {
    let index = foods.indexOf(food);
    foods.splice(index, 1);
    colorFoods.splice(index, 1);
}

function getNewP(oldP, array) {
    let [x, y] = get2DPosition(oldP);
    switch (direction) {
        case 0:
            x ++;
            break;
        case 1:
            y ++;
            break;
        case 2:
            x --;
            break;
        case 3:
            y --;
            break;
    }
    if (colliItSelfOrWall(x, y, array)) return false;
    return x + (y * config.dimenX);
}



function colliItSelfOrWall(x, y, array) {
    let newP = x + (y * config.dimenX);
    if (x < 0 || y < 0 || x == config.dimenX || y == config.dimenY || array.includes(newP)) return true;
    return false;
}

function get2DPosition(position) {
    return [position % config.dimenX, Math.floor(position / config.dimenX)]
}

function getInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}


function updateGame() {
    if (snake.length == config.pixels) {
        gameWon();
        return;
    } 
    readyToMove = true;
    actualDirection = direction;
    let newP = getNewP(snake[0], snake.slice(0, -1));
    if (newP === false) {
        gameOver()
        return;
    }
    if (!foods.includes(newP)) {
        snake.pop();
    } else {
        removeFood(foods.indexOf(newP));
        createFood();
        score ++;
    }
    snake.unshift(newP);
    
    setTimeout(updateGame, 1000 / config.frames);
}

addEventListener('keydown', VF_move);


const inputModeGame = document.getElementById("modeGame");
const inputDificult = document.getElementById("dificult");
const inputModeScreen = document.getElementById("modeScreen");


const imgBrother_levi = new Image();
const imgBrother_luiz = new Image();
const imgBrother_miguel = new Image();
const imgBrother_otavio = new Image();
const imgBrother_pinheiro = new Image();

const imgFood_levi = new Image();
const imgFood_luiz = new Image();
const imgFood_miguel = new Image();
const imgFood_otavio = new Image();
const imgFood_pinheiro = new Image();

const config = new Config();


addEventListener("DOMContentLoaded", (event) => {
    config.load();
    openScreenInitial();

    imgBrother_levi.src = "imgs/brothers/head/levi.png";
    imgBrother_luiz.src = "imgs/brothers/head/luiz.png";
    imgBrother_miguel.src = "imgs/brothers/head/miguel.png";
    imgBrother_otavio.src = "imgs/brothers/head/otavio.png";
    imgBrother_pinheiro.src = "imgs/brothers/head/pinheiro.png";

    imgFood_levi.src = "imgs/foods/levi.png";
    imgFood_luiz.src = "imgs/foods/luiz.png";
    imgFood_miguel.src = "imgs/foods/miguel.png";
    imgFood_otavio.src = "imgs/foods/otavio.png";
    imgFood_pinheiro.src = "imgs/foods/pinheiro.png";
})


// ============== CONFIGURAÇÃO INICIAL DO CANVAS E CONTEXTO ==============

// Supondo que 'canvasGame' é o seu elemento <canvas> do HTML
// Ex: const canvasGame = document.getElementById("canvasGame");

// Obtém o contexto de desenho 2D do canvas.
// É através deste objeto 'ctx_game' que todos os comandos de desenho são executados.
// const ctx_game = canvasGame.getContext("2d");

// Desativa o anti-aliasing (suavização de bordas) para imagens.
// Isso é crucial para jogos com gráficos pixelados, como o Snake,
// garantindo que os pixels permaneçam nítidos e não fiquem borrados ao serem redimensionados.
// ctx_game.imageSmoothingEnabled = false;

// Linhas para compatibilidade com navegadores mais antigos que usavam prefixos
// para a propriedade 'imageSmoothingEnabled'.
// O navegador moderno ignora as que não são aplicáveis.
// ctx_game.mozImageSmoothingEnabled = false;   // Para Firefox
// ctx_game.webkitImageSmoothingEnabled = false; // Para Chrome/Safari
// ctx_game.msImageSmoothingEnabled = false;   // Para Edge/IE

// Define as dimensões físicas do elemento <canvas> em pixels.
// Isso é feito no seu 'config.load()' para ajustar o tamanho do jogo.
// Exemplo:
// canvasGame.width = config.proportion * config.dimenX;
// canvasGame.height = config.proportion * config.dimenY;


// ============== COMANDOS DE DESENHO E ESTILO ==============

// Limpa uma área retangular específica do canvas, tornando-a transparente.
// No seu jogo, é usado a cada frame (no 'update()') para apagar o desenho anterior
// antes de redesenhar a cobra e a comida em suas novas posições.
// ctx_game.clearRect(0, 0, config.screenWidth, config.screenHeight);


// Define a cor ou estilo usado para preencher formas (retângulos, círculos, etc.).
// Você usa isso para a cor da cobra e da comida quando não são imagens.
// Pode ser um nome de cor ('red'), um código hexadecimal ('#FF0000'),
// ou um valor RGB/RGBA (`'rgb(255, 0, 0)'`, `'rgba(255, 0, 0, 0.5)'`).
// ctx_game.fillStyle = 'green'; // Exemplo: cor verde


// Desenha um retângulo preenchido com a cor/estilo definido por 'fillStyle'.
// 'x' e 'y' são as coordenadas do canto superior esquerdo, 'width' e 'height' são as dimensões.
// No seu 'drawRect' (quando 'imgOrColor' não é uma Imagem):
// ctx_game.fillRect(w * config.proportion, h * config.proportion, config.proportion, config.proportion);


// Define a cor ou estilo usado para traçar (contornar) formas.
// Semelhante ao 'fillStyle', mas para bordas.
// Exemplo:
// ctx_game.strokeStyle = 'black';


// Define a espessura das linhas ou contornos quando você traça um caminho ('stroke()').
// O valor é em pixels.
// Exemplo:
// ctx_game.lineWidth = 2;


// Desenha o contorno de um retângulo com a cor e espessura definidas por 'strokeStyle' e 'lineWidth'.
// Exemplo:
// ctx_game.strokeRect(50, 50, 100, 100);


// Desenha uma imagem (um objeto HTMLImageElement, <canvas> ou <video>) no canvas.
// Há várias assinaturas, mas a mais comum (e que você usa) é:
// drawImage(image, dx, dy, dWidth, dHeight)
// 'image': o objeto de imagem a ser desenhado.
// 'dx, dy': as coordenadas (destino) do canto superior esquerdo onde a imagem será desenhada.
// 'dWidth, dHeight': as dimensões (destino) em que a imagem será desenhada no canvas.
// No seu 'drawRect' (quando 'imgOrColor' é uma Imagem):
// ctx_game.drawImage(imgOrColor, w * config.proportion, h * config.proportion, config.proportion, config.proportion);


// Inicia um novo caminho de desenho.
// É fundamental chamar 'beginPath()' antes de começar a desenhar uma nova forma complexa
// (como um retângulo arredondado, círculos, linhas múltiplas),
// pois isso "limpa" qualquer caminho anterior e permite que você preencha ou traçe
// a nova forma de forma independente.
// Exemplo:
// ctx_game.beginPath();


// Move o "lápis" do contexto para uma nova posição (x, y) sem desenhar uma linha.
// Geralmente usado para iniciar um novo segmento de um caminho ou para pular para
// o início de uma nova forma sem conectar à anterior.
// Exemplo (usado na função drawRoundRect):
// ctx_game.moveTo(x + radius.tl, y);


// Desenha uma linha reta do ponto atual do "lápis" até a coordenada (x, y).
// Exemplo (usado na função drawRoundRect):
// ctx_game.lineTo(x + width - radius.tr, y);


// Desenha um arco arredondado que conecta três pontos:
// 1. O ponto atual do caminho.
// 2. O ponto de controle (x1, y1), que seria o canto "quadrado" antes do arredondamento.
// 3. O ponto (x2, y2), que é o ponto para onde o arco se curva (o início da próxima linha reta).
// 'radius' define o raio do arredondamento.
// É a chave para desenhar retângulos arredondados.
// Exemplo (usado na função drawRoundRect):
// ctx_game.arcTo(x + width, y, x + width, y + radius.tr, radius.tr);


// Fecha o caminho de desenho atual, desenhando uma linha reta do ponto atual
// de volta ao ponto de início do caminho (o último 'moveTo()').
// Para formas preenchidas ('fill()'), isso é opcional, pois 'fill()' as fecha automaticamente.
// Mas para formas traçadas ('stroke()'), é importante para garantir que o contorno seja completo.
// Exemplo (usado na função drawRoundRect):
// ctx_game.closePath();


// Preenche a área interna do caminho de desenho atual com a cor/estilo definido por 'fillStyle'.
// Você chama 'fill()' APÓS ter definido a geometria do caminho (usando beginPath, moveTo, lineTo, arcTo, etc.).
// Exemplo:
// drawRoundRect(50, 50, 100, 100, 10); // Cria o caminho
// ctx_game.fillStyle = 'blue';
// ctx_game.fill(); // Pinta o caminho criado


// Traça o contorno do caminho de desenho atual com a cor definida por 'strokeStyle' e
// a espessura definida por 'lineWidth'.
// Você chama 'stroke()' APÓS ter definido a geometria do caminho.
// Exemplo:
// drawRoundRect(150, 50, 100, 100, 10); // Cria o caminho
// ctx_game.strokeStyle = 'red';
// ctx_game.lineWidth = 3;
// ctx_game.stroke(); // Traça o contorno do caminho criado


// ============== COMANDOS DE TRANSFORMAÇÃO (CONTEXTO) ==============

// Salva o estado atual de todas as configurações do contexto de desenho
// (transformações, estilos de preenchimento/traçado, fontes, etc.) em uma pilha interna.
// Útil antes de aplicar transformações temporárias que você não quer que afetem
// desenhos futuros.
// No seu 'drawRect', é usado antes de transladar e rotacionar a cabeça da cobra.
// ctx_game.save();


// Restaura o estado do contexto de desenho para o último estado que foi salvo
// com 'ctx_game.save()'. Isso desfaz todas as transformações e alterações de estilo
// que foram feitas desde o último 'save()'.
// No seu 'drawRect', é usado para reverter as transformações da cabeça da cobra
// para que o resto do corpo e outras coisas sejam desenhadas normalmente.
// ctx_game.restore();


// Move a origem (o ponto 0,0) do sistema de coordenadas do canvas por (x, y) pixels.
// Isso significa que qualquer coisa que você desenhar a partir de agora estará deslocada.
// Para rotacionar um objeto em torno de seu próprio centro, você primeiro translada
// a origem para o centro do objeto.
// Exemplo (no seu 'drawRect' modificado para rotação):
// ctx_game.translate(pixelX + pixelSize / 2, pixelY + pixelSize / 2);


// Rotaciona o sistema de coordenadas do canvas pelo ângulo especificado.
// É crucial lembrar que o 'angle' é em RADIANOS, não em graus!
// Rotações são cumulativas (se você rotacionar 30, e depois 30 de novo, será 60 no total).
// Exemplo (no seu 'drawRect' modificado para rotação):
// const angleInRadians = angleInDegrees * Math.PI / 180; // Converte graus para radianos
// ctx_game.rotate(angleInRadians);


// Redimensiona as unidades do canvas.
// 'x' e 'y' são fatores de escala (1.0 = tamanho original, 2.0 = duas vezes maior, 0.5 = metade do tamanho).
// Exemplo:
// ctx_game.scale(2, 2); // Tudo desenhado a partir daqui será duas vezes maior


// ============== EXTRAS (PARA COMPLEMENTAR SEU CÓDIGO) ==============

// Esta função seria a que você usaria para desenhar seus retângulos arredondados,
// seja para a cobra ou para a comida, se desejar esse estilo.
// Lembre-se de chamá-la e então 'ctx_game.fill()' ou 'ctx_game.stroke()'.
// function drawRoundRect(x, y, width, height, radius) { /* ... código da função ... */ }