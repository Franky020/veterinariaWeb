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
//CONTROLLERS
const {deleteUser,getIdUser,getUsers,updateUser} = require('../controllers/User.controller')
const {deleteEmployee,getEmployees,getIdEmployee,updateEmployee} = require('../controllers/Employee.controller');
const {deleteOwner,getIdOwner,getOwners,updateOwner} = require('../controllers/owner.controller');
const {deletePet,getIdPet,getPets,registerPet, updatePet} = require('../controllers/pet.controller');
//LIBS-images
const { uploadPet, uploadProduct,uploadEmployee, uploadOwner} = require('../libs/ImagesUpload');

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




module.exports = router;