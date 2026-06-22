const EstudianteController = require("../controllers/estudiante.controller")
const { authorization } = require("../middlewares/authorization.middleware") 
module.exports = function(app) {
    /* Se puede agregar aqui el middleware
    app.get("/api/estudiantes", Middleware,EstudianteController.getAllEstudiantes);
     */
    app.post("/estudiantes/login", EstudianteController.loginEstudiante);
    app.post("/estudiantes", EstudianteController.newEstudiante);

    app.get("/estudiantes", authorization, EstudianteController.getAllEstudiantes);
    app.get("/estudiantes/:id", authorization, EstudianteController.getEstudianteID);
    app.put("/estudiantes/:id", authorization, EstudianteController.editEstudiante);
    app.delete("/estudiantes/:id", authorization, EstudianteController.deleteEstudiante);


}