const Users = require('./users.models')
const Todos = require('./todos.models')
const Categories = require('./categories.models')
const UsersTodos = require('./usersTodos.models')
const Subcategories = require('./subcategories.models')
const TodoSubcategories = require('./todosSubcategories.models')

const initModels = () => {
   
   Users.hasMany(UsersTodos, {foreignKey: 'userId'})
   UsersTodos.belongsTo(Users, {foreignKey: 'userId'})
   Todos.hasMany(UsersTodos, {foreignKey: 'todoId'})
   UsersTodos.belongsTo(Todos, {foreignKey: 'todoId'})

    Categories.hasMany(Todos, {foreignKey: 'categoryId'})
    Todos.belongsTo(Categories, {foreignKey: 'categoryId'})

   Categories.hasMany(Subcategories, {foreignKey: 'categoryId'})
   Subcategories.belongsTo(Categories, {foreignKey: 'categoryId'})

   Todos.hasMany(TodoSubcategories, {foreignKey: 'todoId'})
   TodoSubcategories.belongsTo(Todos, {foreignKey: 'todoId'})

   Subcategories.hasMany(TodoSubcategories, {foreignKey: 'subcategoryId'})
   TodoSubcategories.belongsTo(Subcategories, { foreignKey: 'subcategoryId'})
}

module.exports = initModels