const { Aguas } = require('../model/Agua')

exports.agregarAgua = async (req, res) => {
    try {
        const { nombre, galon,ph, precioG, precioMG, precioP } = req.body;
        if (!nombre || !galon || !precioG  || !precioMG || !precioP) {
            return res.status(400).json({ message: 'Faltan parámetros en la solicitud' });
        }
        const agua = new Aguas({
            nombre,
            galon, 
            ph,
            precioG, 
            precioMG, 
            precioP
        });

        await agua.save();
        res.status(201).json({ message: 'agua guardada correctamente', venta });
    } catch (error) {
        console.error('Error al guardar los datos del agua:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};