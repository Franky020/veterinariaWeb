//IMPORTS
const {z} = require('zod');

const updateEmployeeSchema = z.object({
    name: z.string({required_error: 'campo nombre vacio'}).nonempty({message:'Campo Nombre Esta Vaciophone'}).optional(),
    lastName: z.string({required_error:'campo apellidos vacio'}).optional(),
    phone: z.string({required_error:'campo telefono vacio'}).max(10, { message: "El número de teléfono no debe tener más de 10 caracteres" }).nonempty({message:'Campo phone Esta Vacio'}).optional(),
    type: z.string({required_error:'campo tipo vacio'}).nonempty({message:'Campo type Esta Vacio'}).optional(),
    image: z.string().optional()
});


module.exports ={
    updateEmployeeSchema
}