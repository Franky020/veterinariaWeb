//IMPORTS
const {z} = require('zod');

//SCHEMAS
const R_serviceSchema = z.object({
    service: z.string({required_error:"es requerido este campo name"}).nonempty({message: 'Campo service Esta Vacio'}),
    description:z.string({required_error: "Es requerido el campo descripcion"}).nonempty({message:'Campo description Esta Vacio'}),
    price: z.string({required_error:"Es requerido el campo precio"}).nonempty({message: 'Campo price Esta Vacio'})
    
});

const U_serviceSchema = z.object({
    service: z.string().nonempty({message: 'Campo service Esta Vacio'}).optional(),
    description:z.string().nonempty({message:'Campo description Esta Vacio'}).optional(),
    price: z.string().nonempty({message: 'Campo price Esta Vacio'}).optional()
    
});

module.exports = {
    R_serviceSchema,
    U_serviceSchema
}