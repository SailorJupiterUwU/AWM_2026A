const Usuario = require("../models/usuario.models")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

//Contraseña con la cual se va a firmar el token
const JWT_SECRET = "prueba3_OwO"

//Funcion para generar los tokens
const generateToken = (id, email, rol) => {
    return jwt.sign({ id, email, rol }, JWT_SECRET, { expiresIn: "30d" })
}

//Para crear un usuario
module.exports.newUsuario = async (request, response) => {
    const { email, password, rol } = request.body;
    if (!rol || !password || !rol)
        return response.status(400).json({ message: "Todos los campos son obligatorios" })
    else {
        const usuarioDuplicado = await Usuario.findOne({ email })
        if (usuarioDuplicado)
            return response.status(400).json({ message: "Un usuario con este email ya existe" })
        else {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)
            Usuario.create({ email, password: hashedPassword, rol })
                .then(usuario => response.json({ email: usuario.email, rol: usuario.rol }))
                .catch(err => response.status(500).json(err))
        }
    }
}

//Para hacer login
module.exports.loginUsuario = async (request, response) => {
    const { email, password } = request.body;
    const usuarioEncontrado = await Usuario.findOne({ email })
    if (usuarioEncontrado && await bcrypt.compare(password, usuarioEncontrado.password)) {
        const token = generateToken(usuarioEncontrado._id, usuarioEncontrado.email, usuarioEncontrado.rol)
        response.json({ message: "Autenticacion exitosa", token: token })
    } else {
        response.status(400).json({message: "Credenciales Invalidas"})
    }

}