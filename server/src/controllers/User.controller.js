//IMPORTS
const {CastError} =require('mongoose');
const bcrypt =  require('bcrypt');

//models
const User = require('../models/user.model');

//-------------------------------------------funtions for vet
async function getUsers(req,res){
    try {
        //usuarios del rol 1 son empleados
        let users = await User.find({state:'activo', state:'activo'}).select('_id email rol');
        return res.status(200).json({users});
    } catch (error) {
        return res.status(500).json({error: `Error Encontrado: ${error.message}`});
    }
}
async function getIdUser(req,res){
    try {
        const{id} = req.params;
        let user = await  User.findOne({_id:id,}).select('_id email rol');
        return !user
        ?res.status(404).json({message:'Usuario No Encontrado'})
        :res.status(200).json({user});
    }catch (error) {
        return error instanceof CastError
        ? res.status(400).json({error:"El ID proporcionado es inválido"})
        : res.status(500).json({error:`Error encontrado: ${error.message}`});
    }
}

async function updateUser(req,res){
    try {
        const {id} = req.params;
        const {password} = req.body;

        let user = await User.findById(id);

        if(!user){return res.status(404).json({message:'Usuario no encontrado'})}

        //encryp password
        let salt = await bcrypt.genSalt();
        let passcifrado = await bcrypt.hash(password, salt);

        await User.findByIdAndUpdate(id,
            {password:passcifrado},{new:true}
        )
        return res.status(200).json({success:'Usuario Actualizado'});

    }catch (error) {
        return error instanceof CastError
        ? res.status(400).json({error:"El ID de Usuario proporcionado es inválido"})
        : res.status(500).json({error:`Error Encontrado: ${error.message}`});
    }
}

async function deleteUser(req,res){
    try {
        const {id} = req.params;
        let user = await User.findById(id);
        if(!user){
            return res.status(404).json({message:'Usuario no Encontrado'});
        }
        await User.findByIdAndUpdate(id,{state:'inactivo'},{new:true});
        return res.status(200).json({success:'Usuario Eliminado'});
    }catch (error) {
        return error instanceof CastError
        ? res.status(400).json({error:"El ID de Usuario proporcionado es inválido"})
        : res.status(500).json({error:`Error Encontrado: ${error.message}`});
    }
}

module.exports = {
    getUsers,
    getIdUser,
    updateUser,
    deleteUser
}