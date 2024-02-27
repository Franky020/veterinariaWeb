const {z} = require('zod');

//SCHEMAS
const R_medicationSchema = z.object({
    medication: z.string({required_error:"Campo medication es requerido"}).nonempty({message:'Campo medication Esta Vacio'}),
    description:z.string({required_error: "Es requerido el campo descripcion"}).nonempty({message:'Campo description Esta Vacio'}),
    price: z.string({required_error:"Es requerido el campo precio"}).nonempty({message:'Campo price Esta Vacio'}),
    quantity: z.string({required_error:'campo cantidad esta vacio'}).nonempty({message:'Campo quantity Esta vacio'}),
    image: z.string({required_error:'Imagen esta vacio'}).optional(),
    category:z.string({required_error:'Campo categoria esta vacio'}).nonempty({message: 'Campo category Esta Vacio'}),
    species: z.array(z.string()).nonempty({ message: 'Campo especie está vacío' }),
    dosageForm: z.string({required_error:'Campo dosageForm es requerido'}).nonempty({message:'Campo dosageForm esta Vacio'}),
    dosage: z.string({required_error:'Campo dosage es Requerido'}).nonempty({message:'Campo dosage Esta Vacio'}),
    administrationRoute: z.string({required_error:'Campo administrationRoute es Requerido'}).nonempty({message:'Campo administrationRoute Esta Vacio'}),
    precautions: z.string({required_error:'Campo precautions es Requerido'}).nonempty({message:'Campo precautions Esta Vacio'}),
    dateExpiry:z.string({required_error:'Campo dateExpiry es Requerido'}).nonempty({message:'Campo dateExpiry Esta Vacio'})

});

const U_medicationSchema = z.object({
    medication: z.string({ required_error: "Campo medication es requerido" }).nonempty({ message: 'Campo medication Esta Vacio' }).optional(),
    description: z.string({ required_error: "Es requerido el campo descripcion" }).nonempty({ message: 'Campo description Esta Vacio' }).optional(),
    price: z.string({ required_error: "Es requerido el campo precio" }).nonempty({ message: 'Campo price Esta Vacio' }).optional(),
    quantity: z.string({ required_error: 'campo cantidad esta vacio' }).nonempty({ message: 'Campo quantity Esta vacio' }).optional(),
    image: z.string({ required_error: 'Imagen esta vacio' }).optional(),
    category: z.string({ required_error: 'Campo categoria esta vacio' }).nonempty({ message: 'Campo category Esta Vacio' }).optional(),
    species: z.array(z.string()).nonempty({ message: 'Campo especie está vacío' }).optional(),
    dosageForm: z.string({ required_error: 'Campo dosageForm es requerido' }).nonempty({ message: 'Campo dosageForm esta Vacio' }).optional(),
    dosage: z.string({ required_error: 'Campo dosage es Requerido' }).nonempty({ message: 'Campo dosage Esta Vacio' }).optional(),
    administrationRoute: z.string({ required_error: 'Campo administrationRoute es Requerido' }).nonempty({ message: 'Campo administrationRoute Esta Vacio' }).optional(),
    precautions: z.string({ required_error: 'Campo precautions es Requerido' }).nonempty({ message: 'Campo precautions Esta Vacio' }).optional(),
    dateExpiry: z.string({ required_error: 'Campo dateExpiry es Requerido' }).nonempty({ message: 'Campo dateExpiry Esta Vacio' }).optional()
});

module.exports = {
    R_medicationSchema,
    U_medicationSchema
}