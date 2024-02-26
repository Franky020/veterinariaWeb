//IMPORTS
const mongoose = require('mongoose');

//Schema

const serviceSchema = new mongoose.Schema({
    service:{
        type:String,
        require:true,
        unique:true
    },
    description:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    state:{
        type:String,
        enum:['activo','inactivo'],
        default: 'activo'
    }
});

module.exports = mongoose.model('Service',serviceSchema);