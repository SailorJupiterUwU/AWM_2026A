const express = require("express");
const app = express();
const puerto = 8000;

const sequelize = require("./config/sequelize.config");
const allEstudiantesRoutes = require("./routes/estudiante.routes")
app.use(express.json());
allEstudiantesRoutes(app);

sequelize.authenticate()
    .then(() => console.log("Conectado a la base de datos"))
    .catch(err => console.error("Error al conectar a la BD:", err));

sequelize.sync()
    .then(() => console.log("Tablas sincronizadas"))
    .catch(err => console.log(err));


app.listen(puerto, () => {
    console.log(`Servidor escuchando en el puerto: ${puerto}`);
});