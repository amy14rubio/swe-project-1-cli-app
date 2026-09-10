# Quiz App

One of my first projects, this quiz app became a project I kept building on as I grew my understanding of JavaScript and different development environments. I originally built it as a CLI assignment for JavaScript fundamentals, then challenged myself to rebuild the same idea as an Electron desktop app and finally as a React web app. Each version gave me an opportunity to learn, experiment, and apply what I had picked up along the way.

Four quiz categories (Math, Board Games, Animal Fun Facts, Classical Music), high scores, and game history, all three implementations share the same core idea even though the code isn't shared between them.

**Live demo (web app):** [https://amys-quiz-app.web.app](https://amys-quiz-app.web.app)

<img width="1328" height="763" alt="Screenshot 2026-09-09 at 10 21 48 PM" src="https://github.com/user-attachments/assets/f5eba79c-f091-4280-8d29-8b0faaae235a" />


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
