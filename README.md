# week3-assignment

# 🍪 A Cookie Clicker Game

A simple interactive **Cookie Clicker** style browser game built with HTML, CSS, and JavaScript.
Click the cookie to earn cookies, buy upgrades, and let the cookies roll in automagically!

## REFLECTIONS

MAJOR!
NaN (Not a Number) Errors in Cookie Count - I Spent wayyy to long on this and have to admit that i'm still not 100% happy with the syntax.

Issue:
The cookie count displayed as NaN after purchasing upgrades.

Why it happened:
This occurred because values retrieved from localStorage or the upgrade API were not always valid numbers. undefined, null, or string-based values. (yes I know Sam warned us about this and 'parsing' as a 'number' to catch it, but I still messed this up.)

Lesson Learned:
Always validate and sanitize numeric values before using them. Using isNaN() checks with fallback defaults protected the game state from 'corruption', (or in my case I think I was simply calling the wrong value from memory).
Googled solution.

MINORS!
Issue:
Using incorrect CSS syntax e.g. (src(...)) caused the background image not to render, along with other formating errors and inconsistencies.

Lesson Learned:
In CSS, always use url("...") for images — not src(...).

Google/MDN examples of correct syntax to avoid simple typo errors

(Also, understanding relative paths is crucial when linking assets across directories.)

Issue:
Browser console showed a 404 for favicon.ico.

Lesson Learned:
Browsers request a favicon by default. (the little icon in the address bar)
Either add one or can safely ignore it — it doesn’t affect game functionality. googled solution and added a cookie-themed favicon!
======

## 🚀 Features

- 🍪 Click the cookie to earn cookies manually.
- 🛍️ Purchase upgrades from the shop to increase auto-cookie rate.
- 💾 Game state saved with `localStorage` (cookie count, upgrades, progress).
- 🔄 Auto-increment cookies every second based on upgrades.
- 🎨 Cookie-themed UI with textured backgrounds and images.
- 🔊 Click sound effect controlled by Sound On/Off button.
- 🌓 Dark mode / Light mode toggle.
- 🆕 New Game button resets everything.

======

## 📁 Folder Structure

/index.html (html)
/style.css (CSS)
/main.js (javaScript)
/README.md (this file)
/user-stores.md (client stories and associated design information )
/assets/ (assets directory)
├── cookies-icon.png (favicon for the browser tab)
├── click.mp3 (click sound effect)
└── cookie-background.jpg (background image for .sidebar .main and .shop sections)

======

## 🧪 How to Run

1. Download or clone the repository.
2. Open `index.html` in a modern browser (or use Live Server in VS Code).
3. Click the cookie and enjoy!

======

## 🔧 Configuration

You can customize the following assets:

- `assets/click.mp3` → Replace with your own click sound.
- `assets/cookies-icon.png` → Replace favicon with any 32x32 or 16x16 PNG.
- `assets/cookie-background1.jpg` → Background for `.sidebar`area.
- `assets/cookie-background2.jpg` → Background for `.main`area.
- `assets/cookie-background3.jpg` → Background for `.shop`area.

======

## 🧼 Known Improvements for the Future

🧼 The UX needs way more love

🧼 Show cookies-per-second and cookies-per-click stats under the counter in a more pleaseing way.
🧼 Tooltip info on each conrol and upgrade button.
🧼Visual upgrade unlock system (e.g., changing button colours and using .main aread to display animations etc.).
🧼Achievements and progression milestones. (e.g. again display on .main area or have another page)
🧼 add an 'About' and/or 'Help' pages

🧼 ...

======

## 📜 License

Free to use, modify, and learn from. (learn from: ha ha ha)

======

## ✨ Author

by: Dan Gray
(assistance by: Google and MDN)
Made with frustration, tears and headaches, and of course COFFEE!

\*special thanks go out to Sam & Connor, for getting me to hate clciker games.
