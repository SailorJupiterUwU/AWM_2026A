const Estudiante = require("../models/estudiante.models");
const bcrypt = require("bcryptjs");

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
module.exports.newEstudiante = async (request, response) => {
    const { nombre, email, edad, url, password } = request.body;
    //Verificacion que todos los campos si esten
    if (!nombre || !email || !edad || !password)
        response.status(400).json({ message: "Todos los campos son obligatorios" })
    else {
        //Busca usuario repetido
        const estudianteFound = await Estudiante.findOne({ email });
        if (estudianteFound)
            response.status(400).json({ message: "El estudiante ya existe owo (menso) (boink)" })
        else {
            //hash contraseña
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            //Creacion de usuario y devuelve todo menos la contraseña
            Estudiante.create({ nombre, email, edad, url, password: hashedPassword })
                .then(estudianteNuevo => response.json({ nombre: estudianteNuevo.nombre, email: estudianteNuevo.email, edad: estudianteNuevo.edad, url: estudianteNuevo.url }))
                .catch(err => response.json(err))
        }
    }


}

//para hacer login OwOOOOOO
module.exports.loginEstudiante = async (request, response) => {
    const { email, password } = request.body;
    const estudianteFound = await Estudiante.findOne({ email });
    if (estudianteFound && (await bcrypt.compare(password, estudianteFound.password))) {
        response.json({ message: "Loggeado Exitosamente OWO" })
    } else {
        response.status(400).json({ message: "Escribe bien owo" })
    }
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