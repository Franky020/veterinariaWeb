//IMPORTS
const mongoose = require('mongoose');

//BODY
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    },
    password: {
        type: String,
       // required: true,
        minlength: 8
    },
    rol:{
        //rol 1 = empleado
        //rol 2 = cliente
        type:Number,
        require:true
    },
    state:{
        type:String,
        enum:['activo','inactivo'],
        default: 'activo'
    }
});

module.exports = mongoose.model('User',userSchema);

