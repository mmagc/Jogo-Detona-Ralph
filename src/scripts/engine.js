const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lives: document.querySelector("#lives"),
    },
    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
        chances: 3,
    },
    actions:{
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    },
};

function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime <= 0 || state.values.chances === 0) {
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        document.getElementById("final-score").textContent = state.values.result;
        document.getElementById("game-over-modal").style.display = "flex";
    }
}

function restartGame() {
    document.getElementById("game-over-modal").style.display = "none";
    state.values.currentTime = 60;
    state.values.chances = 3;
    state.values.result = 0;
    state.view.timeLeft.textContent = state.values.currentTime;
    state.view.lives.textContent = state.values.chances;
    state.view.score.textContent = state.values.result;
    state.actions.countDownTimerId = setInterval(countDown, 1000);
    state.actions.timerId = setInterval(randomSquare, state.values.gameVelocity);
}

document.getElementById("restart-button").addEventListener("click", restartGame);

function playSound(audioName) {
    let audio = new Audio(`./src/sounds/${audioName}.m4a`);
    audio.volume = 0.2;
    audio.play();
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if(square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit");
            } else if (square.id !== state.values.hitPosition) {
                state.values.chances--;
                state.view.lives.textContent = state.values.chances;
                playSound("hit");
            }
        });
    });
}

function addListenerWrongBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if(square.id !== state.values.hitPosition) {
                state.values.chances--;
                state.view.lives.textContent = state.values.chances;
                playSound("hit");
            }
        });
    });
}

function init() {
    addListenerHitBox();
}

init();
