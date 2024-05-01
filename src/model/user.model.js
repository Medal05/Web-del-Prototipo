const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema= new mongoose.Schema({
    nombres:{
        type:String,
    },
    apellidos:{
        type:String,
    },
    telefono:{
        type:String,
        unique:true
    },
    correo:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    estatus:{
        type:Boolean,
        required:true
    },
    rol:{
        type:Boolean,
        required:true
    },
    fechaEliminacion:{
        type:Date,
        default:null
    }
},
     

);

const User = mongoose.model('User',userSchema);


module.exports={User};

