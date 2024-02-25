//IMPORTS
const Pet = require('../models/pet.model');
//'CastError' es para manejar errores recibidos de la bd
const {CastError} =require('mongoose');
const fs = require('fs-extra');
const path = require('path')
//function---for vet 
//------------------------------------get
async function getPets(req,res){
    try {
        let pets = await Pet.find({state:'activo'}).select('_id details specie');
        return res.status(200).json({pets})
    } catch (error) {
        return res.status(500).json({error:`Error Encontrado :${error.message}`});
    }
}

//-----------------------------------get id
async function getIdPet(req,res){
    try {
        const {id} = req.params;
        let pet = await Pet.findOne({_id:id, state:'activo'}).select('_id details specie')
        .populate({path:'owner', select:'_id name lastName phone image'});

        return !pet 
        ? res.status(404).json({message:"Mascota no encontrada"})
        : res.status(200).json({pet});

    }catch (error) {
        return error instanceof CastError
        ? res.status(400).json({error:"El ID de la Mascota proporcionada es inválida"})
        : res.status(500).json({error:`Error encontrado: ${error.message}`});
    }
}
//-----------------------------------------post
async function registerPet(req,res){
    const {name, breed, birthDate, gender, weight, specie, ownerId} = req.body;
    try {
       

        const newPet = new Pet({
            details: {
                name,
                breed,
                birthDate,
                gender,
                weight,
            },
            specie: specie,
            owner: ownerId
        });
        
        if(req.file){
            const {filename} = req.file;
            newPet.setimgurl(filename);
        }

        await newPet.save();

        return res.status(201).json({success:'Mascota Registrada Exitosamente'});
    } catch (error) {
        return res.status(500).json({error:`Ocurrió un error al registrar la mascota, error: ${error.message}`});
    }

}

//----------------------------------
async function updatePet(req, res) {
    try {
        const { name, breed, birthDate, gender, specie, weight, ownerId } = req.body;
        const { id } = req.params;

        let urlfotoanterior;
        let pet = await Pet.findByIdAndUpdate(
            id,
            {
                $set: {
                    'details.name': name,
                    'details.breed': breed,
                    'details.birthDate': birthDate,
                    'details.gender': gender,
                    'details.weight': weight,
                    species: specie,
                    owner: ownerId
                }
            },
            { new: true }
        );

        if (!pet) {
            return res.status(404).json({ message: 'No se encontró la mascota' });
        }

        if (pet.details.image) {
            urlfotoanterior = pet.details.image.split("/");
        }

        if (req.file) {
            const { filename } = req.file;
            pet.setimgurl(filename);
            await pet.save();
            if (urlfotoanterior && fs.existsSync(path.join(__dirname, '../public/uploads/pet/' + urlfotoanterior[4]))) {
                try {
                    await fs.unlink(path.join(__dirname, '../public/uploads/pet/' + urlfotoanterior[4]));
                } catch (error) {
                    console.error('Error al eliminar la imagen anterior:', error.message);
                    // Manejar el error adecuadamente, ya sea enviando una respuesta de error al cliente o tomando otra acción
                }
            }
        }

        return res.status(201).json({success:'Mascota Actualizada'});
    }catch (error) {
        return error instanceof CastError
        ? res.status(400).json({error:"El ID de la Mascota proporcionada es inválida"})
        : res.status(500).json({error:`Error encontrado: ${error.message}`});
    }
}

//---------------------------------
async function deletePet(req,res){
    try {
        const {id} = req.params;
        let pet = await Pet.findOne({_id: id, state:'activo'});

        if(!pet){
            return res.status(404).json({message: 'mascota no encontrada'});
        }

        pet = await Pet.findByIdAndUpdate(id,{
            state:'inactivo'
        },{new:true});

        return res.status(200).json({success:'Mascota Eliminada'});
    }catch (error) {
        return error instanceof CastError
        ? res.status(400).json({error:"El ID de la Mascota proporcionada es inválida"})
        : res.status(500).json({error:`Error encontrado: ${error.message}`});
    }
}

//function for owner---------------------------
async function getPetOwnerId(req,res){
    try {
        const {id} = req.params;
        let pets = await Pet.find({owner:id , state:'activo'});
        return res.status(200).json({pets});
    }catch (error) {
        return error instanceof CastError
        ? res.status(400).json({error:"El ID del Dueño proporcionado es inválido"})
        : res.status(500).json({error:`Error Encontrado: ${error.message}`});
    }
}
//---------------------------------
module.exports = {
    getPets,
    getIdPet,
    registerPet,
    updatePet,
    deletePet,
    //owner function to the owner endpoins
    getPetOwnerId
}