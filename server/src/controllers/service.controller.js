//IMPORTS
const { json } = require('express');
const Service = require('../models/service.model');
const {CastError} =require('mongoose');

//-------------------------------------get
async function getServices(req,res){
    try {
        const services = await Service.find({}).select('_id service price state');
        return res.status(200).json({services});
    } catch (error) {
        return res.status(500).json({error:`Error Encontrado : ${error.message}`});
    }
}

//-----------------------------------IDGet
async function IdGetService(req,res){
    try {
        const {id} = req.params;
        let service = await Service.findById(id);

        return !service
        ? res.status(404).json({message: 'No se encontro el servicio'})
        :res.status(200).json({service});
    }catch (error) {
        return error instanceof CastError
        ? res.status(400).json({error:"El ID del Servicio proporcionado es inválido"})
        : res.status(500).json({error:`Error encontrado: ${error.message}`});
    }
}
//--------------------------------------post
async function createService(req,res){
    try {
        const {service, description, price} = req.body;

        const newService = new Service({
            service,
            description,
            price
        });

        await newService.save();

        return res.status(200).json({success: 'Servicio Creado'});

    }catch (error) {
        if (error.code === 11000 && error.keyPattern && error.keyPattern.service) {
            return res.status(400).json({ error: 'Servicio ya Registrado' });
        } 
        return res.status(500).json({error: `Error encontrado: ${error.message}`}); 
    }
}

//---------------------------------------put

async function updateService(req,res){
    try {
        const {id} = req.params;
        const {service, description, price} = req.body;

        let servi = await Service.findById(id);

        if(!servi){
            return res.status(404).json({message:'Servicio no encontrado'});
        }

        await Service.findByIdAndUpdate(id,{
            service:service,
            description: description,
            price:price
        },{new:true});

        return res.status(200).json({success:'Servcio Actualizado'});

    }catch (error) {
        return error instanceof CastError
        ? res.status(400).json({error:"El ID del Servicio proporcionado es inválido"})
        : res.status(500).json({error:`Error encontrado: ${error.message}`});
    }
}
//--------------------------------------delete

async function deleteService(req,res){
    try {
        const {id} = req.params;
        let service = await  Service.findById(id);

        if(!service){
            return res.status(404),json({message:`Servicio no encontrado`});
        }
        await Service.findByIdAndUpdate(id,{
            state:'inactivo'
        },{new:true});

        return res.status(200).json({success:'Servico Eliminado'});
    }catch (error) {
        return error instanceof CastError
        ? res.status(400).json({error:"El ID del Servicio proporcionado es inválido"})
        : res.status(500).json({error:`Error encontrado: ${error.message}`});
    }
}

//function for owners
async function getServicesActived(req,res){
    try {
        let services = await Service.find({state:'activo'});
        return res.status(200).json({services});
    } catch (error) {
        return res.status(500).json({error: `Error Encontrado: ${error.message}`});
    }
}

module.exports = {
    getServices,
    IdGetService,
    createService,
    updateService,
    deleteService,
    getServicesActived
}