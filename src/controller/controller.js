const mongoose = require('mongoose');   
const {User} = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt =require('jsonwebtoken')
const { TOKEN_SECRET} =require("../config")
const { CreateAccessToken } = require("../libs/jwt");
// Registrar un nuevo usuario
exports.registrar = async (req, res) => {
  const { nombres, apellidos, telefono, correo, password, rol } = req.body;
  try {
    // Verifica si el correo ya está en uso
    const userFound = await User.findOne({ correo });
    if (userFound) return res.status(400).json(["La cuenta ya está en uso"]);

    // Hash de la contraseña
    const passwordHash = await bcrypt.hash(password, 10);
    
    // Crea el nuevo usuario
    const newUser = new User({
      nombres,
      apellidos,
      telefono,
      correo,
      password: passwordHash,
      estatus: true,
      rol,
    });
    
    // Guarda el nuevo usuario en la base de datos
    await newUser.save();
    
    // Responde con éxito
    res.status(201).json({ message: "Usuario registrado exitosamente" });
  } catch (error) {
    // Maneja los errores
    console.error(error.message);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

exports.login = async (req, res) => {
  const { correo, password } = req.body;
  try {
    const userFound = await User.findOne({ correo });
    if (!userFound) return res.status(400).json({ message: "Credenciales inválidas" });

    if (userFound.estatus === false || userFound.rol===false) {
      return res.status(400).json({ message: 'El usuario no tiene acceso' });
    }

    const passwordMatch = await bcrypt.compare(password, userFound.password);

    if (!passwordMatch) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    const token = await CreateAccessToken({ id: userFound._id });
    res.cookie('token', token);
    res.json({
      id: userFound._id,
      nombres: userFound.nombres,
      apellidos: userFound.apellidos,
      telefono: userFound.telefono,
      correo: userFound.correo,
      estatus: userFound.estatus,
      rol:userFound.rol,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.logout= async(req,res)=>{
  res.cookie("token", "",{
    expires: new Date(0),
  });
  return res.sendStatus(200);
}


exports.getUsers = async (req, res) => {
  try {
      const { id } = req.params;
      if (!mongoose.isValidObjectId(id)) {
          return res.status(400).json({ message: "ID de usuario no válida" });
      }
      const user = await User.findById(id);
      if (!user) {
          return res.status(404).json({ message: "Usuario no encontrado" });
      }
      console.log(user) 
      return res.json(user);

  } catch (error) {
      console.error("Error al obtener usuario:", error);
      return res.status(500).json({ message: "Error al obtener usuario" });
  }
};

exports.agregarUser = async (req, res) => {
  const { nombres, apellidos, telefono, correo, password, rol } = req.body;

  const passwordHash = await bcrypt.hash(password, 10);

  const newUser = new User({
      nombres,
      apellidos,
      telefono,
      correo,
      password: passwordHash,
      estatus: true,
      rol,
  });

  const savedUser = await newUser.save();
  res.json(savedUser);
};


exports.perfil=async(req,res)=>{
  const userFound = await User.findById(req.user.id)

  if(!userFound) return res.status(400).json({message:"Credenciales invalidas"});

  return res.json({
    id:userFound._id,
    nombres:userFound.nombres,
    apellidos:userFound.apellidos,
    telefono:userFound.telefono,
    correo:userFound.correo,
    rol:userFound.rol,
  })
}
exports.usuario = async (req, res) => {
  try {
    const users = await User.find({ user : req.user.id });
    res.json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No se encontraron usuarios." });
    }

    res.json(users);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ message: "Error al obtener usuarios." });
  }
};

exports.verifyToken=async(req,res)=>{
  const {token} =req.cookies;

  if(!token) return res.send(false)

  jwt.verify(token, TOKEN_SECRET,async(error,user)=>{
    if(error) return res.status(401).json({message:"Sin autorización"})

    const userFound= await User.findById(user.id)
    if(!userFound)return res.status(401).json({message:"Sin autorización"})

    return res.json({
      id:userFound._id,
      nombres:userFound.nombres,
      apellidos:userFound.apellidos,
      telefono:userFound.telefono,
      correo:userFound.correo,
      rol:userFound.rol,
    })
  })
}

exports.bajalogicaUser = async (req, res) => {
  try {
      const { iduser } = req.params;
      const usuario = await User.findByIdAndUpdate(iduser, {
          estatus: false,
          fechaEliminacion: new Date()
      }, { new: true });

      if (!usuario) {
          return res.status(404).json({ message: "Usuario no encontrado" });
      }

      res.status(200).json({ message: "Baja lógica de Usuario", usuario });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al realizar la baja lógica del usuario " });
  }
};

exports.restaurarUser = async (req, res) => {
  try {
      const { id } = req.params;
      const usuario = await User.findByIdAndUpdate(id, {
          estatus: true,
          fechaEliminacion: new Date()
      }, { new: false });

      if (!usuario) {
          return res.status(404).json({ message: "Usuario no encontrado" });
      }

      res.status(200).json({ message: "restauración de Usuario", usuario });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al realizar la restauracion del usuario " });
  }
};

exports.getDeletedUsers = async (req, res) => {
  try {
      const deletedUsers = await User.find({ estatus: false });
      res.status(200).json(deletedUsers);
  } catch (error) {
      console.error("Error al obtener los usuarios eliminados:", error);
      res.status(500).json({ message: "Error al obtener los usuarios eliminados" });
  }
};

exports.deleteUser = async (req,res) =>{
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).json({message: "usuario no encontrado"})
  res.json(user)
}

exports.updateUser = async (req, res) => {
  try {
    const { nombres, apellidos, telefono, correo } = req.body;
    const userUpdated = await User.findOneAndUpdate(
      { _id: req.params.id },
      { nombres, apellidos, telefono, correo },
      { new: true }
    );
    return res.json(userUpdated);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};