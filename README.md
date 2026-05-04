# AI Agent CLI Tool - Scaler Academy Clone

A conversational CLI agent built with Node.js and the Gemini API. The agent can reason through natural language instructions, generate code files, and execute terminal commands to build and display a clone of the Scaler Academy landing page.

## Architecture 
This project follows an Agentic **ReAct (Reason + Act)** pattern:
- **Reasoning:** The LLM receives system instructions about the Scaler brand guidelines and thinks through the necessary HTML/CSS/JS steps.
- **Acting:** The LLM outputs XML-formatted tool calls (`<tool name="WRITE_FILE">`). 
- **Execution:** The Node.js application parses these tags and executes real file-system operations using `fs` and `child_process`.

## Installation
1. Clone the repository.
2. Run \`npm install\` to install dependencies (\`@google/generative-ai\`, \`dotenv\`).
3. Create a \`.env\` file in the root directory and add your Gemini API Key: \`GEMINI_API_KEY=your_key_here\`

## Usage
Start the CLI agent by running:
\`\`\`bash
npm start
\`\`\`

**Example Workflow:**
1. *You:* "Create the HTML structure for the Scaler website, linking a style.css file."
2. *You:* "Now create the style.css file with the deep navy blue background and green buttons."
3. *You:* "Open the index.html file in my browser."