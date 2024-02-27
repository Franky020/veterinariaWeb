//IMPORTS
const {Router} =require('express');
const router = Router();
//MIDDLEWARES
const auntentifica = require('../middlewares/autentificajwt');
//Validation MIDDLEWARE
const {validateSchema} = require('../middlewares/validator.middleware');
//SCHEMAS
const {updateUserSchema} = require('../schemas/register.schema')
const {updateOwnerSchema} = require('../schemas/owner.schema');
const {updateEmployeeSchema} = require('../schemas/employee.schema');
const {registerPetSchema,updatePetSchema} =require('../schemas/pet.schema');
const {R_productSchema,U_productSchema} = require('../schemas/product.schema');
const {R_serviceSchema,U_serviceSchema} = require('../schemas/service.schema');
const {R_medicationSchema,U_medicationSchema} = require('../schemas/medication.schema');
//CONTROLLERS
const {deleteUser,getIdUser,getUsers,updateUser} = require('../controllers/User.controller')
const {deleteEmployee,getEmployees,getIdEmployee,updateEmployee} = require('../controllers/Employee.controller');
const {deleteOwner,getIdOwner,getOwners,updateOwner} = require('../controllers/owner.controller');
const {deletePet,getIdPet,getPets,registerPet, updatePet} = require('../controllers/pet.controller');
const {deleteProduct,getIdProduct,getProducts,registerProduct,updateProduct} = require('../controllers/product.controller');
const {IdGetService,createService,deleteService,getServices,updateService} = require('../controllers/service.controller');
const {deleteMedicine,getIdMedicine,getMedicines,registerMedicine,updateMedicine} = require('../controllers/medication.controller');
//LIBS-images
const { uploadPet, uploadProduct,uploadEmployee, uploadOwner,uploadMedical} = require('../libs/ImagesUpload');

//-----------------------------------------------------------------------------------routes

//---------------------------------users-employees
router.get('/empUser',getUsers);

router.get('/empUser/:id',getIdUser);

router.put('/empUser/:id',uploadEmployee.none(),validateSchema(updateUserSchema),updateUser);

router.delete('/empUser/:id',deleteUser);
//----------------------------------employees

router.get('/employee',getEmployees);

router.get('/employee/:id',getIdEmployee);

router.put('/employee/:id',uploadEmployee.single('image'),validateSchema(updateEmployeeSchema),updateEmployee);

router.delete('/employee/:id',deleteEmployee);

//---------------------------------owner

router.get('/owner',getOwners);

router.get('/owner/:id',getIdOwner);

router.put('/owner/:id',uploadOwner.single('image'),validateSchema(updateOwnerSchema),updateOwner);

router.delete('/owner/:id',deleteOwner);

//------------------------------------pets

router.get('/pet',getPets);

router.get('/pet/:id',getIdPet);

router.post('/pet',uploadPet.single('image'),validateSchema(registerPetSchema),registerPet);

router.put('/pet/:id',uploadPet.single('image'),validateSchema(updatePetSchema),updatePet);

router.delete('/pet/:id',deletePet);


//-------------------------------------products

router.get('/product',getProducts);

router.get('/product/:id',getIdProduct);

router.post('/product',uploadProduct.fields([{ name: 'image', maxCount: 1 }, { name: 'image2', maxCount: 1 }]),validateSchema(R_productSchema),registerProduct);

router.put('/product/:id',uploadProduct.fields([{ name: 'image', maxCount: 1 }, { name: 'image2', maxCount: 1 }]),validateSchema(U_productSchema),updateProduct);

router.delete('/product/:id',deleteProduct);

//----------------------------------services

router.get('/service',getServices);

router.get('/service/:id',IdGetService);

router.post('/service',uploadProduct.none(),validateSchema(R_serviceSchema),createService);

router.put('/service/:id',uploadProduct.none(),validateSchema(U_serviceSchema),updateService);

router.delete('/service/:id',deleteService);


//---------------------------------------------medications

router.get('/medication',getMedicines);

router.get('/medication/:id',getIdMedicine);

router.post('/medication',uploadMedical.single('image'),validateSchema(R_medicationSchema),registerMedicine);

router.put('/medication/:id',uploadMedical.single('image'),validateSchema(U_medicationSchema),updateMedicine);

router.delete('/medication/:id',deleteMedicine);






module.exports = router;