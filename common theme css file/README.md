# Shared styles — theme.css & components.css

Common design system for the team. Every page should link both files so the whole site looks consistent, no matter who built which feature.

## Files

- `theme.css` — colors, fonts, spacing variables, and base styles (body, headings, links)
- `components.css` — reusable classes for buttons, cards, inputs, and badges, built on top of the variables in `theme.css`

## How to use

1. Copy both files into `assets/css/` in the repo (if not already there).
2. In the `<head>` of your HTML page, add these links **above** your own CSS file, in this order:

```html
<link href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&family=Poppins:wght@600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../assets/css/theme.css">
<link rel="stylesheet" href="../assets/css/components.css">
<link rel="stylesheet" href="your-own-styles.css">
```

Adjust the relative path (`../assets/css/`) depending on where your HTML file sits in the folder structure.

3. In your own CSS, replace hardcoded colors and fonts with the shared variables (see below) instead of inventing new ones.

## Using the theme variables

| Variable | Use for |
|---|---|
| `--primary` | Main brand color (buttons, links, highlights) |
| `--secondary` | Accent/highlight color |
| `--bg` | Page background |
| `--bg-card` | Card/panel background |
| `--text` | Main text color |
| `--text-muted` | Secondary/supporting text |
| `--guardian-primary`, `--guardian-bg` | Caregiver/guardian-facing sections |
| `--success`, `--alert` | Status colors |
| `--font-heading`, `--font-body` | Fonts |
| `--radius` | Corner rounding |
| `--shadow` | Card drop shadow |
| `--spacing-touch` | Minimum padding for tappable elements |

Example:
```css
.my-custom-box {
  background: var(--bg-card);
  color: var(--text);
  border-radius: var(--radius);
}
```

## Using the component classes

| Class | What it does |
|---|---|
| `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-large` | Buttons |
| `.card`, `.card-guardian` | Cards/panels |
| `.input` | Text inputs |
| `.page-title`, `.page-subtitle` | Page headings |
| `.badge`, `.badge-success`, `.badge-alert` | Status badges |

Example:
```html
<button class="btn btn-primary btn-large">Take medicine</button>
<div class="card">...</div>
<input class="input" type="text" placeholder="Enter name">
```

## Rules for the team

- Don't hardcode colors or fonts in your own CSS — use the variables above.
- Don't rewrite your own button/card/input styles — use the shared classes.
- Layout, spacing, and feature-specific logic are still yours to control — this only standardizes look and feel.
- If you need a color or component that isn't covered here, ping the team lead before adding your own — we'll add it to the shared file instead of forking it.

