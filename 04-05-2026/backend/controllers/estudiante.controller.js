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
    Estudiante.findById(id)
        .then(estudiante => response.json(estudiante))
        .catch(err => response.json(err))
}

//para crear un nuevo estudiante
module.exports.newEstudiante = (request, response) => {
    const { nombre, edad, url } = request.body;
    Estudiante.create({ nombre, edad, url })
        .then(estudianteNuevo => response.json(estudianteNuevo))
        .catch(err => response.json(err))

}

//para editar estudiante
module.exports.editEstudiante = (request, response) => {
    const { id } = request.params;
    const { nombre, edad, url } = request.body;
    Estudiante.findOneAndUpdate({ _id: id }, { nombre, edad, url }, { returnDocument: 'after' })
        .then(estudianteEditado => response.json(estudianteEditado))
        .catch(err => response.json(err))
}

//para eliminar un estudiante
module.exports.deleteEstudiante = (request, response) => {

    const { id } = request.params;
    console.log(id)
    Estudiante.deleteOne({ _id: id })
        .then(estudianteEliminado => response.json(estudianteEliminado))
        .catch(err => response.json(err))
}