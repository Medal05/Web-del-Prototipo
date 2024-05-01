const mongoose = require("mongoose");


const turbidez= new mongoose.Schema({
    fecha:{
        type:String,
    },
    nivel_turbidez:{
        type:String,
        require:true,
    },
    status:{
        type:Boolean,
    }
},
);

const Turbidez = mongoose.model('Turbidez',turbidez);


module.exports={Turbidez};

