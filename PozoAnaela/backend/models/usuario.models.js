const mongoose = require("mongoose")

const UsuarioSchema = mongoose.Schema({
    email: {
        type: String,
        required: [
            true,
            "El email es requerido"
        ]
    },
    password: {
        type: String,
        required: [
            true,
            "La contraseña es requerida"
        ]
    },
    rol: {
        type: String,
        required: [
            true,
            "El rol es requerido"
        ]
    }
},
    { versionKey: false }
);

const Usuario = mongoose.model("Usuario", UsuarioSchema);
module.exports = Usuario;