"use strict"

const alphabetArray = Array.from(`qwertyuiopasdfghjklzxcvbnm.,""''-`);

function prepareGame() {
    const random_text = data[Math.floor(Math.random() * data.length)].toLowerCase();
    const wordLettersArray = Array.from(random_text);

    document.getElementById("wrapper").innerHTML = `
    <div class="gameplay">
    <div id"game_information"><p>Time: <span id="timer">45</span><p>Score: <span id="score">0</span></p></div>
    <div id="game"></div>
    </div>`;

    document.querySelector(".gameplay").style.opacity = "100%";
    wordLettersArray.forEach(letter => {
        const seperateLetter = document.createElement("span")
        seperateLetter.textContent = letter;
        seperateLetter.classList.add("unchecked");
        seperateLetter.style.fontSize = "20px";
        document.querySelector("#game").appendChild(seperateLetter);
    });

    document.body.addEventListener("keydown", checkLetter);

}


function checkLetter(event) {
    playSound(0.5);

    if (!alphabetArray.includes(event.key)) {
        console.log("Wrong button!");
    } else {
        let allLetters = document.querySelectorAll(".unchecked");
        if (event.key === allLetters[0].textContent && !allLetters[0].classList.contains("red")) {

            if (allLetters.length > 2) {
                if (allLetters[0 + 1].textContent == " ") {
                    allLetters[0 + 1].className = "targeted";
                }
            }
            allLetters[0].style.color = "green";
            allLetters[0].className = "targeted";
            document.querySelector("#score").textContent++;
        } else {
            // add error sound
            document.querySelector("#score").textContent--;
        }
    }
}

var sound = new Audio("./media/keyboardClickShort.mp3");
sound.preload = 'auto';
sound.load();

function playSound(volume) {
    var click = sound.cloneNode();
    click.volume = volume;
    click.play();
}