const express = require("express");
const app = express();
const puerto = 8000;

require("./config/sequelize.config")

const allEstudiantesRoutes = require("./routes/estudiante.routes")
allEstudiantesRoutes(app);

app.listen(puerto, () => {
    console.log("Servidor escuchando en l puerto: ", puerto)
})