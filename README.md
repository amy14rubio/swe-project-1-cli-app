# Quiz Game

A trivia quiz game I've now built three times, once for each platform: a command-line version, an
Electron desktop app, and a React web app. What started as a CLI assignment for JS fundamentals
turned into an excuse to rebuild the same game logic across very different environments.

Three quiz categories (Math, Board Games, Animal Fun Facts), high scores, and game history, all
three implementations share the same core idea even though the code isn't shared between them.

**Live demo (web app):** [https://amys-quiz-app.web.app/](https://amys-quiz-app.web.app/)


## What's Inside

- **`src/Quiz CLI/`** — the original command-line version (Node.js), with high scores and game
  history persisted to local JSON files
- **`src/Quiz app/`** — an Electron desktop app (React + Tailwind CSS, built with electron-vite)
- **`src/quizAppWeb/`** — a React web app (Vite + Framer Motion), deployed to Firebase Hosting


## Running each version

Each subfolder is its own independent project with its own dependencies — `cd` into it and
install before running.

### CLI

```bash
cd "src/Quiz CLI"
npm install
node src/start.js
```

### Desktop app (Electron)

```bash
cd "src/Quiz app"
npm install
npm run dev             # or: npm run build:mac / build:win / build:linux to package it
```

### Web app

```bash
cd "src/quizAppWeb"
npm install
npm run dev
```


## Tech Stack

**CLI:** Node.js, prompt-sync <br>
**Desktop:** Electron, React, Tailwind CSS (via electron-vite) <br>
**Web:** React, Vite, Framer Motion, Firebase Hosting <br>
**Development Tools:** Git
