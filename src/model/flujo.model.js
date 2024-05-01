const mongoose = require('mongoose');


const FlujoSchema = new mongoose.Schema({
    fecha:{
        type:Date,
    },
    mlSalidos:{
        type:Number,
    },
    estado:{
        type:String,
    },
    ph: {
        type:Number,
    },
    FlujoAcumulado:{
     type:Number,   
    }
});

const Flujo = mongoose.model('Flujo', FlujoSchema);

module.exports = {Flujo};