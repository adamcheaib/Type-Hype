"use strict"

const alphabetArray = Array.from(`qwertyuiopasdfghjklzxcvbnm.,""''-`);

function prepareGame() {
    const random_text = data[Math.floor(Math.random() * data.length)].toLowerCase();
    const wordLettersArray = Array.from(random_text);

    document.getElementById("wrapper").innerHTML = `
    <div class="gameplay" style="opacity: 0;">
    <div id"game_information"><p>Time: <span id="timer">45</span> seconds<p>Score: <span id="score">${score}</span></p></div>
    <div id="game"></div>
    <img src="./media/kbdReference.png">
    </div>`;

    document.querySelector(".gameplay").style.opacity = "100%";
    wordLettersArray.forEach(letter => {
        const seperateLetter = document.createElement("span")
        seperateLetter.textContent = letter;
        seperateLetter.classList.add("unchecked");
        seperateLetter.style.fontSize = "30px";
        document.querySelector("#game").appendChild(seperateLetter);
    });

    document.body.addEventListener("keydown", checkLetter);
    let timer = document.querySelector("#timer");
    timer.textContent = 60;

    let timerCounter = setInterval(() => {
        timer.textContent--;
        if (timer.textContent == 0) {
            create_alert("Time is over!");
            score = 0;
            clearInterval(timerCounter);
        } else if (document.querySelectorAll(".unchecked").length == 0) {
            create_alert("You're done!");
            score = 0;
            clearInterval(timerCounter);
        }
    }, 1000);

}

let score = 0;


function checkLetter(event) {

    if (alphabetArray.includes(event.key)) {
        let allLetters = document.querySelectorAll(".unchecked");
        if (event.key === allLetters[0].textContent) {
            correctTypeSound(0.5);

            if (allLetters.length > 2) {
                if (allLetters[0 + 1].textContent == " ") {
                    allLetters[0 + 1].className = "targeted";
                    score += 5;
                    document.querySelector("#score").textContent = score;;
                }
            }
            allLetters[0].style.color = "green";
            allLetters[0].className = "targeted";
        } else {
            errorTypeSound(0.7);
        }
    }
}

let sound = new Audio("./media/keyboardClickShort.mp3");
sound.preload = 'auto';
sound.load();

function correctTypeSound(volume) {
    var click = sound.cloneNode();
    click.volume = volume;
    click.play();
};

let errorSound = new Audio("./media/errEffect.mp3");
errorSound.preload = "auto";
errorSound.load();

function errorTypeSound(volume) {
    let click = errorSound.cloneNode();
    click.volume = volume;
    click.play();
};

function create_alert(text) {
    let score = document.querySelector("#score").textContent;
    let timer = parseInt(document.querySelector("#timer").textContent);

    if (score === null) {
        score = 0;
    };

    if (timer != 0) {
        score = score * timer;
    }

    let white_background = document.createElement("div");
    white_background.id = "white_cover";
    white_background.innerHTML = `
    <div id="boxInfo"><span>${text} Your score is ${score}</span><div id="close_button">Close</div></div>`;
    document.querySelector("body").appendChild(white_background);
    document.querySelector("body").removeEventListener("keydown", checkLetter);
    document.querySelector("#close_button").addEventListener("click", (event) => { prepareGame(); document.getElementById("white_cover").remove() });
};