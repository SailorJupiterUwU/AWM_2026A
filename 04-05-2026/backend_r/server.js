const express = require("express");
const cors = require("cors");
const app = express();
const puerto = 8000;

const sequelize = require("./config/sequelize.config");
//Middleware antes de las rutas, tipos de middelwares: Implementado o Crearlos por uno mismo
/* Tambien se puede llamar al middleware desde las rutas */
app.use(cors());
app.use(express.json());

const allEstudiantesRoutes = require("./routes/estudiante.routes")

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