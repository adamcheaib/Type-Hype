"use strict"

const alphabetArray = Array.from(`QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm.,""''-1234567890`);

function areUready() {
    let wrapper = document.getElementById("wrapper");
    wrapper.style.display = "flex";
    wrapper.style.alignItems = "center";
    wrapper.style.justifyContent = "center";
    let countDownAudio = new Audio("./media/countdown.wav");


    setTimeout(() => { wrapper.innerHTML = "<span style='font-size: 40px'>1</span>"; countDownAudio.play(); }, 1000);
    setTimeout(() => wrapper.innerHTML = "<span style='font-size: 40px'>2</span>", 2000);
    setTimeout(() => wrapper.innerHTML = "<span style='font-size: 40px'>3</span>", 3000);
    setTimeout(() => prepareGame(), 4000);

}

function prepareGame() {
    const random_text = data[Math.floor(Math.random() * data.length)];
    const wordLettersArray = Array.from(random_text);

    document.getElementById("wrapper").innerHTML = `
    <div class="gameplay" style="opacity: 0;">
    <div id="game_information"><p>Time: <span id="timer">45</span> seconds<p>Score: <span id="score">${score}</span></p></div>
    <div id="game"></div>
    <img src="./media/kbdReference.png">
    </div>`;

    // document.querySelector("#game_information").style.fontSize = "30px";
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
let correctsInputs = 0;
let wrongInputs = 0;


function checkLetter(event) {
    if (alphabetArray.includes(event.key.toUpperCase())) {
        let allLetters = document.querySelectorAll(".unchecked");
        if (event.key.toUpperCase() === allLetters[0].textContent || event.key.toLowerCase() === allLetters[0].textContent) {
            correctTypeSound(0.5);
            correctsInputs++;

            if (allLetters.length > 2) {
                if (allLetters[0 + 1].textContent == " ") {
                    allLetters[0 + 1].className = "targeted";
                    score += 5;

                    document.querySelector("#score").textContent = score;;
                }
            }
            allLetters[0].style.color = "rgb(0, 255, 0)";
            allLetters[0].className = "targeted";
            allLetters[0].style.backgroundColor = "none";
        } else {
            errorTypeSound(0.7);
            allLetters[0].style.color = "red";
            wrongInputs++;
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

    let totalInputs = correctsInputs + wrongInputs;
    let final_accuracy_score = correctsInputs / totalInputs;
    if (final_accuracy_score == NaN) {
        final_accuracy_score = 0;
    }

    if (score === null) {
        score = 0;
    };

    if (timer != 0) {
        score = score * timer;
    }

    let white_background = document.createElement("div");
    white_background.id = "white_cover";
    white_background.innerHTML = `
    <div id="boxInfo"><span>${text} Your score is ${score}. You had an accuracy of ${Math.round(final_accuracy_score * 100)}%</span><div id="close_button">Close</div></div>`;
    document.querySelector("body").appendChild(white_background);
    document.querySelector("body").removeEventListener("keydown", checkLetter);
    document.querySelector("#close_button").addEventListener("click", (event) => { areUready(); document.getElementById("white_cover").remove() });
};