const Usuario = require("../models/usuario.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//para crear un nuevo estudiante
module.exports.newUsuario = async (request, response) => {
    const { email, rol, password } = request.body;
    //Verificacion que todos los campos si esten
    if (!email || !rol || !password)
        response.status(400).json({ message: "Todos los campos son obligatorios (boink)" })
    else {
        //Busca usuario repetido
        const usuarioFound = await Usuario.findOne({ email });
        if (usuarioFound)
            response.status(400).json({ message: "El usuario ya existe owo (menso) (boink)" })
        else {
            //hash contraseña
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            //Creacion de usuario y devuelve todo menos la contraseña
            Usuario.create({ email, rol, password: hashedPassword })
                .then(usuarioNuevo => response.json({ email: usuarioNuevo.email, rol: usuarioNuevo.rol}))
                .catch(err => response.status(500).json(err))
        }
    }

}

//para hacer login OwOOOOOO
module.exports.loginUsuario = async (request, response) => {
    const { email, password } = request.body;
    const usuarioFound = await Usuario.findOne({ email });
    if (usuarioFound && (await bcrypt.compare(password, usuarioFound.password))) {
        response.json({ message: "Loggeado Exitosamente OwO", token: generateToken(usuarioFound._id, usuarioFound.rol) })
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
const generateToken = (id , rol) => {
    return jwt.sign({id, rol }, jwt_secret, {expiresIn: '30d'})
}