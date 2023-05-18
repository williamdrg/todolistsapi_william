const db = require('../utils/database')
const { DataTypes } = require('sequelize')

const Subcategories = db.define('subcategories',{
    name: {
        type: DataTypes.STRING(30),
        allowNull: false
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

module.exports = Subcategories