# AI Agent CLI Tool — Scaler Website Builder

## 📌 Overview

This project is a **Conversational CLI-based AI Agent** that can generate a fully functional website using **HTML, CSS, and JavaScript**.

The agent interacts with the user step-by-step, collects design requirements, and incrementally builds a high-fidelity webpage (similar to tools like Cursor or Windsurf).

---

## 🚀 Features

- 🧠 **Conversational Design Discovery**
  - Asks the user questions (one-by-one) about:
    - Purpose of website
    - Color scheme
    - Typography
    - Layout preferences
    - Sections and content

- 🔁 **Step-by-Step Agent Loop**
  - The agent does NOT generate everything at once
  - Builds the website in phases:
    1. Foundation
    2. Header
    3. Hero Section
    4. Additional Sections
    5. Footer
    6. Final Review

- 🛠 **Tool-Based Execution**
  - `WRITE_FILE` → Generates/updates `index.html`
  - `OPEN_BROWSER` → Opens final output in browser

- 🎨 **Production-Ready UI**
  - Responsive layout
  - Modern CSS (Flexbox/Grid)
  - Animations and transitions
  - Clean, semantic HTML

---

## 🧩 How It Works

1. User starts the CLI
2. Agent enters **Design Discovery Phase**
3. Agent asks questions one at a time
4. After collecting inputs → starts build loop
5. Each step:
   - Generates code
   - Writes to file
   - Waits for user input (`continue`)
6. Final step opens the webpage in browser

---

## 💻 Installation & Setup

```bash
git clone <your-repo-link>
cd <your-repo-name>
npm install
```

---

## ▶️ Usage

Run the CLI:

```bash
npm start
```

Then interact with the agent:

### Example Flow

```
Build a website
→ Answer design questions

Start building

continue
continue
continue
...
```

---

## 📂 Project Structure

```
scaler-cli-agent/
├── output/
│   └── index.html        # Generated website output
│
├── src/
│   ├── agent.js          # Core agent logic (LLM interaction + loop)
│   ├── index.js          # CLI entry point
│   ├── tools.js          # Tool execution (WRITE_FILE, OPEN_BROWSER)
│   └── prompts/
│       └── system.js     # System prompt (agent behavior + rules)
│
├── node_modules/
├── package.json
├── package-lock.json
└── README.md
```

---

## 🎯 Assignment Requirements Covered

| Requirement                          | Status |
|-------------------------------------|--------|
| CLI-based conversational agent      | ✅     |
| Step-by-step agent loop             | ✅     |
| Tool usage (WRITE_FILE, OPEN_BROWSER) | ✅   |
| Generates working HTML/CSS/JS       | ✅     |
| Produces browser-renderable output  | ✅     |
| Scaler-style UI capability          | ✅     |

---

## 🧪 Demo

📽 **YouTube Video:** https://www.youtube.com/watch?v=NRsBdYgtMak_  

---

## 📊 Evaluation Criteria

- GitHub Repository — ✅
- Demo Video — ✅
- Agent Loop & Reasoning — ✅
- UI Quality — ✅
- Code Quality — ✅

---

## ⚠️ Notes

- The agent operates in a **strict loop** and requires manual `continue` input.
- Each step **overwrites the file**, so state preservation is handled via prompt design.
- Final output is a fully functional static webpage.

---

## ✨ Future Improvements

- Auto-loop execution (no manual `continue`)
- Multi-page website support
- Persistent state memory
- Live preview instead of static open

---

## 👨‍💻 Author

Sneha Raj
