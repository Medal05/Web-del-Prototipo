const mongoose = require("mongoose");


const phSchema= new mongoose.Schema({
    fecha:{
        type:String,
    },
    nivel_ph:{
        type:Number,
        require:true,
    },
    status:{
        type:Boolean,
    }
},
);

const PH = mongoose.model('PH',phSchema);


module.exports={PH};

