import SidePage from "./sidebar";
import { GraficaVentas } from "../components/graficaventas";
import { SensoresContext } from "../context/sensores.context";
import { useContext, useState } from "react";


function VentasPage() {
    const { ultimaVenta, historialVentas,totalSemanaVentas,totalMesVentas } = useContext(SensoresContext);
    const [filtroFecha, setFiltroFecha] = useState('hoy');

    // Función para filtrar los datos según el filtro de fecha seleccionado
    const filtrarDatos = (historial) => {
        switch (filtroFecha) {
            case 'hoy':
                return historial.filter(item => {
                    const fechaItem = new Date(item.fechaCerrar);
                    const fechaHoy = new Date();
                    return fechaItem.getDate() === fechaHoy.getDate() && fechaItem.getMonth() === fechaHoy.getMonth() && fechaItem.getFullYear() === fechaHoy.getFullYear();
                });
            case 'ultimos7dias':
                return historial.filter(item => {
                    const fechaItem = new Date(item.fechaCerrar);
                    const fechaHoy = new Date();
                    const fechaLimite = new Date(fechaHoy.getTime() - 7 * 24 * 60 * 60 * 1000);
                    return fechaItem >= fechaLimite;
                });
            case 'ultimos30dias':
                return historial.filter(item => {
                    const fechaItem = new Date(item.fechaCerrar);
                    const fechaHoy = new Date();
                    const fechaLimite = new Date(fechaHoy.getTime() - 30 * 24 * 60 * 60 * 1000);
                    return fechaItem >= fechaLimite;
                });
            case 'ultimos365dias':
                return historial.filter(item => {
                    const fechaItem = new Date(item.fechaCerrar);
                    const fechaHoy = new Date();
                    const fechaLimite = new Date(fechaHoy.getTime() - 365 * 24 * 60 * 60 * 1000);
                    return fechaItem >= fechaLimite;
                });
            default:
                return historial;
        }
    };
    const ultimos10Registros = filtrarDatos(historialVentas);
    return (
        <div className="m-0 ">
            <h1 className="text-xl flex justify-center">Ventas del dia</h1>
            <hr className="my-2 text-black" />
            <div>
                <SidePage />
            </div>
            {/*Primera seccion de ventas */}
            <div className="flex justify-center mt-10">
                <div className="bg-slate-50 w-full h-32 ml-80 mr-10 rounded-xl shadow-md shadow-zinc-400 hover:shadow-customBlue3">
                    <div className="flex justify-between ">
                        <h1 className="font-semibold m-2 text-xl">Total de Ultima Venta</h1>
                        <div className="bg-customBlue3 w-24 h-7 m-2 text-center font-semibold text-white rounded-xl ">
                            <h2 className="text-center p-1">{new Date(ultimaVenta.fechaCerrar).toLocaleDateString()}</h2>
                        </div>
                    </div>
                    <hr className="bg-linea" />
                    <h1 className="text-3xl m-3">${ultimaVenta.total}</h1>
                </div>
                {/* Periodo */}
                {/* <div className="bg-slate-50 w-3/5 h-32 mr-10 rounded-xl shadow-md shadow-zinc-400 hover:shadow-customBlue3">
                    <div className="flex justify-between ">
                        <h1 className="font-semibold m-2 text-xl">Periodo:</h1>
                    </div>
                    <hr className="bg-linea" />

                    <input type="date" name="" id="" className="ml-8 mt-3 bg-customBlue3 rounded-xl border-none text-white w-5/6 " />
                </div> */}
            </div>
            {/*Implementacion de la grafica de ventas del mes */}
            <div className="flex justify-center mt-10">
                <div className="bg-slate-50 w-full h-1/6 ml-80 mr-10 rounded-xl shadow-md shadow-zinc-400 hover:shadow-customBlue3">
                    <h1 className="font-semibold text-2xl text-center">Ventas</h1>
                    <GraficaVentas></GraficaVentas>
                </div>
            </div>
            {/*Ultima seccion de ventas */}
            <div className="flex justify-center mt-10 mb-10">
                <div className="bg-slate-50 w-full h-32 ml-80 mr-10 rounded-xl shadow-md shadow-zinc-400 hover:shadow-customBlue3">
                    <div className="flex justify-between ">
                        <h1 className="font-semibold m-2 text-xl">Ventas esta semana</h1>
                        <div className="bg-customBlue3 w-28 h-7 m-2 text-center font-semibold text-white rounded-xl ">
                            <h2>Semanal</h2>
                        </div>
                    </div>
                    <hr className="bg-linea" />
                    <h1 className="text-3xl m-3">$ {totalSemanaVentas}</h1>
                </div>

                <div className="bg-slate-50 w-full h-32 mr-10 rounded-xl shadow-md shadow-zinc-400 hover:shadow-customBlue3">
                    <div className="flex justify-between ">
                        <h1 className="font-semibold m-2 text-xl">Ventas este mes</h1>
                        <div className="bg-customBlue3 w-28 h-7 m-2 text-center font-semibold text-white rounded-xl ">
                            <h2>Mensual</h2>
                        </div>
                    </div>
                    <hr className="bg-linea" />
                    <h1 className="text-3xl m-3">$ {totalMesVentas}</h1>
                </div>

            </div>

            {/* Controles de filtrado */}
            <div className="mt-10 justify-center">

                <div className="flex justify-center mb-4">
                    <button onClick={() => setFiltroFecha('hoy')} className={`mr-2 ${filtroFecha === 'hoy' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'} px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600`}>Hoy</button>
                    <button onClick={() => setFiltroFecha('ultimos7dias')} className={`mr-2 ${filtroFecha === 'ultimos7dias' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'} px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600`}>Últimos 7 días</button>
                    <button onClick={() => setFiltroFecha('ultimos30dias')} className={`mr-2 ${filtroFecha === 'ultimos30dias' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'} px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600`}>Últimos 30 días</button>
                    <button onClick={() => setFiltroFecha('ultimos365dias')} className={`mr-2 ${filtroFecha === 'ultimos365dias' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'} px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600`}>Últimos 365 días</button>
                </div>
            </div>
            <div className="flex justify-center ml-80 mt-12">
                <div className="w-8/12 mb-10">
                    <h1 className="text-center text-xl mb-3">Historial de Ventas</h1>
                    {ultimos10Registros.length === 0 ? (
                    <p className="text-center text-red-500">No se encontraron datos.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse border text-center border-gray-300">
                            <thead>
                                <tr>
                                    {/* <th className="border border-gray-300 px-4 py-2">Fecha Apertura</th> */}
                                    <th className="border border-gray-300 px-4 py-2">Fecha Terminada</th>
                                    <th className="border border-gray-300 px-4 py-2">Garrafones Vendidos</th>
                                    <th className="border border-gray-300 px-4 py-2">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ultimos10Registros.map((item, index) => (
                                    <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                                        {/* <td className="border border-gray-300 px-4 py-2">{new Date(item.fechaApertura).toLocaleString()}</td> */}
                                        <td className="border border-gray-300 px-4 py-2">{new Date(item.fechaCerrar).toLocaleString()}</td>
                                        <td className="border border-gray-300 px-4 py-2">{item.totalGalones}</td>
                                        <td className="border border-gray-300 px-4 py-2">${item.total}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                </div>
            </div>


        </div>

    );
}

export default VentasPage;
