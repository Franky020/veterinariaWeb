//IMPORTS
const {z} = require('zod');

//EMPLOYEEE ESCHEMA VALIDATION
const registerEmployeeSchema = z.object({
    email: z.string().email({ message: "Email inválido" }).nonempty("Email es requerido"),
    password: z.string().min(8, { message: "La contraseña debe tener al menos 8 caracteres" }).nonempty("Contraseña es requerida"),
    name: z.string().nonempty("Nombre es requerido"),
    lastName: z.string().nonempty("Apellidos son requeridos"),
    phone: z.string().max(10, { message: "El número de teléfono no debe tener más de 10 caracteres" }).nonempty("Teléfono es requerido"),
    type: z.string().nonempty("El tipo de puesto es requerido"),
    image: z.string().optional()
});


// OWNER SCHEMA VALIDATION
const registerOwnerSchema = z.object({
    email: z.string().email({ message: "Email inválido" }).nonempty("Email es requerido"),
    name: z.string().nonempty("Nombre es requerido"),
    lastName: z.string().nonempty("Apellidos son requeridos"),
    phone: z.string().max(10, { message: "El número de teléfono no debe tener más de 10 caracteres" }).nonempty("Teléfono es requerido"),
    image: z.string().optional()
});

module.exports = {
    registerEmployeeSchema,
    registerOwnerSchema
}