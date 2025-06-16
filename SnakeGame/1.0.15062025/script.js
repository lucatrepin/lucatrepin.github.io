const screenInitial = document.getElementById("screenInitial");
const screenSettings = document.getElementById("screenSettings");

const btnPlay = document.getElementById("btnPlay");
const btnSettings = document.getElementById("btnSettings");

btnPlay.addEventListener('click', startGame);
btnSettings.addEventListener('click', openSettings);

function startGame() {
    alert("o jogo comecou");
}

function openSettings() {
    alert("abrio as configs");
}