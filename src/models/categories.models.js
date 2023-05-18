const db = require('../utils/database')
const { DataTypes } = require('sequelize')

const Categories = db.define('categories', {
    name: {
        type: DataTypes.STRING(30),
        allowNull: false
    }
},
{
  timestamps: false,
})

module.exports = Categories