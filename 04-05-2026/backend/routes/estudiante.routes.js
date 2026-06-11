const EstudianteController = require("../controllers/estudiante.controller")

module.exports = function(app) {
    app.get("/estudiantes", EstudianteController.getAllEstudiantes);
    app.get("/estudiantes/:id/detalle", EstudianteController.getEstudianteID);
    app.post("/estudiantes/nuevo", EstudianteController.newEstudiante);
    app.patch("estudiantes/:id/editar", EstudianteController.editEstudiante);
    app.delete("estudiantes/:id/")

}