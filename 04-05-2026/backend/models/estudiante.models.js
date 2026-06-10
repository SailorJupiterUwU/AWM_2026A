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
        edad: {
            type: Number,
            required: [
                true,
                "Edad es requerido OK?"
            ]
        },
        url: {
            type: String
        }
    }
);

const Estudiante = mongoose.model("Estudiante", EstudianteSchema);
module.exports = Estudiante;