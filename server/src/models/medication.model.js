const mongoose = require('mongoose');

const medicationSchema = new mongoose.Schema({
    medication: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    image: String,
    details: {
        dosageForm: {
            type: String,
            enum: ['Tablet', 'Capsule', 'Liquid', 'Injection', 'Topical', 'Drops', 'Powder', 'Suspension', 'Ointment', 'Gel'],
        },
        dosage: {
            type: String,
        },
        administrationRoute: {
            type: String,
            enum: ['Oral', 'Intravenous', 'Intramuscular', 'Subcutaneous', 'Topical', 'Rectal', 'Ophthalmic', 'Otic'],
        },
        precautions: {
            type: String,
        },
        dateExpiry: {
            type: Date,
        }
    },
    species: [{
        type: String,
        enum: ['Feline', 'Canine', 'Rodent', 'Bird'],
        required: true
    }],
    category: {
        type: String,
        enum: ['Antibiotic', 'Analgesic', 'Anti-inflammatory', 'Antiparasitic', 'Antifungal', 'Antiviral', 'Other'],
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    state:{
        type:String,
        enum:['activo','inactivo'],
        default: 'activo'
    }
});
//METHODS
medicationSchema.methods.setimgurl = function setimgurl(imagen){
    this.image = "http://localhost:3000/foto-medical/" + imagen;
}
module.exports = mongoose.model('Medication', medicationSchema);
