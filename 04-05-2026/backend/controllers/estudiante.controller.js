const Estudiante = require("../models/estudiante.models");


module.exports.getAllEstudiantes = (_, response) => {
    Estudiante.find({})
        .then(estudiantes => response.json(estudiantes))
        //Esto no se debe hacer, solo por fines practicos
        .catch(err => response.json(err))
}

module.exports.getEstudianteID = (request, response) => {
    Estudiante.find({})
}