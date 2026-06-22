//middleware se ejecuta antes del controlador y es para verificar la integridad del token
const jwt_secret = "owo123"

const jwt = require("jsonwebtoken");
const Estudiante = require("../models/estudiante.models")

module.exports.authorization = async(req, res, next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization;
            token = token.split(' ')[1]

            const decoded = jwt.verify(token, jwt_secret);

            req.Estudiante = await Estudiante.findOne({_id: decoded._id}).select('-password');
            next();
        } catch(err){
            res.status(401).json({message: 'No disponible para ti owo'})
        }
    }

    if(!token){
        res.status(401).json({message: 'Perdiste el token owo lola'})
    }
}