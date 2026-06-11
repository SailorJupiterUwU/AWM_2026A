const Estudiante = require("../models/estudiante.models");

module.exports.getAllEstudiantes = async (_, res) => {
    try {
        const estudiantes = await Estudiante.findAll();
        res.json(estudiantes);
    } catch (error) {
        res.status(500).json(error);
    }
};