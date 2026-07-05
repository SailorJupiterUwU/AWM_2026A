const AsignaturaController = require("../controllers/asignatura.controller")
const { authorization } = require("../middlewares/authorization.middleware") 
const { verificarRol } = require("../middlewares/rol.middleware") 

module.exports = function(app){
    app.get("/api/asignaturas", authorization, verificarRol(["admin", "visualizador"]), AsignaturaController.getAllAsignaturas);
    app.get("/api/asignaturas/:asignaturaId", authorization, verificarRol(["admin", "visualizador"]), AsignaturaController.getAsignatura);
    app.post("/api/asignaturas", authorization, verificarRol(["admin"]), AsignaturaController.newAsignatura);
    app.delete("/api/asignaturas/:asignaturaId", authorization, verificarRol(["admin"]), AsignaturaController.deleteAsignatura);
    app.patch("/api/asignaturas/:asignaturaId", authorization, verificarRol(["admin"]), AsignaturaController.editarAsignatura);
}