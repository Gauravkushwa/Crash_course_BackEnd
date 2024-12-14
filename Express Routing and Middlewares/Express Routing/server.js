const express = require('express');

const server = express();
const PORT = 3000;

const userRouter = require('./routes/users');
const todoRouter = require('./routes/todos')

server.use(express.json());

server.use('/users', userRouter);
server.use('/todos', todoRouter)

server.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`);
})