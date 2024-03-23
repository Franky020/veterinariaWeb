const Consult  = require('../models/consult.model');
const {CastError} =require('mongoose');

async function getConsults(req,res){
    try {
        let consults = await Consult.find().populate({path:petId,path:vetId});
        return res.status(200).json({consults});
    } catch (error) {
        return res.status(500).json({error:`Error encontrado: ${error.message}`})
    }
}

async function getIdConsult(req,res){
    try {
        const {id} = req.params;
        let consult =await  Consult.findById(id).populate({path:petId,path:vetId});

        return !consult
        ? res.status(404).json({message:'Consulta no Encontrada'})
        : res.status(200).json({consult});
    } catch (error) {
        return error instanceof CastError
        ? res.status(400).json({message:"El ID Proporcionado es Inválido"})
        : res.status(500).json({error:`Error Encontrado: ${error.message}`});
       
    }
}

async function getConsultForPetId(req,res){
    try {
        const {id} = req.params;
        let consults = await  Consult.find({petId:id}).populate({path:petId,path:vetId});

        return res.status(200).json({consults});
    } catch (error) {
        return error instanceof CastError
        ? res.status(400).json({message:"El ID Proporcionado es Inválido"})
        : res.status(500).json({error:`Error Encontrado: ${error.message}`});
       
    }
}

async function registerConsult(req,res){
    try {
        const {petId,vetId,nameVet,diagnosis,observations,signs,treatment} = req.body;

        let newConsult = new Consult({
            petId,
            vetId,
            nameVet,
            diagnosis,
            observations,
            signs,
            treatment
        });

        await newConsult.save();

        return res.status(201).json({success:'Consulta Guardada'});
    } catch (error) {
        return res.status(500).json({error:`Error encontrado: ${error.message}`});
    }
}

async function editConsult(req,res){
    try {
        const {id} = req.params;
        const {vetId,nameVet,diagnosis,observations,signs,treatment} = req.body;

        let consult = await  Consult.findById(id);
        if(!consult){
            return res.status(404).json({message:'Consulta no Encontrada'});
        }

        await Consult.findByIdAndUpdate(id,
            {
                vetId,
                nameVet,
                diagnosis,
                observations,
                signs,
                treatment 
            },{new:true});
        
        return res.status(200) .josn({success:'Consulta Actualizada'})
    } catch (error) {
        return error instanceof CastError
        ? res.status(400).json({message:"El ID Proporcionado es Inválido"})
        : res.status(500).json({error:`Error Encontrado: ${error.message}`});
       
    }
}

module.exports = {
    editConsult,
    getConsultForPetId,
    getConsults,
    getIdConsult,
    registerConsult
}