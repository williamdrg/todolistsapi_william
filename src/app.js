const express = require("express");
require("dotenv").config();
const db = require("./utils/database");
const initModels = require("./models/initModels");
const userRouters = require('./routers/users.routers')
const todoRouters = require('./routers/todos.routers')

initModels();

const app = express();
app.use(express.json())
const PORT = process.env.PORT || 3000;
app.use(userRouters)
app.use(todoRouters)


db.authenticate()
  .then(() => console.log("Base de datos conectada"))
  .catch((error) => console.error(error));

db.sync()
  .then(() => console.log("Base de datos síncronizada"))
  .catch((error) => console.error(error));

app.get("/", (req, res) => {
  res.send("Servidor funcionando");
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
