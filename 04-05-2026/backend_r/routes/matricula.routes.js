const MatriculaController = require("../controllers/matricula.controller")
const { authorization } = require("../middlewares/authorization.middleware") 
const { verificarRol } = require("../middlewares/rol.middleware") 

module.exports = function(app){
    app.post("/api/matriculas", authorization, verificarRol(["admin"]), MatriculaController.matricularEstudiante);
    app.get("/api/matriculas/:estudianteId", authorization, verificarRol(["admin", "visualizador"]), MatriculaController.getEstudianteMatriculado);
    app.delete("/api/matriculas/:estudianteId", authorization, verificarRol(["admin", "visualizador"]), MatriculaController.deleteMatriculaEstudiante);
    app.patch("/api/matriculas/:estudianteId", authorization, verificarRol(["admin"]), MatriculaController.editarMatricula)
}