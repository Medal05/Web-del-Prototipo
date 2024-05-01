// Requerir librerio mongoose
const mongoose = require("mongoose");
// requerir dotenv donde se guardo clave para conexion a atlas
require("dotenv").config();

// conectarse base de datos
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
    });
    console.log("Conectado a la base de datos de Atlas");
  } catch (error) {
    console.error(error);
  }
};

// exportar modulo
module.exports = connectDB;
