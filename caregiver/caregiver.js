/* =========================
   MOCK PATIENT DATA
   This can later be replaced
   with actual data from the
   Games, Progress and
   Reminder modules.
========================= */

const patientData = {

    // PATIENT OVERVIEW

    name: "Mrs. Sharma",

    age: 68,

    status: "Active Today",


    // DASHBOARD STATISTICS

    gamesPlayed: 12,

    bestScore: 85,

    progress: 75,


    // RECENT ACTIVITY

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


    // GAME PERFORMANCE

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


    // REMINDERS

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
        },

        {
            name: "Evening Exercise",
            status: "Pending"
        }

    ]

};


/* =========================
   CALCULATE PENDING REMINDERS
========================= */

const pendingReminderCount =
    patientData.reminders.filter(
        reminder => reminder.status === "Pending"
    ).length;


/* =========================
   PATIENT INFORMATION
========================= */

document.getElementById("patientName").textContent =
    patientData.name;


document.getElementById("patientAge").textContent =
    patientData.age;


/* =========================
   STATISTICS
========================= */

document.getElementById("gamesPlayed").textContent =
    patientData.gamesPlayed;


document.getElementById("bestScore").textContent =
    patientData.bestScore;


document.getElementById("progressValue").textContent =
    patientData.progress + "%";


document.getElementById("pendingReminders").textContent =
    pendingReminderCount;


/* =========================
   PROGRESS DISPLAY
========================= */

document.getElementById("progressCircleValue").textContent =
    patientData.progress + "%";


document.getElementById("progressBarValue").textContent =
    patientData.progress + "%";


document.getElementById("progressBar").style.width =
    patientData.progress + "%";


/* PROGRESS CIRCLE */

const progressCircle =
    document.getElementById("progressCircle");


progressCircle.style.background =
    `conic-gradient(
        #4caf92 0% ${patientData.progress}%,
        #edf0f4 ${patientData.progress}% 100%
    )`;


/* PROGRESS MESSAGE */

const progressMessage =
    document.getElementById("progressMessage");


if (patientData.progress >= 80) {

    progressMessage.textContent =
        "Patient is showing excellent and consistent improvement.";

}

else if (patientData.progress >= 60) {

    progressMessage.textContent =
        "Patient is showing steady and consistent improvement.";

}

else {

    progressMessage.textContent =
        "Patient may require additional support and attention.";

}


/* =========================
   RECENT ACTIVITY
========================= */

const activityContainer =
    document.getElementById("recentActivity");


patientData.recentActivity.forEach(activity => {

    const activityItem =
        document.createElement("div");


    activityItem.classList.add("activity-item");


    activityItem.innerHTML = `

        <div class="activity-info">

            <h3>${activity.game}</h3>

            <p>${activity.time}</p>

        </div>


        <div class="activity-score">

            Score: ${activity.score}

        </div>

    `;


    activityContainer.appendChild(activityItem);

});


/* =========================
   GAME PERFORMANCE
========================= */

const gamePerformanceContainer =
    document.getElementById("gamePerformance");


patientData.gamePerformance.forEach(game => {

    const row =
        document.createElement("tr");


    row.innerHTML = `

        <td>${game.game}</td>

        <td>${game.score}</td>

        <td>${game.attempts}</td>

        <td>${game.time}</td>

    `;


    gamePerformanceContainer.appendChild(row);

});


/* =========================
   REMINDER STATUS
========================= */

const reminderContainer =
    document.getElementById("reminderList");


patientData.reminders.forEach(reminder => {

    const reminderItem =
        document.createElement("div");


    reminderItem.classList.add("reminder-item");


    const statusClass =
        reminder.status === "Completed"
            ? "completed"
            : "pending";


    reminderItem.innerHTML = `

        <h3>${reminder.name}</h3>

        <span class="reminder-status ${statusClass}">

            ${reminder.status}

        </span>

    `;


    reminderContainer.appendChild(reminderItem);

});


/* =========================
   OVERALL SUMMARY
========================= */

const completedReminderCount =
    patientData.reminders.filter(
        reminder => reminder.status === "Completed"
    ).length;


document.getElementById("overallSummary").textContent =

    `${patientData.name} has played ${patientData.gamesPlayed} games and is currently showing ${patientData.progress}% overall progress. ` +

    `The best score achieved is ${patientData.bestScore}. ` +

    `${completedReminderCount} reminder has been completed, while ${pendingReminderCount} reminders are still pending and may require attention.`;