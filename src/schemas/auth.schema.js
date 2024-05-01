const z = require('zod');

exports.registerSchema= z.object({
    nombres:z.string({
        required_error:'EL nombre de usuario es requerido'
    }),
    apellidos:z.string({
        required_error:'Los apellidos son requeridos'
    }),
    telefono:z.string({
        required_error:'EL telefono es requerido'
    }),
    correo:z.string({
        required_error:'EL correo es requerido'
    }).email({
        message:'Correo invalido'
    }),
    password:z.string({
        required_error:'la contraseña es requerida'
    }).min(6,{
        message:'la contraseña debe de contener al menos 6 caracteres'
    })
});

exports.loginSchema= z.object({
    correo:z.string({
        required_error:'EL correo es requerido'
    }).email({
        message:'Correo invalido'
    }),
    password:z.string({
        required_error:'la contraseña es requerida'
    }).min(6,{
        message:'la contraseña debe de contener al menos 6 caracteres'
    })
})