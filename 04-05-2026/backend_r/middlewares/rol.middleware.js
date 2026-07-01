module.exports.verificarRol = (rolesPermitidos) => {
    return (request, response, next) => {
        if (!request.Usuario) {
            return response.status(401).json({ message: 'No estás autenticado (menso)' });
        }
        const tieneAcceso = rolesPermitidos.includes(request.Usuario.rol);

        if (!tieneAcceso) {
            return response.status(403).json({
                message: `Acceso denegado. Tu rol (${request.Usuario.rol}) no tiene permisos para esto (boink)`
            });
        }

        return next();
    };
};