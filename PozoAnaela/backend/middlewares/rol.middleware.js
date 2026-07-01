const Usuario = require("../models/usuario.models")

module.exports.rolesPermitidos = (roles) => {
    return (request, response, next) => {
        if(!request.Usuario)
            return response.status(401).json({message: "Se debe realizar primero la autenticacion"})
        const rolUsuario = request.Usuario.rol
        //Si es admin permite el ingreso a todos los recursos
        if(rolUsuario == "admin")
            return next();
        if(roles.includes(rolUsuario))
            return next();
        return response.status(403).json({message:`Tu rol: ${rolUsuario} no posee los privilegios necesarios `})
    }
}