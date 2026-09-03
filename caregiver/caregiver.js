// MOCK PATIENT DATA

const patientData = {

    name: "Mrs. Sharma",

    age: 68,

    gamesPlayed: 12,

    bestScore: 85,

    progress: 75,

    pendingReminders: 3,


    recentActivity: [

        {
            game: "Memory Match",
            score: 85,
            time: "Today, 10:30 AM"
        },

        {
            game: "Memory Match",
            score: 72,
            time: "Yesterday, 5:00 PM"
        },

        {
            game: "Word Recall",
            score: 78,
            time: "Yesterday, 11:20 AM"
        }

    ],


    gamePerformance: [

        {
            game: "Memory Match",
            score: 85,
            attempts: 2,
            time: "4 min"
        },

        {
            game: "Word Recall",
            score: 78,
            attempts: 3,
            time: "5 min"
        },

        {
            game: "Pattern Puzzle",
            score: 72,
            attempts: 2,
            time: "6 min"
        }

    ],


    reminders: [

        {
            name: "Medicine",
            status: "Completed"
        },

        {
            name: "Morning Walk",
            status: "Pending"
        },

        {
            name: "Drink Water",
            status: "Pending"
        }

    ]

};



// PATIENT INFORMATION

document.getElementById("patientName").textContent =
    patientData.name;

document.getElementById("patientAge").textContent =
    patientData.age;

document.getElementById("gamesPlayed").textContent =
    patientData.gamesPlayed;

document.getElementById("bestScore").textContent =
    patientData.bestScore;

document.getElementById("progressValue").textContent =
    patientData.progress + "%";

document.getElementById("progressCircle").textContent =
    patientData.progress + "%";

document.getElementById("pendingReminders").textContent =
    patientData.pendingReminders + " Pending";



// PROGRESS BAR

document.getElementById("progressBar").style.width =
    patientData.progress + "%";



// RECENT ACTIVITY

const activityContainer =
    document.getElementById("recentActivity");


patientData.recentActivity.forEach(activity => {

    activityContainer.innerHTML += `

        <div class="activity-item">

            <div class="activity-info">

                <h3>${activity.game}</h3>

                <p>${activity.time}</p>

            </div>

            <div class="activity-score">

                Score: ${activity.score}

            </div>

        </div>

    `;

});



// GAME PERFORMANCE TABLE

const gamePerformanceContainer =
    document.getElementById("gamePerformance");


patientData.gamePerformance.forEach(game => {

    gamePerformanceContainer.innerHTML += `

        <tr>

            <td>${game.game}</td>

            <td>${game.score}</td>

            <td>${game.attempts}</td>

            <td>${game.time}</td>

        </tr>

    `;

});



// REMINDERS

const reminderContainer =
    document.getElementById("reminderList");


patientData.reminders.forEach(reminder => {

    const statusClass =
        reminder.status === "Completed"
            ? "completed"
            : "pending";


    reminderContainer.innerHTML += `

        <div class="reminder-item">

            <h3>${reminder.name}</h3>

            <p class="reminder-status ${statusClass}">

                ${reminder.status}

            </p>

        </div>

    `;

});



// OVERALL SUMMARY

document.getElementById("overallSummary").textContent =

    `${patientData.name} has played ${patientData.gamesPlayed} games 
    and is currently showing ${patientData.progress}% overall progress. 
    The best score achieved is ${patientData.bestScore}. 
    There are ${patientData.pendingReminders} pending reminders that 
    may require attention.`;