const TalleresController = require("../controllers/talleres.controller")
const { autenticacion } = require("../middlewares/autenticacion.middleware")
const { rolesPermitidos } = require("../middlewares/rol.middleware")


module.exports = function(app){
    app.get("/talleres", autenticacion, rolesPermitidos(["gestor"]), TalleresController.getAllTalleres)
    app.get("/talleres/:id", autenticacion, rolesPermitidos(["gestor"]), TalleresController.getTallerID)
    app.post("/talleres", autenticacion, rolesPermitidos([]), TalleresController.newTaller)
}