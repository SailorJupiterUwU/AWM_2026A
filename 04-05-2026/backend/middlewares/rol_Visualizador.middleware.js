const jwt_secret = "owo123"
const jwt = require("jsonwebtoken");
const Estudiante = require("../models/estudiante.models");

module.exports.rol_Admin = async(req, res, next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization;
            token = token.split(' ')[1]

            const decoded = jwt.verify(token, jwt_secret);
            if (decoded.rol == "visualizador")
                next();
        } catch(err){
            res.status(401).json({message: 'No disponible para ti owo'})
        }
    }

    if(!token){
        res.status(401).json({message: 'Perdiste el token owo lola'})
    }
}