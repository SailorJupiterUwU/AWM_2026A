const EstudianteController = require("../controllers/estudiante.controller")

module.exports = function(app) {
    /* Se puede agregar aqui el middleware
    app.get("/api/estudiantes", Middleware,EstudianteController.getAllEstudiantes);
     */
    app.get("/estudiantes", EstudianteController.getAllEstudiantes);
    app.get("/estudiantes/:id", EstudianteController.getEstudianteID);
    app.post("/estudiantes", EstudianteController.newEstudiante);
    app.put("/estudiantes/:id", EstudianteController.editEstudiante);
    app.delete("/estudiantes/:id", EstudianteController.deleteEstudiante);

}