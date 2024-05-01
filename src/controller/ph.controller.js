const {PH} = require("../model/ph.model")
// Registrar un nuevo usuario
exports.subirPH= async (req,res)=>{
    try {
        const { fecha, nivel_ph,status} = req.body;

        const ph = new PH({
            fecha,
            nivel_ph,
            status
        });
        console.log(ph);
        await ph.save();
        res.status(201).json({ message: 'Ph subido correctamente', ph });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el usuario' });
    }
}


exports.MostrarUltimoPH = async (req, res) => {
    try {
        const ultimoPh = await PH.findOne().sort({ $natural: -1 }).limit(1); // Busca el último documento y selecciona solo el campo 'nivel_ph'
        if (!ultimoPh) {
            return res.status(404).json({ message: "No se encontraron datos de pH" });
        }
        res.json(ultimoPh); // Devuelve solo el valor de 'nivel_ph' del último documento
    } catch (error) {
        console.error("Error al obtener el último valor de pH:", error);
        res.status(500).json({ message: "Error del servidor" });
    }
};

exports.MostrarPh = async (req, res) => {
    try {
       
        const mostrarPh = await PH.find().sort({ $natural: -1 }); // Busca los últimos 10 documentos y selecciona solo los campos 'nivel_ph' y 'fecha'
        if (mostrarPh.length === 0) {
            return res.status(404).json({ message: "No se encontraron datos de pH" });
        }
        res.json(mostrarPh); // Devuelve los últimos 10 registros de pH
    } catch (error) {
        console.error("Error al obtener los últimos valores de pH:", error);
        res.status(500).json({ message: "Error del servidor" });
    }
};
