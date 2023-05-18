const express = require("express");
require("dotenv").config();
const db = require("./utils/database");
const initModels = require("./models/initModels");
const userRouters = require('./routers/users.routers')
const todoRouters = require('./routers/todos.routers')

initModels();

const app = express();
app.use(express.json())
app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
