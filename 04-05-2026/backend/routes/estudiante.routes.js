const EstudianteController = require("../controllers/estudiante.controller")

module.exports = function(app) {
    app.get("/api/estudiantes", EstudianteController.getAllEstudiantes);
    app.get("/api/estudiantes/:id/detalle", EstudianteController.getEstudianteID);
    app.post("/api/estudiantes/nuevo", EstudianteController.newEstudiante);
    app.patch("/api/estudiantes/:id/editar", EstudianteController.editEstudiante);
    app.delete("/api/estudiantes/:id", EstudianteController.deleteEstudiante);

}