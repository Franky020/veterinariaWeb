//IMPORTS
const mongoose = require('mongoose');
const path = require('path');
const jwt = require('jsonwebtoken');
const {dev}= require('../config');

//SCHEMA
const employeeSchema  = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name:{
        type:String,
        require:true,
    },
    lastName:{
        type:String,
        require:true
    },
    phone:{
        type:String,
        required:true,
        maxlength:10
    },
    type:{
        type:String,
        enum:['vet','admin','assistant','receptionist'],
        require:true
    },
    image:{
        type:String
    },
    state:{
        type:String,
        enum:['activo','inactivo'],
        default: 'activo'
    }
    

},{timestamps:true});

// employeeSchema.methods.setimgurl = function setimgurl(imagen){
//     this.imgurl = "http://localhost:3000/foto/" + imagen;
// }

//METHODS
employeeSchema.methods.setimgurl = function setimgurl(imagen){
    this.image = "http://localhost:3000/foto-emp/" + imagen;
}


//TOKEN
employeeSchema.methods.generadorJWT = function(){
    return jwt.sign({
        id:this._id,
        name: this.name,
        type: this.type
    }, dev.SECRET_TOKEN);
}

//EXPORTS
module.exports = mongoose.model('Employee',employeeSchema);