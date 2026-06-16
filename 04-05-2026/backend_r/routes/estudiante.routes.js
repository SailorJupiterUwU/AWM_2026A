const EstudianteController = require("../controllers/estudiante.controllers")

module.exports = function(app) {
    app.get("/estudiantes", EstudianteController.getAllEstudiantes);
    app.get("/estudiantes/:id", EstudianteController.getEstudianteID);
    app.post("/estudiantes", EstudianteController.newEstudiante);
    app.put("/estudiantes/:id", EstudianteController.editEstudiante);
    app.delete("/estudiantes/:id", EstudianteController.deleteEstudiante);

}