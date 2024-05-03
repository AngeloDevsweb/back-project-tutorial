import z from 'zod'

export const registerSchema = z.object({
    username: z.string({
        required_error:'el nombre de usuario es requerido'
    }),
    email: z.string ({
        required_error: 'el email es requerido'
    }).email({
        message: 'email invalido'
    }),
    password: z.string({
        required_error: 'la password es requerida'
    }).min(7,{
        message:'la contraseña debe tener como minimo 7 caracteres'
    })
})

export const loginSchema = z.object({
    email: z.string({
        required_error: 'Email is required'
    }).email({
        message:'Invalid email'
    }),
    password: z.string({
        required_error:'password is required',
    }).min(7,{
        message:'la contraseña debe tener como minimo 7 caracteres'
    })
})