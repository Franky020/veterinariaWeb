//IMPORTS
const User = require('../models/user.model');
const bcrypt =  require('bcrypt');

//functions

async function login(req,res){
    const{email,password} = req.body;
    try {
        console.log(email);
        let usuario = await User.findOne({email: email});

        if(!usuario){
            return res.status(404).json({message: "usuario no encontrado"})
        }

        if(!await bcrypt.compare(password, usuario.password)){
            return res.status(401).json({message: "credenciales incorrectas"});
        }

        return res.status(200).json({
            id: usuario._id,
            rol:usuario.rol
        });
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

module.exports = {
    login
}