//IMPORTS
const {Router} = require('express');
const {validateSchema} = require('../middlewares/validator.middleware');
//VALIDATIONS
const {registerEmployeeSchema,registerOwnerSchema} =require('../schemas/register.schema');
const {loginSchema} = require('../schemas/auth.schema');
//CONTROLLERS
const {RegisterEmployee,RegisterOwner,login} = require('../controllers/UserRegister.controller');
//LIBS
const {uploadEmployee,uploadWoner} = require('../libs/ImagesUpload');
//INIT TO THE ROUTER
const router = Router();
const User = require('../models/user.model');

//SECTION EMPLOYEES
router.post(
    '/register-employee',uploadEmployee.single('image'),validateSchema(registerEmployeeSchema),
    RegisterEmployee
);

//SECTION WONER
router.post('/register-owner',uploadWoner.single('image'),validateSchema(registerOwnerSchema),RegisterOwner);

module.exports =router;