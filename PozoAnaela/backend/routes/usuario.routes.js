const UsuarioController = require("../controllers/usuario.controller")

module.exports = function (app) {
    app.post("/login", UsuarioController.loginUsuario)
    app.post("/usuario", UsuarioController.newUsuario)
}