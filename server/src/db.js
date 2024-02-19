//IMPORTS ----------------
const mongoose = require('mongoose')
const {dev} = require('./config');
//CONECTIO
const conectionDB = async()=>{
    try {
        await mongoose.connect(dev.Database.CONECTION);
        console.log('DB is Conected');
    } catch (error) {
        console.log(error);
    }
}

const close = async ()=>{
    try {
        mongoose.disconnect();
        console.log('Conexion cerrada');
    } catch (error) {
        console.log(error);
    }
} 

module.exports = {
    conectionDB,
    close
}
