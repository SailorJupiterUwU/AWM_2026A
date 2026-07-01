const Estudiante = require("../models/estudiante.model");

// para todos
module.exports.getAllEstudiantes = (_, response) => {
    Estudiante.findAll()
        .then(estudiantes => response.json(estudiantes))
        // Esto no se debe hacer, solo por fines practicos
        .catch(err => response.status(500).json(err))
}

// para un estudiante en especifico
module.exports.getEstudianteID = (request, response) => {
    const { id } = request.params;
    Estudiante.findByPk(id)
        .then(estudiante => {
            if (!estudiante)
                return response.status(404).json({ message: "Estudiante no encontrado" });
            response.json(estudiante);
        })
        .catch(err => response.status(500).json(err))
}

// para crear un nuevo estudiante
module.exports.newEstudiante = async (request, response) => {
    const { nombre, edad, url } = request.body;

    if (!nombre || !edad) {
        return response.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    try {
        // Busca estudiante repetido
        const estudianteFound = await Estudiante.findOne({ where: { nombre } });
        if (estudianteFound) {
            return response.status(400).json({ message: "El estudiante ya existe owo (menso) (boink)" });
        }

        const estudianteNuevo = await Estudiante.create({ nombre, edad, url });
        response.json({
            nombre: estudianteNuevo.nombre,
            edad: estudianteNuevo.edad,
            url: estudianteNuevo.url
        });
    } catch (err) {
        response.status(500).json(err);
    }
}

// para editar estudiante
module.exports.editEstudiante = async (request, response) => {
    const { id } = request.params;
    const { nombre, edad, url } = request.body;

    try {
        const estudiante = await Estudiante.findByPk(id);
        if (!estudiante) {
            return response.status(404).json({ message: "Estudiante no encontrado" });
        }

        const estudianteEditado = await estudiante.update({ nombre, edad, url });
        response.json({
            nombre: estudianteEditado.nombre,
            edad: estudianteEditado.edad,
            url: estudianteEditado.url
        });
    } catch (err) {
        response.status(500).json(err);
    }
}

// para eliminar un estudiante
module.exports.deleteEstudiante = async (request, response) => {
    const { id } = request.params;

    try {
        const filasEliminadas = await Estudiante.destroy({ where: { id } });
        if (filasEliminadas === 0) {
            return response.status(404).json({ message: "Estudiante no encontrado" });
        }
        response.json({ message: "Estudiante eliminado", filasEliminadas });
    } catch (err) {
        response.status(500).json(err);
    }
}