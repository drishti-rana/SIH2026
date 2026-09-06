// Mock data (sample scores for now)
const gameData = [
	{ game: "Memory Match", score: 85, time: 155, date: "2026-09-01" },
	{ game: "Memory Match", score: 72, time: 180, date: "2026-09-02" },
	{ game: "Sequence Game", score: 90, time: 140, date: "2026-09-02" },
	{ game: "Memory Match", score: 78, time: 165, date: "2026-09-03" },
	{ game: "Sequence Game", score: 65, time: 200, date: "2026-09-03" },
	{ game: "Memory Match", score: 88, time: 150, date: "2026-09-03" }
];

// Calculate summary numbers
function calculateSummary() {
	const totalGames = gameData.length;
	const bestScore = Math.max(...gameData.map(item => item.score));
	const avgScore = Math.round(gameData.reduce((sum, item) => sum + item.score, 0) / totalGames);
	const totalAttempts = totalGames;
	const avgTimeSeconds = Math.round(gameData.reduce((sum, item) => sum + item.time, 0) / totalGames);
	const avgMinutes = Math.floor(avgTimeSeconds / 60);
	const avgSeconds = avgTimeSeconds % 60;

	document.getElementById("gamesPlayed").textContent = totalGames;
	document.getElementById("bestScore").textContent = bestScore;
	document.getElementById("avgScore").textContent = avgScore;
	document.getElementById("totalAttempts").textContent = totalAttempts;
	document.getElementById("avgTime").textContent = `${avgMinutes} min ${avgSeconds} sec`;
}

// Show Recent Activity
function showRecentActivity() {
	const list = document.getElementById("recentActivity");
	list.innerHTML = "";

	const recent = gameData.slice().reverse().slice(0, 5);

	recent.forEach(item => {
		const li = document.createElement("li");
		li.textContent = `${item.game} — Score: ${item.score}`;
		list.appendChild(li);
	});
}

// Simple Bar Chart
function createChart() {
	const ctx = document.getElementById("progressChart").getContext("2d");

	const labels = gameData.map(item => item.date);
	const scores = gameData.map(item => item.score);

	new Chart(ctx, {
		type: "bar",
		data: {
			labels: labels,
			datasets: [{
				label: "Score",
				data: scores,
				backgroundColor: "#3498db",
				borderRadius: 6
			}]
		},
		options: {
			responsive: true,
			plugins: {
				legend: { display: false }
			},
			scales: {
				y: {
					beginAtZero: true,
					max: 100
				}
			}
		}
	});
}

// Run everything when page loads
window.onload = function() {
	calculateSummary();
	showRecentActivity();
	createChart();
};
