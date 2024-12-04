const express = require('express');

const PORT = 8085

const server = express();
server.get('/',(req, res) => {
    res.send('Welcome to the Express.js Server !')
})

server.get('/about', (req, res) => {
    res.send("This is a simple web server built using Express.js.")
})

server.get('/contact', (req, res)=> {
    const contactDetails = {
        Email: "kushwahagaurav062@gmail.com",
        Phone: "9630367059"
    }
    res.json(contactDetails);
})

server.get("/random", (req, res) => {
    const randomNumber = Math.floor(Math.random() * 100) + 1
    res.send(`The Random Number is ${randomNumber}  !`)
})

server.use((req, res) => {
    res.status(404).send(`404- Page not Found`)
})

server.listen(PORT, () => {
    console.log(`server is running on port ${PORT} !`);
    
})