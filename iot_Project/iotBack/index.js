const express = require ('express');
const app = express();

app.use(express.json());

app.get('/', (req,res)=>{
    res.send('My server');
})

const puerto = process.env.PORT || 3000;
app.listen(puerto, ()=>{
    console.log(`El servidor esta en el puerto ${puerto}`)
});