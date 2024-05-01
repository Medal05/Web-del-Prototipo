const mongoose = require('mongoose');


const VentasSchema = new mongoose.Schema({
    nombre:{
        type:String,
    },
    totalGalones:{
        type:Number
    },
    total:{
        type:Number
    },
    fechaCerrar:{
        type:Date,
    },
    fechaApertura:{
        type:Date,
    }
})

const Ventas = mongoose.model('Ventas',VentasSchema);

module.exports= {Ventas};