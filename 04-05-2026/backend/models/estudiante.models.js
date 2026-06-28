const mongoose = require("mongoose");

//Esquema
const EstudianteSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: [
                true,
                "Nombre es requerido xD"
            ]
        },
        email:{
            type: String,
            required: [
                true,
               "El email es super requerido" 
            ]
        },
        edad: {
            type: Number,
            required: [
                true,
                "Edad es requerido OK?"
            ]
        },
        url: {
            type: String
        },
        password:{
            type: String,
            required: [true, "Contraseña es obligatorio"]
        },
        rol:{
            type: String,
            required: [true, "Rol es requerido"]
        },
    },
    { versionKey: false }
);

const Estudiante = mongoose.model("Estudiante", EstudianteSchema);
module.exports = Estudiante;