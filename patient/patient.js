// Patient Interface JavaScript

// Show a particular page
function showPage(pageId) {
    const pages = document.querySelectorAll(".page");

    pages.forEach(function(page) {
        page.classList.add("hidden");
    });

    const selectedPage = document.getElementById(pageId);

    if (selectedPage) {
        selectedPage.classList.remove("hidden");
    }
}

// Get Started button
function getStarted() {
    showPage("loginPage");
}

// Login button
function loginPatient() {
    const name = document.getElementById("patientName").value.trim();
    const password = document.getElementById("patientPassword").value.trim();

    if (name === "" || password === "") {
        alert("Please enter your name and password.");
        return;
    }

    document.getElementById("patientWelcome").textContent =
        "Welcome, " + name + "!";

    showPage("dashboardPage");
}

// Games
function openGames() {
    alert("Cognitive Games module will open here.");
}

// Reminders
function openReminders() {
    alert("Reminders module will open here.");
}

// Progress
function openProgress() {
    alert("Progress module will open here.");
}

// Logout
function logoutPatient() {
    showPage("welcomePage");
}
