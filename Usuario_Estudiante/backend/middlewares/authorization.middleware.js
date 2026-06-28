//middleware se ejecuta antes del controlador y es para verificar la integridad del token
const jwt_secret = "owo123"

const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario.model")

module.exports.authorization = async(request, response, next)=>{
    let token;
    if(request.headers.authorization && request.headers.authorization.startsWith('Bearer')){
        try{
            token = request.headers.authorization;
            token = token.split(' ')[1]

            const decoded = jwt.verify(token, jwt_secret);

            request.Usuario = await Usuario.findOne({_id: decoded.id}).select('-password');
            return next();
        } catch(err){
            response.status(401).json({message: 'No disponible para ti owo'})
        }
    }

    if(!token){
        response.status(401).json({message: 'Perdiste el token owo lola'})
    }
}