const Estudiante = require("../models/estudiante.models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
        .select("-password")
        .then(estudiante => response.json(estudiante))
        .catch(err => response.status(500).json(err))
}

//para crear un nuevo estudiante
module.exports.newEstudiante = async (request, response) => {
    const { nombre, email, edad, url, password, rol } = request.body;
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
                .then(estudianteNuevo => response.json({ nombre: estudianteNuevo.nombre, email: estudianteNuevo.email, edad: estudianteNuevo.edad, url: estudianteNuevo.url, rol: estudianteNuevo.rol }))
                .catch(err => response.status(500).json(err))
        }
    }

}

//para hacer login OwOOOOOO
module.exports.loginEstudiante = async (request, response) => {
    const { email, password } = request.body;
    const estudianteFound = await Estudiante.findOne({ email });
    if (estudianteFound && (await bcrypt.compare(password, estudianteFound.password))) {
        response.json({ message: "Loggeado Exitosamente OWO", token: generateToken(estudianteFound._id, estudianteFound.nombre, estudianteFound.email, estudianteFound.rol) })
    } else {
        response.status(400).json({ message: "Escribe bien owo" })
    }
}

//para generar el token
//instalar biblioteca json token
//se puede enviar un rol en el parametro de entrada (esto va en el payload)
//en ves de JWT_SECRET un const: contraseña y la password
const jwt_secret = "owo123"
//se define el tiempo de expiracion
const generateToken = (id, nombre, email, rol) => {
    return jwt.sign({id, nombre, email, rol }, jwt_secret, {expiresIn: '30d'})
}

//para editar estudiante
module.exports.editEstudiante = (request, response) => {
    const { id } = request.params;
    const { nombre, email, edad, url, password} = request.body;
    Estudiante.findOneAndUpdate({ _id: id }, { nombre, edad, url, email, password }, { returnDocument: 'after' })
        .then(estudianteEditado => response.json({nombre: estudianteEditado.nombre, email: estudianteEditado.email, edad: estudianteEditado.edad, url: estudianteEditado.url}))
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