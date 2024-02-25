const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
    details: {
        name: {
            type: String,
            required: true
            
        },
        breed: String,
        birthDate: Date,
        gender: {
            type: String,
            enum: ['Male', 'Female']
        },
        weight: Number,
        image: String
    },
    specie:{
        type:String,
        enum:['Felines','Canines','Rodents','Birds'],
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Owner',
        required: true
    },
    state:{
        type:String,
        enum:['activo','inactivo'],
        default: 'activo'
    }
}, { timestamps: true });

//METHODS
petSchema.methods.setimgurl = function setimgurl(imagen){
    this.details.image = "http://localhost:3000/foto-pet/" + imagen;
}

module.exports = mongoose.model('Pet',petSchema);