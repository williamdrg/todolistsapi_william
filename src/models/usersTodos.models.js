const db = require('../utils/database')
const { DataTypes } = require('sequelize')

const UsersTodos = db.define('users_todos', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'user_id'
    },
    todoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'todo_id'
    }
}, 
{
    timestamps: false
}
)

module.exports = UsersTodos