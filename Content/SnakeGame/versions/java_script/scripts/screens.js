export const SCREENS_ID = {
    MENU: "screen_menu",
    GAME: "screen_game",
    SETTINGS: "screen_settings",
};

export const BUTTONS_ID = {
    START_GAME: "start_game_btn",
    OPEN_SETTINGS: "open_settings_btn",
    EXIT_SETTINGS: "exit_settings_btn",
};

class ScreensManager {
    constructor() {
        this.screens = {};
        this.current_screen = null;
    }

    addScreen(screen_id, element) {
        const screen = element || document.getElementById(screen_id);
        if (screen) {
            this.screens[screen_id] = screen;
        } else {
            console.error(`Screen with id ${screen_id} not found.`);
        }
    }

    reloadCSS() {
        var links = document.getElementsByTagName("link");
        for (var i = 0; i < links.length; i++) {
            var link = links[i];
            // Verifica se é uma folha de estilo e se o href existe
            if (link.rel === "stylesheet" && link.href) {
                // Remove qualquer timestamp anterior (se houver) para evitar URLs longas e repetidas
                var href = link.href.replace(/(\?_cachebust=\d+)?$/, "");
                // Adiciona um novo timestamp único
                link.href = href + "?_cachebust=" + new Date().getTime();
            }
        }
    }

    showScreen(screen_id) {
        const next = this.screens[screen_id];
        if (!next) {
            console.error("Screen not registered:", screen_id);
            return;
        }
        // Hide all screens via inline style to ensure deterministic repaint
        Object.values(this.screens).forEach(s => {
            s.classList.remove("active");
        });
        next.classList.add("active");
        this.current_screen = next;
        this.reloadCSS();
    }
}


export { ScreensManager };