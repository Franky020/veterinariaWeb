const jwt = require('jsonwebtoken');
const {dev} = require('../config');
function auntentifica(req,res,next) {
    const jwtoken = req.header('Authorization');
    if(!jwtoken){
        return res.status(401).send('Acceso denegado, Necesitas un token');

    }
    try {
        const payload = jwt.verify(jwtoken,dev.SECRET_TOKEN);
        req.user = payload;
        next();
    } catch (e) {
        res.status(400).send('Acceso denegado, Token no valido');
    }
}   

module.exports = auntentifica