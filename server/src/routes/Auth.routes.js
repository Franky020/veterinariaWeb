//IMPORTS
const {Router} = require('express');
const router = Router();

//VALIDATIONS
const {loginSchema} = require('../schemas/auth.schema');

//CONTROLLERS
const {login} = require('../controllers/Auth.controller');
//LIBS
const {uploadEmployee} = require('../libs/ImagesUpload');
//LOGIN
router.post('/login',uploadEmployee.none(),login);
module.exports = router;