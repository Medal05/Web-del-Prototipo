const { Ventas } = require('../model/ventas');

exports.agregarVenta = async (req, res) => {
    try {
        const { nombre, totalGalones, total } = req.body;
        if (!nombre || !totalGalones || !total) {
            return res.status(400).json({ message: 'Faltan parámetros en la solicitud' });
        }

        const venta = new Ventas({
            nombre,
            totalGalones,
            total,
            fechaCerrar: new Date(),
            fechaApertura: new Date(),
        });

        await venta.save();
        res.status(201).json({ message: 'Venta guardada correctamente', venta });
    } catch (error) {
        console.error('Error al guardar los datos de la venta:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

exports.MostrarUltimaVenta = async (req, res) => {
    try {
        const ultimaVenta = await Ventas.findOne().sort({ $natural: -1 }).limit(1); // Busca el último documento y selecciona solo el campo 'nivel_ph'
        if (!ultimaVenta) {
            return res.status(404).json({ message: "No se encontraron datos de la Ultima Venta" });
        }
        res.json(ultimaVenta);
    } catch (error) {
        console.error("Error al obtener la ultima Venta:", error);
        res.status(500).json({ message: "Error del servidor" });
    }
};

exports.MostrarVentas = async (req, res) => {
    try {
        const ventas = await Ventas.find().sort({ $natural: -1 });
        if (!ventas) {
            return res.status(404).json({ message: "No se encontraron datos de las Ventas" });
        }
        res.json(ventas);
    } catch (error) {
        console.error("Error al obtener las Ventas:", error);
        res.status(500).json({ message: "Error del servidor" });
    }
};

exports.SumarTotalVentas = async (req, res) => {
    try {
        const resultado = await Ventas.aggregate([
            {
                $group: {
                    _id: null,
                    total_ventas: { $sum: "$total" }
                }
            }
        ]);
        if (resultado.length === 0) {
            return res.status(404).json({ message: "No se encontraron ventas" });
        }
        res.json({ total_ventas: resultado[0].total_ventas });
    } catch (error) {
        console.error("Error al sumar el total de las ventas:", error);
        res.status(500).json({ message: "Error del servidor" });
    }
};

exports.SumarVentasSemana = async (req, res) => {
    try {
        const fechaActual = new Date();

        const primerDiaSemana = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), fechaActual.getDate() - fechaActual.getDay() + 1);

        const resultadoSemana = await Ventas.aggregate([
            {
                $match: {
                    fechaCerrar: { $gte: primerDiaSemana }
                }
            },
            {
                $group: {
                    _id: null,
                    total_ventas_semana: { $sum: "$total" }
                }
            }
        ]);

        const totalVentasSemana = resultadoSemana.length > 0 ? resultadoSemana[0].total_ventas_semana : 0;

        res.json({ total_ventas_semana: totalVentasSemana });
    } catch (error) {
        console.error("Error al sumar las ventas de la semana:", error);
        res.status(500).json({ message: "Error del servidor" });
    }
};

exports.SumarVentasMes = async (req, res) => {
    try {
        const fechaActual = new Date();
        const primerDiaMes = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 1);
        const resultadoMes = await Ventas.aggregate([
            {
                $match: {
                    fechaCerrar: { $gte: primerDiaMes } 
                }
            },
            {
                $group: {
                    _id: null,
                    total_ventas_mes: { $sum: "$total" }
                }
            }
        ]);

        const totalVentasMes = resultadoMes.length > 0 ? resultadoMes[0].total_ventas_mes : 0;

        res.json({ total_ventas_mes: totalVentasMes });
    } catch (error) {
        console.error("Error al sumar las ventas del mes:", error);
        res.status(500).json({ message: "Error del servidor" });
    }
};


exports.TotalVentasPorFecha = async (req, res) => {
    try {
        const { año, mes, dia } = req.params; // Obtenemos el año, mes y día de los parámetros de la solicitud

        const inicioDia = new Date(año, mes - 1, dia);
        const finDia = new Date(año, mes - 1, dia, 23, 59, 59);

        // Buscamos las ventas que ocurrieron en el día específico
        const ventasPorDia = await Ventas.find({
            fechaCerrar: { $gte: inicioDia, $lte: finDia } // Filtramos por las ventas del día específico
        });

        // Calculamos el total de las ventas del día
        const totalVentasPorDia = ventasPorDia.reduce((total, venta) => total + venta.total, 0);

        res.json({
            ventas: ventasPorDia,
            total_ventas: totalVentasPorDia
        });
    } catch (error) {
        console.error("Error al obtener las ventas por fecha:", error);
        res.status(500).json({ message: "Error del servidor" });
    }
};
