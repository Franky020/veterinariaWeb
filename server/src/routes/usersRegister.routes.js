//IMPORTS
const {Router} = require('express');
//MIDDLEWARE
const {validateSchema} = require('../middlewares/validator.middleware');
//VALIDATIONS
const {registerEmployeeSchema,registerOwnerSchema} =require('../schemas/register.schema');
//CONTROLLERS
const {RegisterEmployee,RegisterOwner} = require('../controllers/UserRegister.controller');
//LIBS
const {uploadEmployee,uploadOwner} = require('../libs/ImagesUpload');
//INIT TO THE ROUTER
const router = Router();

//SECTION EMPLOYEES
router.post('/register-employee',uploadEmployee.single('image'),validateSchema(registerEmployeeSchema),RegisterEmployee);//register user with employee


//SECTION WONER
router.post('/register-owner',uploadOwner.single('image'),validateSchema(registerOwnerSchema),RegisterOwner);//register user with owner

//users routes
module.exports =router;