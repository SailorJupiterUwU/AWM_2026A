const Estudiante = require("../models/estudiante.model");

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
        .catch(err => response.status(500).json(err))
}

//para crear un nuevo estudiante
module.exports.newEstudiante = async (request, response) => {
    const { nombre, edad, url } = request.body;
    if (!nombre || !edad)
        response.status(400).json({ message: "Todos los campos son obligatorios" })
    else {
        const estudianteFound = await Estudiante.findOne({ nombre });
        if (estudianteFound)
            response.status(400).json({ message: "El estudiante ya existe owo (menso) (boink)" })
        else {
            Estudiante.create({ nombre, edad, url })
                .then(estudianteNuevo => response.json({
                    _id: estudianteNuevo._id,
                    nombre: estudianteNuevo.nombre,
                    edad: estudianteNuevo.edad,
                    url: estudianteNuevo.url
                }))
                .catch(err => response.status(500).json(err))
        }
    }
}

//para editar un estudiante
module.exports.editEstudiante = (request, response) => {
    const { id } = request.params;
    const { nombre, edad, url } = request.body;
    Estudiante.findOneAndUpdate({ _id: id }, { nombre, edad, url }, { returnDocument: 'after' })
        .then(estudianteEditado => response.json({
            _id: estudianteEditado._id,
            nombre: estudianteEditado.nombre,
            edad: estudianteEditado.edad,
            url: estudianteEditado.url
        }))
        .catch(err => response.json(err))
}

//para eliminar un estudiante
module.exports.deleteEstudiante = (request, response) => {

    const { id } = request.params;
    Estudiante.deleteOne({ _id: id })
        .then(estudianteEliminado => response.json(estudianteEliminado))
        .catch(err => response.json(err))
}