const Categories = require("../models/categories.models");
const Todos = require("../models/todos.models");
const UsersTodos = require("../models/usersTodos.models");
const Users = require("../models/users.models");
const TodosSubcategories = require("../models/todosSubcategories.models");
const Subcategories = require("../models/subcategories.models");

const createTodo = async (req, res) => {
  try {
    const { title, description, categoryId, userId, subcategoryIds } = req.body;
    const newTodo = await Todos.create({ title, description, categoryId });
    await UsersTodos.create({ userId, todoId: newTodo.id });

    if (Array.isArray(subcategoryIds)) {
      for (const subcategoryId of subcategoryIds) {
        await TodosSubcategories.create({ todoId: newTodo.id, subcategoryId });
      }
    }
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getUserTasks = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.findByPk(id);

    if (!user) {
      return res.status(404).json({
        error: "Invalid user",
        message: "user does not exist",
      });
    }

    const userTodos = await UsersTodos.findAll({
      where: { userId: id },
      attributes: [],
      include: [
        {
          model: Todos,
          attributes: {
            exclude: ["categoryId"],
          },
          include: [
            {
              model: Categories,
              attributes: {
                exclude: ["id"],
              },
            },
            {
              model: TodosSubcategories,
              attributes: ["subcategoryId"],
              include: [
                {
                  model: Subcategories,
                  attributes: ["id", "name"],
                },
              ],
            },
          ],
        },
      ],
    });

    res.status(200).json(userTodos);
  } catch (error) {
    res.status(400).json(error);
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;

    const todo = await Todos.findByPk(id);
    if (!todo) {
      return res.status(404).json({
        error: "Invalid Todo",
        message: "Todo does not exist",
      });
    }

    await Todos.update({ completed }, { where: { id } });

    res.status(204).send();
  } catch (error) {
    res.status(400).json(error);
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todos.findByPk(id);
    if (!todo) {
      return res.status(404).json({
        error: "Invalid todo",
        message: "Todo does not exist",
      });
    }

    await todo.destroy();

    res.status(204).send();
  } catch (error) {
    res.status(400).json(error);
  }
};

/* este endpoint solo se creó para vericiar que esté correcta la información 
además de ver todas las tareas creadas y sus relaciones */
const getAllTasks = async (req, res) => {
  try {
    const todos = await Todos.findAll({
      include: [
        {model: Categories},
        {model: UsersTodos,
          include: {model: Users},
        },
      ],
    });
    res.send(todos);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  createTodo,
  getUserTasks,
  updateTask,
  deleteTask,
  getAllTasks,
};
