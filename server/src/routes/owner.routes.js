//IMPORTS
const {Router} =require('express');
const router = Router();
//MIDDLEWARES
const auntentifica = require('../middlewares/autentificajwt');
//Validation MIDDLEWARE

//SCHEMAS

//CONTROLLERS
const {getPetOwnerId} = require('../controllers/pet.controller');
const {getProducts,getIdProduct} = require('../controllers/product.controller');

//LIBS-images

//routes

//------------------------------------pets
router.get('/myPets/:id',getPetOwnerId);

//--------------------------------------products
router.get('/product',getProducts);
router.get('/product/:id',getIdProduct);

module.exports = router;