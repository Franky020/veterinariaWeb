//IMPORTS
const {Router} =require('express');
const router = Router();
//MIDDLEWARES
const auntentifica = require('../middlewares/autentificajwt');
//Validation MIDDLEWARE

//SCHEMAS

//CONTROLLERS
const {getPetOwnerId} = require('../controllers/pet.controller');
//LIBS-images

//routes
router.get('/myPets/:id',getPetOwnerId);

module.exports = router;