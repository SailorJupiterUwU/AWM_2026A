const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost/prueba3")
    .then(() => console.log("Conexion exitosa a la BDD"))
    .catch((err) => console.log("Error al establecer la conexion", err))