const { Router } = require('express')
const {
    createTodo, 
    getUserTasks, 
    updateTask, 
    deleteTask, 
    getAllTasks
} = require('../controllers/todos.controllers')


const router = Router()

router.post('/users/todos', createTodo)
router.get('/todos/users/:id', getUserTasks)
router.put('/todos/:id', updateTask)
router.delete('/todos/:id', deleteTask)
router.get("/todos", getAllTasks)

module.exports = router