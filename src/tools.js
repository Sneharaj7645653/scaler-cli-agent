const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const outputDir = path.join(__dirname, '../output');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

module.exports = {
    WRITE_FILE: (filename, content) => {
        const filePath = path.join(outputDir, filename);
        fs.writeFileSync(filePath, content.trim(), 'utf8');
        return `Successfully wrote to ${filename}`;
    },
    
    OPEN_BROWSER: (filename) => {
        const filePath = path.join(outputDir, filename);
        // Uses 'open' for macOS, 'start' for Windows, 'xdg-open' for Linux
        const command = process.platform === 'darwin' ? `open "${filePath}"` :
                        process.platform === 'win32' ? `start "" "${filePath}"` :
                        `xdg-open "${filePath}"`;
        
        exec(command);
        return `Successfully opened ${filename} in the browser.`;
    }
};