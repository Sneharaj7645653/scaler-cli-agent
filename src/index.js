const readline = require('readline');
const { callLLM, provideToolResult } = require('./agent');
const tools = require('./tools');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Parses the XML-style tool tags from the LLM's response
function parseTools(text) {
    const actions = [];
    const regex = /<tool\s+name="([^"]+)"\s*(?:file="([^"]+)")?>([\s\S]*?)<\/tool>/g;
    let match;
    
    while ((match = regex.exec(text)) !== null) {
        actions.push({
            name: match[1],
            file: match[2],
            content: match[3]
        });
    }
    return actions;
}

async function startCLI() {
    console.log("===============================================");
    console.log("🚀 Scaler AI Agent CLI Tool Initialized.");
    console.log("Type 'exit' to quit.");
    console.log("===============================================\n");

    const loop = () => {
        rl.question("You: ", async (input) => {
            if (input.toLowerCase() === 'exit') {
                console.log("Goodbye!");
                process.exit(0);
            }

            process.stdout.write("\nAgent is thinking...\n");
            const responseText = await callLLM(input);
            
            // Print the agent's reasoning (hiding the raw XML tool code for a cleaner CLI)
            const cleanResponse = responseText.replace(/<tool[\s\S]*?<\/tool>/g, '\n[⚙️  Executing Tool...]\n').trim();
            console.log("\n🤖 Agent:\n" + cleanResponse + "\n");

            // Extract and execute tools
            const actions = parseTools(responseText);
            
            for (const action of actions) {
                console.log(`> Running ${action.name} on '${action.file}'...`);
                try {
                    let resultMsg = "";
                    if (action.name === 'WRITE_FILE') {
                        resultMsg = tools.WRITE_FILE(action.file, action.content);
                    } else if (action.name === 'OPEN_BROWSER') {
                        resultMsg = tools.OPEN_BROWSER(action.file);
                    } else {
                        resultMsg = `Error: Tool ${action.name} is not recognized.`;
                    }
                    console.log(`  ${resultMsg}\n`);
                    
                    // Let the LLM know the tool succeeded quietly
                    await provideToolResult(resultMsg);
                    
                } catch (error) {
                    console.error(`  ❌ Failed to execute tool: ${error.message}\n`);
                    await provideToolResult(`Error executing tool: ${error.message}`);
                }
            }

            loop(); // Prompt the user again
        });
    };

    loop();
}

startCLI();