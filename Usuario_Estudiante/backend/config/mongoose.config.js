const mongoose = require("mongoose");

//cadena de conexion
mongoose.connect("mongodb://127.0.0.1/epn_bdd_owo")
    .then(() => console.log("Conexion establecida exitosamente"))
    .catch(err => console.log("Error al establecer la conexion", err))