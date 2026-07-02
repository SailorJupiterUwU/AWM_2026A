const MatriculaController = require("../controllers/matricula.controller")

module.exports = function(app){
    app.post("/api/matriculas", MatriculaController.matricularEstudiante);
    app.get("/api/matriculas/:estudianteId", MatriculaController.getEstudianteMatriculado);
}