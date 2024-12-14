const express = require('express')
const router = express.Router();

router.use(express.json())

const todos = [
    {id: 1, title: "Learning node.js", completed: false},
    {id: 2, title: "Learning java script", completed: true},
    {id: 3,title: "lesning song", completed: false}
]
router.get('/', (req, res) => {
    res.status(200).json(todos)
});

router.post('/', (req, res) => {
    const {title, completed} = req.body;
    const newTodo = {id: todos.length+1, title: req.body, completed: req.body}
    todos.push(newTodo)
    res.status(200).send(todos)
});

router.get('/:id', (req, res) => {
    const todo = todos.find((t) => t.id === parseInt(req.params.id))
    if(!todo) return res.status(404).json('todo not found')
        res.status(200).json(todo)
});

router.put('/:id', (req, res) => {
    const todo = todos.find((t) => t.id === parseInt(req.params.id))
    if(!todo) return res.status(404).json('todo not found')
    const {title, completed} = req.body;
    todo.title = title || todo.title
    todo.completed = completed || todo.completed

    res.status(200).json(todo)    
});

router.delete('/:id', (req, res) =>  {
    const todoIndex = todos.findIndex((t) => t.id === parseInt(req.params.id))
    if(todoIndex === -1) return res.status(404).json('todo not found')

    todos.splice(todoIndex, 1)
    res.status(200).json('todo deleted successfuly!')
})

module.exports = router;