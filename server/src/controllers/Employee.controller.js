//IMPORTS
const fs = require('fs-extra');
const path = require('path');
const {CastError} =require('mongoose');
//models
const Employee = require('../models/employee.model');

//--------------------------------------------FUNCTIONS
async function getEmployees(req,res){
    try {
        let employees = await Employee.find({state:'activo'}).select('_id name type image');

        return res.status(200).json({employees});
    } catch (error) {
        return res.status(500).json({error:`Error Encontrado: ${error.message}`});
    }
}

async function getIdEmployee(req,res){
    try {
        const {id} = req.params;

        let employee = await Employee.findOne({_id:id,state:'activo'}).select('_id user name lastName phone type image');

        if(!employee){
            return res.status(404).json({message:"Empleado no Encontrado"});
        }
        return res.status(200).json({employee});
    }catch (error) {
        return error instanceof CastError
        ? res.status(400).json({error:"El ID de Usuario Proporcionado es Inválido"})
        : res.status(500).json({error:`Error Encontrado: ${error.message}`});
    }
}

async function updateEmployee(req,res){
    try {
        const {id} =req.params;
        const {name,lastName,phone,type} = req.body;
        let urlfotoanterior;

        let employee = await  Employee.findOne({_id:id, state:'activo'});

        if(!employee){
            return res.status(404).json({message:'Empleado no Encontrado'});
        }


        await Employee.findByIdAndUpdate(id,{
            name,
            lastName,
            phone,
            type
           },{new:true}
        );

        if (employee.image) {
            urlfotoanterior = employee.image.split("/");
        }

        if (req.file) {
            const { filename } = req.file;
            employee.setimgurl(filename);
            await employee.save();
            if (urlfotoanterior && fs.existsSync(path.join(__dirname, '../public/uploads/employees/' + urlfotoanterior[4]))) {
                try {
                    await fs.unlink(path.join(__dirname, '../public/uploads/employees/' + urlfotoanterior[4]));
                } catch (error) {
                    console.error('Error al eliminar la imagen anterior:', error);
                    // Manejar el error adecuadamente, ya sea enviando una respuesta de error al cliente o tomando otra acción
                }
            }
        }

        return res.status(200).json({success:'Empleado Actualizado'});

    }catch (error) {
        return error instanceof CastError
        ? res.status(400).json({error:"El ID de Empleado Proporcionado es Inválido"})
        : res.status(500).json({error:`Error Encontrado: ${error.message}`});
    }
}

async function deleteEmployee(req,res){
    try {
        const {id} = req.params;
        let employee = Employee.findOne({_id:id,state:'activo'});

        if(!employee){
            return res.status(404).json({message:'Empleado no encontrado'});
        }
        await Employee.findByIdAndUpdate(id,{state:'inactivo'},{new:true});

        return res.status(200).json({sucess:'Empleado Eliminado'});
    }catch (error) {
        return error instanceof CastError
        ? res.status(400).json({error:"El ID de Empleado Proporcionado es Inválido"})
        : res.status(500).json({error:`Error Encontrado: ${error.message}`});
    }
}

module.exports = {
    getEmployees,
    getIdEmployee,
    updateEmployee,
    deleteEmployee
}