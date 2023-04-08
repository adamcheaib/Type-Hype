"use strict"

let startButton = document.getElementById("startButton");
startButton.addEventListener("click", start_game);

function start_game(event) {
    const main_screen = document.getElementById("wrapper");
    const title_information = document.getElementById("title_screen");

    title_information.style.opacity = "0";

    setTimeout(() => {
        main_screen.style.minHeight = "800px";
        main_screen.style.minWidth = "800px";
    }, 800);

    setTimeout(areUready, 2700);
}