const db = require('../utils/database')
const { DataTypes } = require('sequelize')

const TodoSubcategories = db.define('todo_subcategories',{
    todoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'todo_id'
    },
    subcategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'subcategory_id'
    }
}, 
{
    timestamps: false
})

module.exports = TodoSubcategories