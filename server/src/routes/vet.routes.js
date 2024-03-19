//IMPORTS
const {Router} =require('express');
const router = Router();
//MIDDLEWARES--auth
const auntentifica = require('../middlewares/autentificajwt');
//Validation MIDDLEWARE---
const {validateSchema} = require('../middlewares/validator.middleware');
//SCHEMAS----
const {updateUserSchema} = require('../schemas/register.schema');
const {updateOwnerSchema} = require('../schemas/owner.schema');
const {updateEmployeeSchema} = require('../schemas/employee.schema');
const {registerPetSchema,updatePetSchema} =require('../schemas/pet.schema');
const {R_productSchema,U_productSchema,R_productEntrySchema} = require('../schemas/product.schema');
const {R_serviceSchema,U_serviceSchema} = require('../schemas/service.schema');
const {R_medicationSchema,U_medicationSchema,R_medicationEntrySchema} = require('../schemas/medication.schema');
//CONTROLLERS---
const userC = require('../controllers/User.controller')
const empC = require('../controllers/Employee.controller');
const ownC = require('../controllers/owner.controller');
const petC = require('../controllers/pet.controller');
const prodC = require('../controllers/product.controller');
const servC = require('../controllers/service.controller');
const medC = require('../controllers/medication.controller');
//LIBS-images--
const { uploadPet, uploadProduct,uploadEmployee, uploadOwner,uploadMedical} = require('../libs/ImagesUpload');

//-----------------------------------------------------------------------------------routes

//---------------------------------users
    router.get('/userEmp',userC.getUsers);//exclusivo para admin
    router.get('/user/:id',userC.getIdUser);
    router.put('/user/:id',uploadEmployee.none(),validateSchema(updateUserSchema),userC.updateUser);
    router.delete('/user/:id',userC.deleteUser);
//----------------------------------employees

    router.get('/employee',empC.getEmployees);
    router.get('/employee/:id',empC.getIdEmployee);
    router.put('/employee/:id',uploadEmployee.single('image'),validateSchema(updateEmployeeSchema),empC.updateEmployee);
    router.delete('/employee/:id',empC.deleteEmployee);

//---------------------------------owner

    router.get('/owner',ownC.getOwners);
    router.get('/owner/:id',ownC.getIdOwner);
    router.put('/owner/:id',uploadOwner.single('image'),validateSchema(updateOwnerSchema),ownC.updateOwner);
    router.delete('/owner/:id',ownC.deleteOwner);

//------------------------------------pets

    router.get('/pet',petC.getPets);
    router.get('/pet/:id',petC.getIdPet);
    router.post('/pet',uploadPet.single('image'),validateSchema(registerPetSchema),petC.registerPet);
    router.put('/pet/:id',uploadPet.single('image'),validateSchema(updatePetSchema),petC.updatePet);
    router.delete('/pet/:id',petC.deletePet);

//-------------------------------------products

    router.get('/product',prodC.getProducts);
    router.get('/product/:id',prodC.getIdProduct);
    router.post('/product',uploadProduct.fields([{ name: 'image', maxCount: 1 }, { name: 'image2', maxCount: 1 }]),validateSchema(R_productSchema),prodC.registerProduct);
    router.put('/product/:id',uploadProduct.fields([{ name: 'image', maxCount: 1 }, { name: 'image2', maxCount: 1 }]),validateSchema(U_productSchema),prodC.updateProduct);
    router.delete('/product/:id',prodC.deleteProduct);
    //entries-product
    router.post('/product/entry/:id',uploadProduct.none(),validateSchema(R_productEntrySchema),prodC.productEntries);
    router.get('/product-entries',prodC.getEntries);

//----------------------------------services

    router.get('/service',servC.getServices);
    router.get('/service/:id',servC.IdGetService);
    router.post('/service',uploadProduct.none(),validateSchema(R_serviceSchema),servC.createService);
    router.put('/service/:id',uploadProduct.none(),validateSchema(U_serviceSchema),servC.updateService);
    router.delete('/service/:id',servC.deleteService);

//---------------------------------------------medications

    router.get('/medication',medC.getMedicines);
    router.get('/medication/:id',medC.getIdMedicine);
    router.post('/medication',uploadMedical.single('image'),validateSchema(R_medicationSchema),medC.registerMedicine);
    router.put('/medication/:id',uploadMedical.single('image'),validateSchema(U_medicationSchema),medC.updateMedicine);
    router.delete('/medication/:id',medC.deleteMedicine);
    //entry-medication
    router.post('/medication/entry/:id',uploadMedical.none(),validateSchema(R_medicationEntrySchema),medC.entryMedications);






module.exports = router;