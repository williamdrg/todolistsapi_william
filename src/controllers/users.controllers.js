const Users = require('../models/users.models')
const bcrypt = require('bcrypt')

const createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await Users.create({ username, email, password: hashedPassword })
        res.status(201).json(newUser)
    } catch (error) {
        res.status(400).json(error)
    }
}

/* Este enpoint solo cre creó a manera de práctica 
para mirar la cantidad de usaurios creados por lo que no se le omitió la contraseña */

const getAllUsers = async (req, res) => {
    try{
      const users = await Users.findAll()
      res.send(users)
    } catch (error) {
        res.status(400).json(error)
    }
}

module.exports = { 
    createUser,
    getAllUsers
}