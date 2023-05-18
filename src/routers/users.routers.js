const { Router } = require('express')
const {createUser, getAllUsers} = require('../controllers/users.controllers')


const router = Router()

router.post('/users/', createUser)
router.get('/users', getAllUsers)

module.exports = router 