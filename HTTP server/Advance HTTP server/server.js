const http = require('http');
const fs = require('fs');
const qs = require('querystring');

const PORT = 8081;

const server = http.createServer((req, res) => {
    if (req.method === "GET" && req.url === "/signup") {
        res.writeHead(200, { 'Content-Type': "text/html" });
        res.end(`
            <html>
            <head>
                <title>Signup Page</title>
                <style>
                body { font-family: Arial, sans-serif; background-color: #f4f4f9; text-align: center; padding: 50px; }
                form { margin-top: 20px; display: inline-block; text-align: left; }
                input { display: block; margin: 10px 0; padding: 10px; width: 100%; }
                button { padding: 10px 20px; background-color: #007BFF; color: white; border: none; cursor: pointer; }
                button:hover { background-color: #0056b3; }
                </style>
            </head>
            <body>
                <h1>Signup Page</h1>
                <form action="/signup" method="POST">
                    <label for="name">Name:</label>
                    <input type="text" id="name" name="name" placeholder="Enter your name" required>
                    
                    <label for="password">Password:</label>
                    <input type="password" id="password" name="password" placeholder="Enter your password" required>
                    
                    <button type="submit">Signup</button>
                </form>
            </body>
            </html>
        `);
    } else if (req.method === 'POST' && req.url === '/signup') {
        let body = "";
        req.on('data', chunk => {
            body += chunk;
        });
        req.on('end', () => {
            const { name, password } = qs.parse(body);
            const user = { name, password };

            fs.appendFile('user.txt', JSON.stringify(user) + '\n', (err) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Error saving user data!');
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end('<h1>Thank you for signing up...!</h1>');
                }
            });
        });
    } else if (req.method === "GET" && req.url === '/allusers') {
        fs.readFile('user.txt', 'utf-8', (err, data) => {
            if (err) {
                res.writeHead(500, { "content-type": 'text/plain' });
                res.end("Error reading user data...!");
            } else {
                const users = data
                    .split('\n')
                    .filter(line => line) 
                    .map(line => JSON.parse(line))
                    .map(user => user.name); 

                res.writeHead(200, { "content-type": "text/html" });
                res.end(`
                <html>
                    <head>
                        <title>All Users</title>
                    </head>
                    <style>
                    ul, h1{font-family: sans-serif}
                    </style>
                    <body>
                        <h1>All Users</h1>
                        <ul>
                            ${users.map(user => `<li>${user}</li>`).join('')}
                        </ul>
                    </body>
                </html>
                `);
            }
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
