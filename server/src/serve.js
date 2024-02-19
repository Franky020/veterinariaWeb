//IMPORTS-----------------------
const express = require('express');
const {dev,production} = require('./config');
const morgan = require('morgan');
const path = require('path');

//IMPORTS-ROUTES
const UserRoute = require('./routes/users.routes');
const AuthRoute = require('./routes/Auth.routes');

//inicializacion-app
const app = express();

//PORT
const PORT = dev.Serve.PORT;
app.set('PORT',PORT);
//ROUTES ACCESS IMAGES PUBLIC
app.use('/foto-emp',express.static(path.join(__dirname,'/public/uploads/employees/')));
app.use('/foto-own',express.static(path.join(__dirname,'/public/uploads/owner/')));

//MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text({ type: 'text' }));


//ROUTES-USE
app.get('/',(req,res)=>{
    res.send('Bienvenido al servidor');
})
app.use('/user',UserRoute);
app.use('/auth',AuthRoute);


//EXPORTAMOS 
module.exports = app;
