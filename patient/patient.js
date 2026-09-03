document.addEventListener('DOMContentLoaded', () => {
  const welcomeScreen = document.getElementById('welcome-screen');
  const loginScreen = document.getElementById('login-screen');
  const dashboardScreen = document.getElementById('dashboard-screen');

  // Screen Switcher Logic
  function showScreen(screenToShow) {
    [welcomeScreen, loginScreen, dashboardScreen].forEach(screen => {
      if (screen) {
        screen.classList.remove('active');
        screen.classList.add('hidden');
      }
    });

    setTimeout(() => {
      screenToShow.classList.remove('hidden');
      screenToShow.classList.add('active');
    }, 50);
  }

  // 1. Welcome -> Login
  const btnGetStarted = document.getElementById('btn-get-started');
  if (btnGetStarted) {
    btnGetStarted.addEventListener('click', () => {
      showScreen(loginScreen);
    });
  }

  // 2. Login -> Dashboard
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const usernameInput = document.getElementById('username');
      const name = usernameInput.value.trim() || "User";

      document.getElementById('user-greeting').textContent = `👋 Welcome, ${name}!`;
      showScreen(dashboardScreen);
    });
  }

  // 3. Navigation Placeholders
  const btnGames = document.getElementById('btn-games');
  if (btnGames) {
    btnGames.addEventListener('click', () => {
      alert("Opening Cognitive Games Module...");
      // window.location.href = "../games/games.html";
    });
  }

  const btnReminders = document.getElementById('btn-reminders');
  if (btnReminders) {
    btnReminders.addEventListener('click', () => {
      alert("Opening Daily Reminders Module...");
      // window.location.href = "../reminders/reminders.html";
    });
  }

  const btnProgress = document.getElementById('btn-progress');
  if (btnProgress) {
    btnProgress.addEventListener('click', () => {
      alert("Opening Progress Tracker Module...");
      // window.location.href = "../progress/progress.html";
    });
  }

  // 4. Logout -> Welcome
  const btnLogout = document.getElementById('btn-logout');
  if (btnLogout) {
    btnLogout.addEventListener('click', () => {
      document.getElementById('login-form').reset();
      showScreen(welcomeScreen);
    });
  }
});
