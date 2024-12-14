const express = require('express');
const routes = express.Router();

let users =[
    {id : 1, name: 'Jon', email: 'Jon@123'},
   { id : 2, name: 'Gaurav', email: 'gaurav2123'},
    {id : 3, name: 'Shiva', email: 'shiva@234'}
]
routes.get('/', (req, res) => {
    res.status(200).json(users)
});

routes.post('/', (req, res) => {
    const id = users.length + 1
    const {name, email} = req.body;
    const newUser = {id, name, email}
    users.push(newUser)
    res.status(200).json(users)
});

routes.get('/:id', (req, res) => {
    const user = users.find((u) => u.id === parseInt(req.params.id))
    if(!user) return res.status(404).json('user not found')
    res.status(200).json(user);
    
});

routes.put('/:id', (req, res) => {
    const user = users.find((u) => u.id === parseInt(req.params.id))
    if(!user) return res.status(404).json('user not found')
    const {name, email} = req.body;
    user.name = name || user.name
    user.email = email || user.email

    res.status(200).json(user)
})

routes.delete('/:id', (req, res) => {
    const userIndex = users.findIndex((u) => u.id === parseInt(req.params.id));
    if(userIndex === -1) return res.status(404).json('user not found')
    
        users.splice(userIndex, 1)
        res.status(201).send('user deleted successfuly!')
})

module.exports = routes
