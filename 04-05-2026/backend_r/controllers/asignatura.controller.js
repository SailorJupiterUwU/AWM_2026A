const Asignatura = require("../models/asignatura.model")
const Matricula = require("../models/matricula.model")
const { Op } = require("sequelize")

module.exports.getAllAsignaturas = async (request, response) => {
    try {
        const asignaturas = await Asignatura.findAll({})
        response.json(asignaturas)
    } catch (err) {
        response.status(500).json({ message: "Ocurrió un error al obtener las asignaturas" })
    }
}

module.exports.getAsignatura = async (request, response) => {
    const id = request.params.asignaturaId;
    try {
        const asignatura = await Asignatura.findByPk(id)
        if (!asignatura)
            return response.status(404).json({ message: "Asignatura no encontrada" })
        response.json(asignatura)
    } catch (err) {
        response.status(500).json({ message: "Ocurrió un error al obtener la asignatura indicada" })
    }
}

module.exports.newAsignatura = async (request, response) => {
    const { nombre } = request.body
    try {
        const existente = await Asignatura.findOne({ where: { nombre } })
        if (existente)
            return response.status(400).json({ message: "Ya existe una asignatura con ese nombre" })

        await Asignatura.create({ nombre })
        response.json({ message: "Asignatura agregada exitosamente" })
    } catch (err) {
        console.log(err)
        response.status(500).json({ message: "La asignatura no se pudo crear" })
    }
}

module.exports.editarAsignatura = async (request, response) => {
    const id = request.params.asignaturaId;
    const { nombre } = request.body
    try {
        const asignatura = await Asignatura.findByPk(id)
        if (!asignatura)
            return response.status(404).json({ message: "No se encontro la asignatura para editar" })

        const existente = await Asignatura.findOne({
            where: { nombre, id: { [Op.ne]: id } }
        })
        if (existente)
            return response.status(400).json({ message: "Ya existe otra asignatura con ese nombre" })

        await asignatura.update({ nombre })
        response.json({ message: "Asignatura editada exitosamente" })
    }
    catch (err) {
        console.log(err)
        response.status(500).json({ message: "Error al editar la asignatura" })
    }
}

module.exports.deleteAsignatura = async (request, response) => {
    const id = request.params.asignaturaId;
    try {
        const asignatura = await Asignatura.findByPk(id)
        if (!asignatura)
            return response.status(404).json({ message: "Asignatura no encontrada para eliminar" })

        const matriculasExistentes = await Matricula.count({ where: { AsignaturaId: id } })
        if (matriculasExistentes > 0)
            return response.status(400).json({ message: "No se puede eliminar: existen matriculas asociadas a esta asignatura" })

        await asignatura.destroy()
        response.json({ message: "Asignatura eliminada exitosamente" })
    } catch (err) {
        console.log(err)
        response.status(500).json({ message: "Error al eliminar la asignatura" })
    }
}