//IMPORTS
const User = require('../models/user.model');
const bcrypt =  require('bcrypt');
const Employee = require('../models/employee.model');
const Owner = require('../models/owner.model');
//functions

async function login(req,res){
    const{email,password} = req.body;
    try {
        console.log(email);
        let usuario = await User.findOne({email: email,state:'activo'});

        if(!usuario){
            return res.status(404).json({message: "usuario no encontrado"})
        }

        if(!await bcrypt.compare(password, usuario.password)){
            return res.status(401).json({message: "credenciales incorrectas"});
        }
        let user ={
            id:usuario._id,
            rol:usuario.rol
        }

        return res.status(200).json({user});
    } catch (error) {
        return res.status(500).json({error: `Error Encontrado: ${error.message}`});
    }
}//primary login 

async function loginEmployee(req,res){
    const {id} = req.params;
    try {
        let employee = await Employee.findOne({user:id, state:'activo'});

        if(!employee){
            return res.status(404).json({message:"No se Encontro un Empelado Relacionado al Usuario"});
        }

        let EmpData = {
            name: employee.name,
            lastName: employee.lastName,
            type:employee.type,
            img:employee.image,
            jwtoken: employee.generadorJWT()
        }

        return res.status(200).json({EmpData});
    } catch (error) {
        return res.status(500).json({error:`Error Encontrado: ${error.message}`});
    }
}

async function loginOwner(req,res){
    const {id} = req.params;
    try {
        let owner = await Owner.findOne({user:id, state:'activo'});

        if(!owner){
            return res.status(404).json({message:"No se Encontro una Cuenta Relacionado al Usuario"});
        }

        let OwnData = {
            name:owner.name,
            lastName:owner.lastName,
            phone:owner.phone,
            img:owner.image,
            jwtoken: owner.generadorJWT()
        }

        return res.status(200).json({OwnData});
    } catch (error) {
        return res.status(500).json({error: `Error encotrado: ${error.message}`});
    }
}

module.exports = {
    login,
    loginEmployee,
    loginOwner
}