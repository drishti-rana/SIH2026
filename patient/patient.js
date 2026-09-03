document.addEventListener('DOMContentLoaded', () => {
  // Screen Elements
  const welcomeScreen = document.getElementById('welcome-screen');
  const loginScreen = document.getElementById('login-screen');
  const dashboardScreen = document.getElementById('dashboard-screen');

  // Helper Function: Switch Active Screen
  function showScreen(screenToShow) {
    [welcomeScreen, loginScreen, dashboardScreen].forEach(screen => {
      screen.classList.remove('active');
      screen.classList.add('hidden');
    });
    screenToShow.classList.remove('hidden');
    screenToShow.classList.add('active');
  }

  // 1. Welcome -> Login
  document.getElementById('btn-get-started').addEventListener('click', () => {
    showScreen(loginScreen);
  });

  // 2. Login -> Dashboard
  document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    
    if (username.trim()) {
      document.getElementById('user-greeting').textContent = `👋 Welcome, ${username}!`;
    }
    showScreen(dashboardScreen);
  });

  // 3. Navigation Buttons (Placeholders for integration)
  document.getElementById('btn-games').addEventListener('click', () => {
    alert("Navigating to Cognitive Games module...");
    // Future integration: window.location.href = "../games/games.html";
  });

  document.getElementById('btn-reminders').addEventListener('click', () => {
    alert("Navigating to Reminders module...");
    // Future integration: window.location.href = "../reminders/reminders.html";
  });

  document.getElementById('btn-progress').addEventListener('click', () => {
    alert("Navigating to Progress module...");
    // Future integration: window.location.href = "../progress/progress.html";
  });

  // 4. Logout -> Welcome
  document.getElementById('btn-logout').addEventListener('click', () => {
    showScreen(welcomeScreen);
  });
});
