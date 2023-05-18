const db = require('../utils/database')
const { DataTypes } = require('sequelize')

const Todos = db.define('todos', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'category_id'
    }
},
{
  timestamps: false,
})

module.exports = Todos