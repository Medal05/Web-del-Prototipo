const mongoose = require('mongoose');

const AguasSchema = new mongoose.Schema({
    nombre:{
        type:String,
    },
    galon:{
        type:String,
    },
    ph:{
        type:Number
    },
    // Precio del garrafon Grande
    precioG:{
        type:Number
    },     
    // Precio del medio Garrafon
    precioMG:{
        type:Number
    },
    // Precio del Garrafon Pequeño
    precioP:{
        type:Number
    }

})

const Aguas = mongoose.model('Aguas',AguasSchema);

module.exports= {Aguas};