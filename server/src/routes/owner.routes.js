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
const {getServicesActived} = require('../controllers/service.controller');
const { getIdOwner } = require('../controllers/owner.controller');

//LIBS-images

//routes
router.get('/my/:id',getIdOwner);
//------------------------------------pets
router.get('/myPets/:id',getPetOwnerId);
//--------------------------------------products
router.get('/product',getProducts);
router.get('/product/:id',getIdProduct);
//-------------------------------------services
router.get('/services',getServicesActived);

module.exports = router;