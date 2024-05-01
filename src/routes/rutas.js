const express = require("express");
const controller = require("../controller/controller.js");
const ph = require("../controller/ph.controller.js");
const turbidez = require("../controller/turbidez.controller.js");
const flujo= require("../controller/flujo.controller.js");
const ventas = require('../controller/controllerVentas.js')
const router =express.Router();
const { authRequired } = require('../middleware/validarToken.js');
const { validarSchema } = require('../middleware/validate.middleware.js');
const { registerSchema } = require('../schemas/auth.schema.js');
const { loginSchema } = require('../schemas/auth.schema.js');
const {verifyToken} =require('../controller/controller.js')

router.post('/registrar',validarSchema(registerSchema),controller.registrar);
router.post('/login',validarSchema(loginSchema),controller.login);
router.post('/logout',controller.logout);
router.post('/ph', authRequired,ph.subirPH);
router.post('/turbidez', authRequired,turbidez.subirTurbidez);

router.get('/verify', verifyToken);
router.get('/usuarios', authRequired, controller.getAllUsers);
router.get('/perfil', authRequired, controller.perfil);
router.get('/usuario', authRequired, controller.usuario);
router.get('/usuario/:id', authRequired, controller.getUsers);
router.delete('/usuario/:id', controller.deleteUser);
router.post("/usuario",validarSchema(registerSchema), authRequired, controller.agregarUser);
// PH
// router.get('/MostrarPh/:filtro',ph.MostrarPh)
router.get('/ph',ph.MostrarUltimoPH);
router.get('/MostrarPh',ph.MostrarPh);

// FLUJO
router.get('/flujo',flujo.MostrarUltimoFlujo);
router.get('/MostrarFlujo',flujo.MostrarFlujo)

// Calidad | Turbidez
router.get('/MostrarCalidad',turbidez.MostrarTurbidez)
router.get('/turbidez',turbidez.MostrarUltimaTurbidez);
router.put("/usuario/:id", controller.updateUser);
router.put('/bajaUsuario/:iduser', controller.bajalogicaUser);
router.put('/restaurarUsuario/:id', controller.restaurarUser);
router.get("/usuarios/eliminados", controller.getDeletedUsers);


// Ventas y Aguas
router.post('/agregarVenta',ventas.agregarVenta);
router.get('/UltimaVenta',ventas.MostrarUltimaVenta);
router.get('/Ventas',ventas.MostrarVentas);
router.get('/TotalVentas',ventas.SumarTotalVentas)
router.get('/TotalSemanaVentas',ventas.SumarVentasSemana)
router.get('/TotalMesVentas',ventas.SumarVentasMes)

module.exports = router;