const Groq = require('groq-sdk');
require('dotenv').config();
const systemPrompt = require('./prompts/system');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// We manually manage the conversation history array for Groq
let messageHistory = [
    { role: 'system', content: systemPrompt }
];

async function callLLM(userInput) {
    try {
        // 1. Add user input to history
        messageHistory.push({ role: 'user', content: userInput });

        // 2. Call Groq
        const chatCompletion = await groq.chat.completions.create({
            messages: messageHistory,
            model: 'llama-3.3-70b-versatile', // Llama 3 is excellent for coding/reasoning
            temperature: 0.2,
        });

        const responseText = chatCompletion.choices[0]?.message?.content || "";
        
        // 3. Save the agent's response to history so it remembers what it said
        messageHistory.push({ role: 'assistant', content: responseText });

        return responseText;
    } catch (error) {
        console.error("LLM Error:", error.message);
        return "Sorry, I encountered an error communicating with the AI.";
    }
}

// Function to feed tool results back into the history
async function provideToolResult(resultMessage) {
    messageHistory.push({ 
        role: 'user', 
        content: `System Tool Execution Result: ${resultMessage}\nDo not execute the tool again immediately unless necessary.` 
    });
}

module.exports = { callLLM, provideToolResult };