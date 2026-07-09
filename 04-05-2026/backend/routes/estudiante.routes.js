const EstudianteController = require("../controllers/estudiante.controller")
const { authorization } = require("../middlewares/authorization.middleware")
const { rol_Admin } = require("../middlewares/rol_Admin.middleware")
const {rol_Visualizador} = require("../middlewares/rol_Visualizador.middleware")
module.exports = function(app) {
    /* Se puede agregar aqui el middleware
    app.get("/api/estudiantes", Middleware,EstudianteController.getAllEstudiantes);
     */
    //app.post("/estudiantes/login", EstudianteController.loginEstudiante);
    //app.post("/estudiantes", rolAdmin, EstudianteController.newEstudiante);

    //app.get("/estudiantes", authorization, (rol_Admin||rol_Visualizador), EstudianteController.getAllEstudiantes);
    //app.get("/estudiantes/:id", authorization, (rol_Admin||rol_Visualizador), EstudianteController.getEstudianteID);
    //app.put("/estudiantes/:id", authorization, rol_Admin, EstudianteController.editEstudiante);
    //app.delete("/estudiantes/:id", authorization, rol_Admin, EstudianteController.deleteEstudiante);

    app.get("/estudiantes", EstudianteController.getAllEstudiantes);
    app.get("/estudiantes/:id", EstudianteController.getEstudianteID);
    app.put("/estudiantes/:id", EstudianteController.editEstudiante);
    app.delete("/estudiantes/:id", EstudianteController.deleteEstudiante);
}