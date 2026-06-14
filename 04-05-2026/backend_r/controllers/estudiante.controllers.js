const Estudiante = require("../models/estudiante.models");

//para todos
module.exports.getAllEstudiantes = async (_, response) => {
    try {
        const estudiantes = await Estudiante.findAll()
        response.json(estudiantes)
    } catch (err) {
        response.status(500).json({ message: err })
    }
}

//para un estudiante en especifico
module.exports.getEstudianteID = async (request, response) => {
    const { id } = request.params;
    try {
        const estudiante = await Estudiante.findOne({ where: { id: id } })
        response.json(estudiante)
    } catch (err) {
        response.status(400).json({ message: err })
    }
}

//para crear un nuevo estudiante
module.exports.newEstudiante = async (request, response) => {
    const { nombre, edad, url } = request.body;
    try {
        const estudianteNuevo = await Estudiante.create({ nombre, edad, url });
        response.json(estudianteNuevo);
    } catch (err) {
        response.status(400).json({ message: err })
    }
}

/* para alterar la bdd si es que no tiene el id autoincremental
ALTER TABLE estudiantes MODIFY COLUMN id INT AUTO_INCREMENT;
*/

//para editar estudiante
module.exports.editEstudiante = async (request, response) => {
    const { id } = request.params;
    const { url } = request.body;
    try {
        const [updateRowCount] = await Estudiante.update({ url }, { where: { id: id } })
        if (updateRowCount == 0)
            return response.status(400).json({ message: "Estudiante no encontrado" });
        const estudianteEditado = await Estudiante.findOne({ where: { id: id } })
        response.json(estudianteEditado)
    } catch (err) {
        response.status(400).json({ message: err })
    }
}

//para eliminar un estudiante
module.exports.deleteEstudiante = async (request, response) => {
    const { id } = request.params;
    try {
        const estudianteEliminado = await Estudiante.findOne({ where: { id: id } });
        if (!estudianteEliminado)
            return response.status(400).json({ message: "Estudiante no encontrado" });
        await estudianteEliminado.destroy()
        response.json(estudianteEliminado)
    } catch (err) {
        response.status(400).json({ message: err })
    }

}