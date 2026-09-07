/* =========================================
   MEMORY JOURNEY
   LEVEL 1
========================================= */


/* ---------- GAME STATE ---------- */

let currentRound = 0;
let totalRounds = 9;

let currentGame = 0;

let score = 0;
let attempts = 0;
let hintsUsed = 0;

let performance = {
    match: 0,
    missing: 0,
    object: 0
};


/* ---------- GAME DATA ---------- */

const objects = [
    {
        emoji: "☕",
        name: "Cup"
    },
    {
        emoji: "🪥",
        name: "Toothbrush"
    },
    {
        emoji: "📖",
        name: "Book"
    },
    {
        emoji: "👟",
        name: "Shoes"
    },
    {
        emoji: "📱",
        name: "Phone"
    },
    {
        emoji: "🔑",
        name: "Keys"
    }
];


/* ---------- START LEVEL ---------- */

function startLevel() {

    currentRound = 0;
    currentGame = 0;

    score = 0;
    attempts = 0;
    hintsUsed = 0;

    performance = {
        match: 0,
        missing: 0,
        object: 0
    };

    showScreen("gameScreen");

    nextRound();
}


/* ---------- SCREEN CONTROL ---------- */

function showScreen(screenId) {

    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active");
    });

    document.getElementById(screenId).classList.add("active");
}


/* ---------- ROUND CONTROL ---------- */

function nextRound() {

    currentRound++;

    document.getElementById("nextButton").classList.add("hidden");
    document.getElementById("hintButton").classList.remove("hidden");

    document.getElementById("feedback").textContent = "";

    updateProgress();

    if (currentRound <= 3) {

        currentGame = 1;
        setupMatchGame();

    }else if (currentRound <= 6) {

    currentGame = 2;
    setupDifferentGame();

}  else if (currentRound <= 9) {

        currentGame = 3;
        setupObjectGame();

    } else {

        completeLevel();
    }
}


/* ---------- PROGRESS ---------- */

function updateProgress() {

    document.getElementById("roundText").textContent =
        `Round ${Math.min(currentRound, totalRounds)} / ${totalRounds}`;

    let percentage =
        ((currentRound - 1) / totalRounds) * 100;

    document.getElementById("progressBar").style.width =
        percentage + "%";
}


/* =========================================
   GAME 1
   FIND THE MATCH
========================================= */

let firstCard = null;
let secondCard = null;
let lockBoard = false;

function setupMatchGame() {

    document.getElementById("gameNumber").textContent =
        `Game 1 of 3`;

    document.getElementById("gameName").textContent =
        "🧩 Find the Match";

    document.getElementById("question").textContent =
        "Find the two matching objects.";

    let numberOfPairs;

    if (currentRound === 1) {
        numberOfPairs = 2;
    } else if (currentRound === 2) {
        numberOfPairs = 3;
    } else {
        numberOfPairs = 4;
    }

    let selectedObjects =
        objects.slice(0, numberOfPairs);

    let cards = [];

    selectedObjects.forEach(object => {
        cards.push(object);
        cards.push(object);
    });

    cards = shuffle(cards);

    let area = document.getElementById("gameArea");

    area.innerHTML = `
        <div class="card-grid">
            ${cards.map((object, index) => `
                <button
                    class="memory-card"
                    data-name="${object.name}"
                    data-index="${index}"
                    onclick="flipCard(this)">
                    ❓
                </button>
            `).join("")}
        </div>
    `;

    firstCard = null;
    secondCard = null;
    lockBoard = false;
}


function flipCard(card) {

    if (
        lockBoard ||
        card.classList.contains("revealed") ||
        card.classList.contains("matched")
    ) {
        return;
    }

    let objectName = card.dataset.name;

    let object =
        objects.find(item => item.name === objectName);

    card.textContent = object.emoji;

    card.classList.add("revealed");

    if (!firstCard) {

        firstCard = card;
        return;
    }

    secondCard = card;

    attempts++;

    if (
        firstCard.dataset.name ===
        secondCard.dataset.name
    ) {

        firstCard.classList.add("matched");
        secondCard.classList.add("matched");

        performance.match++;
        score++;

        showFeedback("🌟 Wonderful! You found a match!");

        firstCard = null;
        secondCard = null;

        checkMatchComplete();

    } else {

        lockBoard = true;

        showFeedback("💡 That's okay. Let's try another pair.");

        setTimeout(() => {

            firstCard.textContent = "❓";
            secondCard.textContent = "❓";

            firstCard.classList.remove("revealed");
            secondCard.classList.remove("revealed");

            firstCard = null;
            secondCard = null;

            lockBoard = false;

        }, 1000);
    }
}


function checkMatchComplete() {

    let unmatched =
        document.querySelectorAll(
            ".memory-card:not(.matched)"
        );

    if (unmatched.length === 0) {

        document.getElementById("hintButton")
            .classList.add("hidden");

        document.getElementById("nextButton")
            .classList.remove("hidden");
    }
}


/* =========================================
   GAME 2
   WHICH ONE IS DIFFERENT?
========================================= */

const differentRounds = [

    // ROUND 4
    {
        items: ["🍎", "🍎", "🍌"],
        answer: "🍌"
    },

    // ROUND 5
    {
        items: ["🐶", "🐶", "🐱", "🐶"],
        answer: "🐱"
    },

    // ROUND 6
    {
        items: ["🚗", "🚗", "🚌", "🚗", "🚗", "🚗"],
        answer: "🚌"
    }

];


function setupDifferentGame() {

    document.getElementById("gameNumber").textContent =
        "Game 2 of 3";

    document.getElementById("gameName").textContent =
        "🔍 Which One Is Different?";

    document.getElementById("question").textContent =
        "Look carefully. Which one is different?";


    // Round 4 becomes index 0
    // Round 5 becomes index 1
    // Round 6 becomes index 2

    let roundIndex = currentRound - 4;

    let data = differentRounds[roundIndex];

    let area = document.getElementById("gameArea");


    area.innerHTML = `
        <div class="different-grid">

            ${data.items.map(item => `

                <button
                    class="different-item"
                    onclick="answerDifferent('${item}')">

                    ${item}

                </button>

            `).join("")}

        </div>
    `;
}


function answerDifferent(answer) {

    attempts++;

    let roundIndex = currentRound - 4;

    let correctAnswer =
        differentRounds[roundIndex].answer;


    if (answer === correctAnswer) {

        score++;

        performance.different++;

        showFeedback(
            "🌟 Great job! You found the different one!"
        );

        finishCurrentRound();

    } else {

        showFeedback(
            "💡 That's okay. Look carefully and try again!"
        );

    }
}


/* =========================================
   GAME 3
   PICK THE CORRECT OBJECT
========================================= */

const objectQuestions = [

    {
        question:
            "Which object do you use to brush your teeth?",

        answer: "Toothbrush",

        options: ["Toothbrush", "Book", "Shoes"]
    },

    {
        question:
            "Which object can you read?",

        answer: "Book",

        options: ["Book", "Cup", "Keys"]
    },

    {
        question:
            "Which object do you wear on your feet?",

        answer: "Shoes",

        options: ["Shoes", "Phone", "Cup"]
    },

    {
        question:
            "Which object can you use to make a phone call?",

        answer: "Phone",

        options: ["Phone", "Book", "Toothbrush"]
    }
];


function setupObjectGame() {

    document.getElementById("gameNumber").textContent =
        "Game 3 of 3";

    document.getElementById("gameName").textContent =
        "👀 Pick the Object";

    let questionIndex =
        currentRound - 7;

    let data =
        objectQuestions[questionIndex];

    document.getElementById("question").textContent =
        data.question;

    document.getElementById("gameArea").innerHTML = `

        <div class="option-grid">

            ${data.options.map(name => {

                let object =
                    objects.find(
                        item => item.name === name
                    );

                return `
                    <button
                        class="object-option"
                        onclick="answerObject('${name}')">

                        <span class="object-emoji">
                            ${object.emoji}
                        </span>

                        ${name}

                    </button>
                `;

            }).join("")}

        </div>
    `;
}


function answerObject(answer) {

    attempts++;

    let questionIndex =
        currentRound - 7;

    let correctAnswer =
        objectQuestions[questionIndex].answer;

    if (answer === correctAnswer) {

        score++;
        performance.object++;

        showFeedback(
            "🌟 Wonderful! That's right!"
        );

        finishCurrentRound();

    } else {

        showFeedback(
            "💡 Let's try again."
        );
    }
}


/* =========================================
   HINT SYSTEM
========================================= */

function showHint() {

    hintsUsed++;

    let hint = "";

    if (currentGame === 1) {

        hint =
            "💡 Look for two objects that are the same.";

    } else if (currentGame === 2) {

        hint =
            "💡 Look for the object that is not the same as the others.";

    } else {

        let questionIndex =
            currentRound - 7;

        let answer =
            objectQuestions[questionIndex].answer;

        hint =
            `💡 Think about what you would normally use.`;
    }

    showFeedback(hint);
}


/* =========================================
   FINISH ROUND
========================================= */

function finishCurrentRound() {

    document.getElementById("hintButton")
        .classList.add("hidden");

    document.getElementById("nextButton")
        .classList.remove("hidden");

    if (currentRound === totalRounds) {

        document.getElementById("nextButton")
            .textContent = "Finish Level";

        document.getElementById("nextButton")
            .onclick = completeLevel;
    }
}


/* =========================================
   LEVEL COMPLETE
========================================= */

function completeLevel() {

    currentRound = totalRounds;

    document.getElementById("progressBar")
        .style.width = "100%";

    document.getElementById("roundText")
        .textContent = "Level Complete";

    showScreen("completeScreen");
}


/* =========================================
   LEVEL 2
========================================= */

function showComingSoon() {

    showScreen("level2Screen");
}


/* =========================================
   RESTART
========================================= */

function restartLevel() {

    showScreen("welcomeScreen");

    document.getElementById("progressBar")
        .style.width = "0%";

    document.getElementById("roundText")
        .textContent = "Round 1 / 9";
}


/* =========================================
   FEEDBACK
========================================= */

function showFeedback(message) {

    document.getElementById("feedback")
        .textContent = message;
}


/* =========================================
   SHUFFLE
========================================= */

function shuffle(array) {

    return array.sort(
        () => Math.random() - 0.5
    );
}