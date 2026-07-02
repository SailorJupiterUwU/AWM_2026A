const Matricula = require("../models/matricula.model")
const Asignatura = require("../models/asignatura.model")
const Estudiante = require("../models/estudiante.model")

module.exports.matricularEstudiante = async (request, response) => {
    try{
        const { estudianteId, asignaturaId } = request.body;
        const matricula = await Matricula.create({EstudianteId: estudianteId, AsignaturaId: asignaturaId});

        response.json(matricula)
    } catch(err){
        response.status(500).json({message: "Ocurrio un error al registra la matricula"})
    }
}

module.exports.getEstudianteMatriculado = async (request, response) => {
    const id = request.params.estudianteId;
    try{
        const matriculados = await Matricula.findAll({
            where: {EstudianteId: id},
            include: [Asignatura, Estudiante]
        });
        response.json(matriculados);
    }
    catch(err){
        console.log(err)
        response.status(500).json({message: "Ocurrio un error al obtener las asignaturas"})
    }
}