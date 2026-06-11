const Estudiante = require("../models/estudiante.models");

//para todos
module.exports.getAllEstudiantes = (_, response) => {
    Estudiante.find({})
        .then(estudiantes => response.json(estudiantes))
        //Esto no se debe hacer, solo por fines practicos
        .catch(err => response.json(err))
}

//para un estudiante en especifico
module.exports.getEstudianteID = (request, response) => {
    const { id } = request.params;
    Estudiante.find({id})
        .then(estudiante => response.json(estudiante))
        .catch(err => response.json(err))
}

//para crear un nuevo estudiante
module.exports.newEstudiante = (request, response) => {
    const { nombre, edad, url } = request.body;
    Estudiante.create({ nombre, edad, url })
        .then(estudiante => response.json(estudiante))
        .catch(err => response.json(err))

}

//para editar estudiante
module.exports.editEstudiante = (request, responde) => {
    const { url } = request.body;
    Estudiante.
}