//IMPORTS
const {z} = require('zod');

//EMPLOYEEE ESCHEMA VALIDATION
const registerPetSchema = z.object({
    name: z.string({required_error:"es requerido este campo name"}).nonempty({message:'campo nombre es necesario'}),
    breed: z.string({required_error:"campo breed es requerido"}).nonempty({message: "no se encontraron datos del campo breed"}),
    birthDate: z.string({required_error: "campo fecha de nacimiento esta vacio"}).nonempty({message:'Campo birthDate Esta Vacio'}),
    gender: z.string({required_error: 'campo sexo esta vacio'}).nonempty({message:'Campo gender Esta Vacio'}),
    weight: z.string({required_error: 'campo peso esta vacio'}).nonempty({message:'Campo weigth Esta Vacio'}),
    ownerId: z.string({required_error: 'el campo dueño esta vacio'}).nonempty({message:'Campo ownerId Esta Vacio'}),
    specie: z.string({required_error: 'campo especue esta vacio'}).nonempty({message:'Campo speciesId Esta Vacio'})
    
});
const updatePetSchema = z.object({
    name: z.string({required_error:"es requerido este campo name"}).nonempty({message:'campo nombre es necesario'}).optional(),
    breed: z.string({required_error:"campo breed es requerido"}).nonempty({message: "no se encontraron datos del campo breed"}).optional(),
    birthDate: z.string({required_error: "campo fecha de nacimiento esta vacio"}).nonempty({message:'Campo birthDate Esta Vacio'}).optional(),
    gender: z.string({required_error: 'campo sexo esta vacio'}).nonempty({message:'Campo gender Esta Vacio'}).optional(),
    weight: z.string({required_error: 'campo peso esta vacio'}).nonempty({message:'Campo weigth Esta Vacio'}).optional(),
    ownerId: z.string({required_error: 'el campo dueño esta vacio'}).nonempty({message:'Campo ownerId Esta Vacio'}).optional(),
    specie: z.string({required_error: 'campo especue esta vacio'}).nonempty({message:'Campo speciesId Esta Vacio'}).optional()
    
});
module.exports = {
    registerPetSchema,
    updatePetSchema
}