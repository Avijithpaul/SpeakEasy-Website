# SpeakEasy

**Speak with confidence.**

SpeakEasy is a modern English learning platform built for people who already know grammar and vocabulary — but freeze when they need to *speak*. It turns practice into real, browser-based sessions: free speaking, flashcards, read-aloud accuracy checks, conversations, presentations, interviews, and debates — all with live speech recognition, a warm branded UI, and cinema-grade motion.

This repository is a full-stack demo of that product: a marketing site, a practice studio dashboard, seven interactive practice modes, a light/night theme system, and a small Express API that serves practice content.

---

## Table of contents

- [About the platform](#about-the-platform)
- [Who it’s for](#who-its-for)
- [Website overview](#website-overview)
- [Marketing pages](#marketing-pages)
- [Practice Studio](#practice-studio)
- [All practice modes](#all-practice-modes)
- [Platform features](#platform-features)
- [Tech stack](#tech-stack)
- [Project structure](#project-structure)
- [API](#api)
- [Getting started](#getting-started)
- [Browser support](#browser-support)
- [Notes](#notes)

---

## About the platform

SpeakEasy was designed around one idea: **speaking is a skill you build by speaking**, not by reading about speaking.

Traditional English study focuses on worksheets, apps that quiz vocabulary, or videos you watch passively. SpeakEasy flips that. Every practice mode puts the learner in an active role — talking into the microphone, flipping cards, answering interview questions, defending a debate position — with immediate visual feedback in the browser.

The product experience has two sides:

1. **Marketing site** — Home, Features, and About (including a Contact Us flow that opens a Gmail draft). This is where visitors learn the mission, see what’s possible, and start learning.
2. **Practice Studio** — A dashboard layout with sidebar navigation, daily goals, streak tracking, recommended sessions, and deep links into seven practice modules.

Together they form a cohesive SpeakEasy experience: warm orange–coral–amber branding, soft ambient backgrounds, Framer Motion page transitions, and a layout that works on desktop and mobile.

---

## Who it’s for

- Learners who understand English but lack **speaking confidence**
- Students preparing for **interviews**, **presentations**, or **debates**
- Professionals who need **everyday conversation** practice
- Anyone who wants structured, repeatable practice without installing a separate speech app

Voice features use the browser’s built-in Web Speech API — no account and no cloud recording storage for speech. Recognition and synthesis happen locally in supported browsers.

---

## Website overview

| Area | Routes | Layout |
|------|--------|--------|
| Marketing | `/`, `/features`, `/about` | Top navbar + footer |
| Practice Studio | `/practice` and all `/practice/*` modes | Navbar + sidebar + dashboard header |

### Navigation

- **Home** — Immersive introduction and calls to action
- **Features** — Product capabilities and links into practice
- **Practice** — Studio hub and all learning modules
- **About** — Story, team, values, milestones, and contact
- **Theme toggle** — Light mode and night mode (saved in local storage)
- **Footer** — Practice links, company links, social placeholders, legal placeholders

---

## Marketing pages

### Home (`/`)

The landing page introduces SpeakEasy as a speaking-first product:

- Hero with strong brand messaging and a primary CTA into Practice
- Feature highlights and “how it works” style sections
- Social proof / testimonials and visual content
- Final call-to-action to start practicing

### Features (`/features`)

A deeper look at what the platform offers:

- Main product capabilities
- Additional and technical feature callouts
- Links that take users straight into relevant practice modes

### About (`/about`)

Explains the mission and the people behind the product:

- **Our Story** — Why SpeakEasy exists (speaking confidence as the missing piece)
- Culture imagery and core values (accessibility, science-based methods, privacy-first voice handling, continuous growth)
- Team introductions
- Journey / milestones timeline
- **Contact Us** (`#contact`) — Form that validates name, email, subject, and message, then opens a **pre-filled Gmail compose** window to `hello@speakeasy.app` (no server-side email API required)
- Community CTA linking back to Practice

Footer **Contact** also deep-links to `/about#contact`.

---

## Practice Studio

### Hub dashboard (`/practice`)

The Practice Studio home is a personalized learning hub:

- **Welcome banner** — SpeakEasy branding, motivational headline, streak context
- **Today’s Goals** — Progress toward daily speaking, vocabulary, and reading targets
- **SpeakEasy Streak** — Weekly day-by-day completion view
- **SpeakEasy Recommends** — Suggested next sessions (speaking, vocabulary, interview, etc.)
- **All SpeakEasy Modes** — Cards for every practice module (loaded from the API, with an offline fallback)

### Studio chrome

- **Sidebar** — Studio / Core Skills / Real-World Skills navigation; SpeakEasy tip card; mobile drawer
- **Dashboard header** — Contextual page title and subtitle, streak pill, theme toggle (mobile), user avatar
- **Ambient background** — Soft warm glowing orbs behind the practice UI
- **Page transitions** — Smooth enter/exit animations when switching modes
- **Back navigation** — Practice modules can return to the hub via a shared back control

### Mode groups in the sidebar

| Group | Modes |
|-------|--------|
| Studio | My Practice (hub) |
| Core Skills | Free Speaking, Vocabulary, Read Aloud |
| Real-World Skills | Interview Prep, Presentations, Conversations, Debate |

---

## All practice modes

### 1. Free Speaking — `/practice/speaking`

**Goal:** Build fluency by talking freely about a prompt, with live transcription.

What you can do:

- Browse rotating **speaking prompts** across categories such as Behavioral, Personal, Opinion, Everyday, Professional, Career, and Culture
- See **difficulty** and **category** badges, plus short **hint chips**
- Watch the prompt appear with a **typewriter** effect
- Start/stop recording with a large **microphone button** and pulsing rings
- See a **sound-wave visualizer** while speaking
- Track **session timer**, **daily goal**, and **word count**
- Read a **live transcript** (final text + interim speech)
- Switch to a **new prompt**, or **clear** the session

Requires a browser with speech recognition support.

---

### 2. Vocabulary Flashcards — `/practice/vocabulary`

**Goal:** Learn words deeply with flip cards and spaced-repetition-style ratings.

What you can do:

- Study a deck of vocabulary cards (word, phonetic spelling, level, category)
- **Tap to flip** and reveal meaning, synonyms, and an example sentence
- **Listen** to pronunciation via browser text-to-speech
- Rate each card **Hard / Good / Easy** (suggested review intervals in the UI)
- Track **daily vocabulary goal**, remaining cards, and easy/hard stats
- Use **Previous** and **Shuffle**; celebrate completions with a particle burst
- Loop the deck when you finish

---

### 3. Read Aloud — `/practice/reading`

**Goal:** Improve pronunciation and accuracy by reading passages out loud.

What you can do:

- Choose a passage by difficulty (for example Easy, Medium, Hard)
- Read the passage aloud while the mic captures speech
- View a **live transcript** of what you said
- **Compare** your speech to the original text with word-level match highlighting and an accuracy percentage
- Reset and try again, or pick another passage

---

### 4. Conversations — `/practice/conversation`

**Goal:** Practice real-world dialogues turn by turn.

What you can do:

- Choose a scenario such as restaurant ordering, hotel check-in, doctor visit, shopping, phone calls, or similar everyday situations
- Follow a scripted dialogue with NPC lines and “your turn” prompts
- **Listen** to NPC lines with text-to-speech
- Speak your responses on your turn
- Track progress through the dialogue steps
- Finish and review everything you said; practice again or try another scenario

Scenarios are loaded from the Express API (`/api/conversation-scenarios`). Run the backend (or `npm run dev:full`) for full content.

---

### 5. Presentation Skills — `/practice/presentation`

**Goal:** Rehearse timed presentations with structure and delivery feedback.

What you can do:

- Pick a presentation topic (business, education, personal intro, persuasive, informative, technical, etc.)
- Use a **countdown timer** with start, pause, resume, and reset
- Record while presenting and see a **live transcript**
- Track **word count** and approximate **words per minute (WPM)**
- Follow on-screen tips for the selected topic
- Get a “time’s up” signal when the timer ends

---

### 6. Interview Simulator — `/practice/interview`

**Goal:** Prepare answers for common interview question types.

What you can do:

- Practice across categories such as **Behavioral**, **Situational**, **Common**, and **Technical**
- Move through a set of questions with a **progress** indicator
- **Listen** to each question via text-to-speech
- Show or hide coaching **tips** (for example STAR-style guidance)
- Record your answer, review the transcript, retry, and track word count
- Navigate **Previous / Next** between questions

Interview content is loaded from the Express API (`/api/interview-categories`).

> Note: The UI may describe coaching/tips in an “AI-style” way; in this demo, answers are transcribed and stored in the session — there is no separate AI scoring service.

---

### 7. Debate Practice — `/practice/debate`

**Goal:** Build persuasive speaking by arguing for or against a position under time pressure.

What you can do:

- Choose a debate topic (work, technology, education, environment, and more)
- Select a side (**Pro** or **Con**)
- Prepare using listed arguments for your side and the opposition
- Enter a **timed debate** (for example 90 seconds) with microphone recording
- See timer progress, key-point reminders, and a live transcript
- Finish early or wait for the clock; review word count, duration, WPM, and your full argument
- Try again or pick a new topic

---

## Platform features

### Theme system

- **Light** and **Night** modes
- Preference stored in `localStorage`
- Applied via `data-theme` on the document for CSS variables and Tailwind dark styling
- Toggle available from the navbar and practice header (mobile)

### Brand and visual design

- SpeakEasy accent colors (warm orange, coral, amber) shared across marketing and practice
- Soft ambient backgrounds, glass-style cards, and gentle motion
- Per-module accent tints so each practice mode feels distinct but on-brand

### Motion system (Framer Motion)

Reusable building blocks in `src/components/motion/` and `src/lib/motion/`:

- **PageTransition** — Route enter/exit animations
- **MotionCard** — Spring hover, optional tilt and float
- **GlowingButton** / **GlowingBorder** — Interactive accent states
- **AnimatedHeading** / **StaggeredText** / **TypewriterText** — Text reveals
- **AmbientBackground** — Soft floating color orbs
- **SoundWaveVisualizer** — Live audio-style bars while recording
- **CelebrationBurst** — Particle celebration on vocabulary wins

### Speech

- **Recognition** — `useSpeechRecognition` hook (Web Speech API)
- **Synthesis** — Browser `speechSynthesis` for listening to prompts, NPC lines, and vocabulary

### Privacy-minded voice practice

Voice capture is intended for in-browser practice feedback. SpeakEasy’s product messaging emphasizes that practice speech stays in the browser experience rather than being uploaded as a core product flow.

### Contact

- About page contact form → opens Gmail with a ready-to-send draft
- Destination email configured in the About page (default: `hello@speakeasy.app`)

---

## Tech stack

### Frontend

| Technology | Role |
|------------|------|
| React 19 | UI components and app state |
| Vite 7 | Dev server and production builds |
| React Router DOM 7 | Client-side routing and layouts |
| Tailwind CSS 3 | Utility styling and responsive layout |
| Framer Motion 12 | Animations and page transitions |
| CSS variables + App CSS | Theming (light/night) and shared design tokens |

### Backend

| Technology | Role |
|------------|------|
| Node.js | Runtime |
| Express 5 | REST API |
| CORS | Cross-origin access for the Vite app |
| JSON data files | Practice modes, conversations, interview questions |

### Tooling

- ESLint, PostCSS, Autoprefixer
- `concurrently` for running frontend + API together

---

## Project structure

```text
english-practice/
├── public/
├── server/
│   ├── index.js                 # Express API
│   └── data/
│       ├── practiceModes.json
│       ├── conversationScenarios.json
│       └── interviewCategories.json
├── src/
│   ├── App.jsx                  # Routes + ThemeProvider
│   ├── App.css                  # Theme tokens and global UI
│   ├── main.jsx
│   ├── components/              # Practice modes, navbar, footer, UI, motion
│   ├── pages/                   # Home, Features, About, Practice hub
│   ├── layouts/                 # MarketingLayout, DashboardLayout
│   ├── hooks/                   # useTheme, useSpeechRecognition
│   ├── data/                    # Client prompts, vocab, API fallbacks
│   └── lib/                     # API client, brand tokens, motion variants
├── package.json
└── README.md
```

---

## API

Default base URL: `http://localhost:4000/api`  
(Override with `VITE_API_BASE_URL` if needed.)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/practice-modes` | Catalog of practice modules for the hub |
| GET | `/api/conversation-scenarios` | Dialogue scenarios for Conversation mode |
| GET | `/api/interview-categories` | Interview categories and questions |

If the API is unavailable, the Practice hub falls back to `src/data/practiceModesFallback.js`. Speaking, Vocabulary, Reading, Presentation, and Debate also ship with client-side content so they remain usable without the server.

---

## Getting started

### Install

```bash
npm install
```

### Run frontend only

```bash
npm run dev
```

Opens the Vite app (typically `http://localhost:5173`).

### Run API only

```bash
npm run dev:server
```

Starts Express on port **4000** by default.

### Run frontend + API together (recommended)

```bash
npm run dev:full
```

Use this when you want Conversation, Interview, and live practice-mode data from the server.

### Production build

```bash
npm run build
npm run preview
```

### Other scripts

```bash
npm run lint      # ESLint
npm start         # Run API server (same as production-style start)
```

---

## Browser support

| Feature | Notes |
|---------|--------|
| Core website & practice UI | Modern Chromium, Firefox, Safari |
| Speech recognition (mic practice) | Best on **Chrome**, **Edge**, and **Safari** (Web Speech API) |
| Text-to-speech (listen buttons) | Supported in most modern browsers |

If speech recognition is unsupported, Speaking mode shows a clear browser-not-supported message.

---

## Notes

- SpeakEasy is a polished **product demo** of an English speaking practice platform — strong UI/UX, modular React architecture, and immersive motion — not a full production LMS with user accounts or cloud AI grading.
- Dashboard **streaks** and **daily goals** are illustrative UI (mock progress), designed to show how a real learning hub would feel.
- **Interview** practice records and displays spoken answers with tips; it does not call an external AI scoring API in this codebase.
- **Contact Us** opens Gmail with a draft; it does not send email through the Express server.

---

## License

Private project (`"private": true` in `package.json`). All rights reserved by the project owner unless otherwise stated.
