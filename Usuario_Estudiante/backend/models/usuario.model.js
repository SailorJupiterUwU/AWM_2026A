const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema(
    {
        email:{
            type: String,
            required:[
                true,
                "El email es requerido menso (boink)"
            ]
        },
        rol:{
            type: String,
            required:[
                true,
                "El rol es requerido xD"
            ]
        },
        password: {
            type: String,
            required:[
                true,
                "La contraseña obvio es requerido >:v"
            ]
        }
    },
    { versionKey: false }
)

const Usuario = mongoose.model("Usuario", UserSchema)
module.exports = Usuario;