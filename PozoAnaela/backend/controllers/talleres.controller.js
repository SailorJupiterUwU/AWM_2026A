const Talleres = require("../models/taller.models")

//Lista de todos los talleres
module.exports.getAllTalleres = (_, response) => {
    Talleres.find({})
        .then((talleres) => response.json(talleres))
        .catch(err => response.status(500).json(e))
}

//Taller por ID
module.exports.getTallerID = (request, response) => {
    const { id } = request.params;
    Talleres.findById(id)
        .then((taller) => response.json(taller))
        .catch(err => response.status(500).json(e))
}

//Crear Taller
module.exports.newTaller = async (request, response) => {
    const { nombre, nivel, duracion } = request.body;
    if (!nombre || !nivel || !duracion)
        return response.status(400).json({ message: "Todos los campos son obligatorios" })
    else {
        const tallerExistente = await Talleres.findOne({ nombre })
        if (tallerExistente)
            return response.status(400).json({ message: "El taller con ese nombre ya existe" })
        else {
            Talleres.create({ nombre, nivel, duracion })
                .then((nuevoTaller) => { response.json(nuevoTaller) })
                .catch(err => response.status(500).json(e))
        }
    }
}