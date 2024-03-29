//IMPORTS
const {z} = require('zod');
//EMPLOYEEE ESCHEMA VALIDATION
const loginSchema = z.object({
    email: z.string().email({ message: "Email inválido" }),
    password: z.string().min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
});

module.exports = {
    loginSchema
}
