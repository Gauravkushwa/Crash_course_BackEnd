const express = require("express");
const fs = require('fs');
const bodyParser = require('body-parser')

const PORT =  3000;

const server = express();
server.use(bodyParser.json())

const readFile = ()=> JSON.parse(fs.readFileSync('./db.json','utf-8'))
const writeFile = (data) => fs.writeFileSync('./db.json',JSON.stringify(data, null, 2))

server.get('/todos', (req, res) => {
    const db = readFile();
    res.send(db.todos)
})

server.post('/todos', (req, res) => {
    const db = readFile()
    const newTodos = {
        id: db.todos.length+1,
        title: req.body.title,
        status: req.body.status || false
    }
    db.todos.push(newTodos)
    writeFile(db)
    res.status(201).json(newTodos)

})

server.patch("/todos/even-status",(req,res) => {
    db = readFile();
    db.todos = db.todos.map((todo) => {
        if(todo.length%2 === 0 && todo.status === false){
           return {...todo, status: true}
        }
        return todo
    })
    writeFile(db)
    res.json({massege: "Even ID of todos updated Successfuly !"})
})

server.delete("/todos/delete-true", (req, res) => {
    const db = readFile();
    const remainingTodos = db.todos.filter((todo) => !todo.status);
    db.todos = remainingTodos;
    writeFile(db);
    res.json({ message: "Todos with status true deleted successfully" });
  });

  server.listen(PORT, () => {
    `server is lisning on port ${PORT}`
  })


