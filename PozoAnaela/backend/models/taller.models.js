const mongoose = require("mongoose")

const TalleresSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [
            true,
            "El campo nombre es requerido"
        ]
    },
    nivel: {
        type: String,
        required: [
            true,
            "El campo de nivel es requerido"
        ]
    },
    duracion: {
        type: Number,
        required: [
            true,
            "La duracion del taller es requerida"
        ]
    }
},
    { versionKey: false }
);

const Talleres = mongoose.model("Talleres", TalleresSchema);
module.exports = Talleres;