const UsuarioController = require("../controllers/usuario.controller")

module.exports = function(app) {
    /* Se puede agregar aqui el middleware
    app.get("/api/estudiantes", Middleware,EstudianteController.getAllEstudiantes);
     */

    app.post("/api/user", UsuarioController.newUsuario);
    app.post("/api/login", UsuarioController.loginUsuario);
}