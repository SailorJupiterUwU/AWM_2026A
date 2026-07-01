const Usuario = require("../models/usuario.models")
const jwt = require("jsonwebtoken")

//Contraseña con la cual se va a firmar el token
const JWT_SECRET = "prueba3_OwO"

module.exports.autenticacion = async (request, response, next) => {
    let token;
    if (request.headers.authorization && request.headers.authorization.startsWith("Bearer")) {
        try {
            token = request.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, JWT_SECRET)
            request.Usuario = await Usuario.findOne({ _id: decoded.id }).select("-password")
            next();
        }
        catch (err) {
            response.status(401).json({ message: "Token no valido" })
        }
    }
    if (!token)
        response.status(401).json({ message: "No hay token" })
}