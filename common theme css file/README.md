:root {
  /* Colors — calm, low-stimulation palette for dementia patients */
  --primary: #4a7c8c;        /* soft teal-blue — calming, not clinical */
  --primary-dark: #345c69;
  --secondary: #e8a548;      /* warm muted gold — gentle highlights/CTAs */
  --bg: #faf8f3;             /* warm off-white — less glare than stark white */
  --bg-card: #ffffff;
  --text: #2d3436;           /* near-black — softer on eyes than pure black */
  --text-muted: #5a6570;

  /* Guardian/caregiver mode — same family, deeper tone */
  --guardian-primary: #3d5a80;
  --guardian-bg: #eef2f6;

  /* Status colors — muted, never harsh */
  --success: #6ba368;
  --alert: #c96b5a;          /* soft terracotta instead of harsh red */

  /* Typography */
  --font-heading: 'Poppins', 'Atkinson Hyperlegible', sans-serif;
  --font-body: 'Atkinson Hyperlegible', 'Inter', sans-serif;
  --font-size-base: 18px;    /* larger default for readability */
  --font-size-large: 22px;   /* key actions / patient-facing text */

  /* Spacing & shape */
  --radius: 12px;
  --shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  --spacing-touch: 16px;     /* minimum padding for tappable elements */
}

* {
  box-sizing: border-box;
}

body {
  font-size: var(--font-size-base);
  font-family: var(--font-body);
  color: var(--text);
  background: var(--bg);
  line-height: 1.6;
  margin: 0;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
  color: var(--text);
}

a {
  color: var(--primary);
}

/* ===== Components ===== */

/* Buttons */
.btn {
  font-family: var(--font-body);
  font-size: 16px;
  font-weight: 600;
  padding: var(--spacing-touch) 24px;
  border-radius: var(--radius);
  border: none;
  cursor: pointer;
  transition: opacity 0.15s ease;
}
.btn:hover { opacity: 0.9; }
.btn:active { opacity: 0.8; }

.btn-primary {
  background: var(--primary);
  color: #ffffff;
}
.btn-secondary {
  background: var(--secondary);
  color: var(--text);
}
.btn-large {
  font-size: var(--font-size-large);
  padding: 20px 32px;
}

/* Cards */
.card {
  background: var(--bg-card);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 24px;
  margin-bottom: 16px;
}
.card-guardian {
  background: var(--guardian-bg);
}

/* Inputs */
.input {
  font-family: var(--font-body);
  font-size: 16px;
  padding: 14px 16px;
  border: 2px solid var(--text-muted);
  border-radius: var(--radius);
  width: 100%;
}
.input:focus {
  border-color: var(--primary);
  outline: none;
}

/* Page headings */
.page-title {
  font-family: var(--font-heading);
  font-size: 28px;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 8px;
}
.page-subtitle {
  font-size: 16px;
  color: var(--text-muted);
  margin-bottom: 24px;
}

/* Alert / status badges */
.badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
}
.badge-success {
  background: #e8f3e6;
  color: var(--success);
}
.badge-alert {
  background: #f6e6e2;
  color: var(--alert);
}
