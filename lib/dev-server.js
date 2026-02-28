const express = require('express');
const chokidar = require('chokidar');
const WebSocket = require('ws');

const app = express();
const port = 3000;

// Middleware to handle Range headers
app.use((req, res, next) => {
    if (req.headers.range) {
        const range = req.headers.range;
        // Handle range headers logic here
    }
    next();
});

// Serve static files
app.use(express.static('public'));

// Initialize WebSocket server
const server = app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

const wss = new WebSocket.Server({ server });

// Watch for changes in the 'public' directory
chokidar.watch('./public').on('change', (path) => {
    console.log(`File ${path} has been changed`);
    // Notify all WebSocket clients about the file change
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(`File ${path} has been changed. Please refresh.`);
        }
    });
});