const Matricula = require("../models/matricula.model")
const Asignatura = require("../models/asignatura.model")
const Estudiante = require("../models/estudiante.model")

module.exports.matricularEstudiante = async (request, response) => {
    try {
        const { estudianteId, asignaturaId } = request.body;
        const matricula = await Matricula.create({ EstudianteId: estudianteId, AsignaturaId: asignaturaId });

        response.json(matricula)
    } catch (err) {
        response.status(500).json({ message: "Ocurrio un error al registra la matricula" })
    }
}

module.exports.getEstudianteMatriculado = async (request, response) => {
    const id = request.params.estudianteId;
    try {
        const matriculados = await Matricula.findAll({
            where: { EstudianteId: id },
            include: [
                {
                    model: Asignatura,
                    attributes: [['nombre', 'Asignatura']]
                },
                {
                    model: Estudiante,
                    attributes: [['nombre', 'Estudiante']]
                }
            ]
        });
        response.json(matriculados);
    }
    catch (err) {
        console.log(err)
        response.status(500).json({ message: "Ocurrio un error al obtener las asignaturas" })
    }
}

module.exports.deleteMatriculaEstudiante = async (request, response) => {
    const id = request.params.estudianteId;
    try {
        const filasEliminadas = await Matricula.destroy({
            where: { EstudianteId: id }
        });

        if (filasEliminadas === 0) {
            return response.status(404).json({ message: "No se encontraron matriculas para este estudiante" });
        }

        response.json({ message: "Matricula eliminada correctamente", filasEliminadas });
    } catch (err) {
        console.log(err);
        response.status(500).json({ message: "Ocurrio un error al eliminar la matricula" });
    }
}

module.exports.editarMatricula = async (request, response) => {
    const id = request.params.estudianteId;
    const { asignaturaId } = request.body;
    try {
        const [filasEditadas] = await Matricula.update(
            { AsignaturaId: asignaturaId },
            { where: { EstudianteId: id } }
        );

        if (filasEditadas === 0) {
            return response.status(404).json({ message: "No se encontro matricula para este estudiante" });
        }

        response.json({ message: "Matricula actualizada correctamente" });
    } catch (err) {
        console.log(err);
        response.status(500).json({ message: "Ocurrio un error al editar la matricula" });
    }
}