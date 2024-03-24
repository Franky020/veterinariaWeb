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
const consultC = require('../controllers/consultation.controller');
const medHC = require('../controllers/medicalHistory.controller');
const saleC = require('../controllers/sales.controller');

//LIBS-images

//routes
router.get('/my/:id',getIdOwner);//user
//------------------------------------pets
router.get('/myPets/:id',getPetOwnerId);
router.get('/consultPet/:id',consultC.getConsultForPetId);
router.get('/medical_history/:id',medHC.getMedicalH_PetId);
router.get('/my_tickects/:id',saleC.getSalesForOwnerId)
//--------------------------------------products
router.get('/product',getProducts);
router.get('/product/:id',getIdProduct);
//-------------------------------------services
router.get('/services',getServicesActived);

module.exports = router;