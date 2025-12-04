import { ScreensManager, SCREENS_ID, BUTTONS_ID } from "./scripts/screens.js";
import { Game } from "./game/game.js";

document.addEventListener('DOMContentLoaded', async () => {
    // Verify if the main element exists
    const main = document.getElementsByTagName("main")[0];
    if (!main) return;
    console.log("Main element found:", main);

    let screens_manager = new ScreensManager();

    let canvas_game = document.getElementById("canvas_game");
    function setCanvasSizeFromContainer() {
        console.clear();
        
        canvas_game.width = window.screen.width;
        canvas_game.height = window.screen.height;
        canvas_game.style.width = `${main.clientWidth}px`;
        canvas_game.style.height = `${main.clientHeight}px`;

        console.log("Canvas size set to:", canvas_game.width, canvas_game.height);
        console.log("Canvas style size set to:", canvas_game.style.width, canvas_game.style.height);
    }

    window.addEventListener("resize", () => {
        setCanvasSizeFromContainer();
    });
    window.dispatchEvent(new Event("resize"));
    
    let screen_menu = document.getElementById(SCREENS_ID.MENU);
    let screen_game = document.getElementById(SCREENS_ID.GAME);
    let screen_settings = document.getElementById(SCREENS_ID.SETTINGS);

    let get_infos = () => {
        let game_difficulty_select = document.getElementById("game_difficulty_select");
        return {
            game_difficulty: game_difficulty_select.value,
        }
    };

    screens_manager.addScreen(SCREENS_ID.MENU, screen_menu);
    screens_manager.addScreen(SCREENS_ID.GAME, screen_game);
    screens_manager.addScreen(SCREENS_ID.SETTINGS, screen_settings);

    screens_manager.showScreen(SCREENS_ID.MENU);

    document.getElementById(BUTTONS_ID.START_GAME).addEventListener("click", () => {
        console.log("Starting game...");
        screens_manager.showScreen(SCREENS_ID.GAME);
        game.start();
    });

    document.getElementById(BUTTONS_ID.OPEN_SETTINGS).addEventListener("click", () => {
        screens_manager.showScreen(SCREENS_ID.SETTINGS);
    });

    document.getElementById(BUTTONS_ID.EXIT_SETTINGS).addEventListener("click", () => {
        screens_manager.showScreen(SCREENS_ID.MENU);
        let infos = get_infos();
        game.change_config(infos);
    });

    let game_over = () => {
        screens_manager.showScreen(SCREENS_ID.MENU);
        alert("Game Over!");
    }

    let game_win = () => {
        screens_manager.showScreen(SCREENS_ID.MENU);
        alert("You Win!");
    }

    let game = new Game(canvas_game, get_infos(), game_over, game_win);
});


