const EstudianteController = require("../controllers/estudiante.controller")
const { authorization } = require("../middlewares/authorization.middleware") 
const { verificarRol } = require("../middlewares/rol.middleware") 

module.exports = function(app) {
    /* Se puede agregar aqui el middleware
    app.get("/api/estudiantes", Middleware,EstudianteController.getAllEstudiantes);
     */

    app.post("/api/estudiantes", authorization, verificarRol(["admin"]), EstudianteController.newEstudiante);
    app.get("/api/estudiantes", authorization, verificarRol(["admin", "visualizador"]), EstudianteController.getAllEstudiantes);
    app.get("/api/estudiantes/:id", authorization, verificarRol(["admin", "visualizador"]), EstudianteController.getEstudianteID);
    app.put("/api/estudiantes/:id", authorization, verificarRol(["admin"]), EstudianteController.editEstudiante);
    app.delete("/api/estudiantes/:id", authorization, verificarRol(["admin"]), EstudianteController.deleteEstudiante);
}