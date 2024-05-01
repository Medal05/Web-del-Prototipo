import { GraficaTur } from "../components/graficaturbidez";
import SidePage from "./sidebar";
import { useContext,useState } from "react";
import { SensoresContext } from "../context/sensores.context";
function CalidadPage() {
    // Obtener loos valores del contexto de ultimo dato en la base de datos
    const { nivelTurbidez,historialCalidad } = useContext(SensoresContext);
    const [filtroFecha, setFiltroFecha] = useState('hoy');

    // Función para filtrar los datos según el filtro de fecha seleccionado
    const filtrarDatos = (historial) => {
        switch (filtroFecha) {
            case 'hoy':
                return historial.filter(item => {
                    const fechaItem = new Date(item.fecha);
                    const fechaHoy = new Date();
                    return fechaItem.getDate() === fechaHoy.getDate() && fechaItem.getMonth() === fechaHoy.getMonth() && fechaItem.getFullYear() === fechaHoy.getFullYear();
                });
            case 'ultimos7dias':
                return historial.filter(item => {
                    const fechaItem = new Date(item.fecha);
                    const fechaHoy = new Date();
                    const fechaLimite = new Date(fechaHoy.getTime() - 7 * 24 * 60 * 60 * 1000);
                    return fechaItem >= fechaLimite;
                });
            case 'ultimos30dias':
                return historial.filter(item => {
                    const fechaItem = new Date(item.fecha);
                    const fechaHoy = new Date();
                    const fechaLimite = new Date(fechaHoy.getTime() - 30 * 24 * 60 * 60 * 1000);
                    return fechaItem >= fechaLimite;
                });
            case 'ultimos365dias':
                return historial.filter(item => {
                    const fechaItem = new Date(item.fecha);
                    const fechaHoy = new Date();
                    const fechaLimite = new Date(fechaHoy.getTime() - 365 * 24 * 60 * 60 * 1000);
                    return fechaItem >= fechaLimite;
                });
            default:
                return historial;
        }
    };
    const ultimos10Registros = filtrarDatos(historialCalidad);

    return (
        <div className="m-0 ">
            <h1 className="text-xl flex justify-center mr-96">Registro de calidad del agua</h1>
            <hr className="my-2 text-black" />
            <div>
                <SidePage />
            </div>
            {/*Segunda seccion de turbidez */}
            <h1 className="text-center font-semibold text-3xl ml-60 mt-9">Datos de la Calidad del agua</h1>
            <div className="flex justify-center mt-10">
                <div className="bg-slate-50 w-3/6 h-32 ml-80 mr-10 rounded-xl shadow-md shadow-zinc-400 hover:shadow-customBlue3">
                    <div className="flex justify-between ">
                        <h1 className="font-semibold m-2  text-xl">Calidad actual</h1>
                        <div className=" w-16 h-7 text-center">
                            <i className="bi-tsunami" style={{ fontSize: '1.8rem' }}></i>
                        </div>
                    </div>
                    <hr className="bg-linea" />
                    <div className="ml-8 mt-3 bg-customBlue3 rounded-full border-none text-white w-2/6 h-2/6">
                        <h1 className="text-2xl m-3"> {nivelTurbidez.nivel_turbidez}</h1>
                    </div>
                </div>

                <div className="bg-slate-50 w-3/5 h-32 mr-10 rounded-xl shadow-md shadow-zinc-400 hover:shadow-customBlue3">
                    <div className="flex justify-between ">
                        <h1 className="font-semibold m-2 text-xl">Calidad esta semana</h1>
                        <div className=" w-16 h-7 text-center">
                            <i className="bi-tsunami" style={{ fontSize: '1.8rem' }}></i>
                        </div>
                    </div>
                    <hr className="bg-linea" />
                    <div className="ml-8 mt-3 bg-customBlue3 rounded-full border-none text-white w-3/6 h-2/6">
                        <h1 className="text-2xl m-3"> Buena</h1>
                    </div>
                </div>
            </div>
            {/*Implementacion de la grafica del ph del mes */}
            <div className="flex justify-center mt-10">
                <div className="bg-slate-50 w-4/6 h-1/6 ml-80 mb-8 mr-10 rounded-xl shadow-md shadow-zinc-400 hover:shadow-customBlue3">
                    <h1 className="font-semibold text-2xl text-center">Registro de Calidad este mes</h1>
                    <GraficaTur></GraficaTur>
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
                <h1 className="text-center text-xl mb-3">Historial de la calidad del agua</h1>
                {ultimos10Registros.length === 0 ? (
                    <p className="text-center text-red-500">No se encontraron datos.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse border text-center border-gray-300">
                            <thead>
                                <tr>
                                    <th className="border border-gray-300 px-4 py-2">Fecha y Hora</th>
                                    <th className="border border-gray-300 px-4 py-2">NTU</th>
                                    <th className="border border-gray-300 px-4 py-2">Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ultimos10Registros.map((item, index) => (
                                    <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                                        <td className="border border-gray-300 px-4 py-2">{new Date(item.fecha).toLocaleString()}</td>
                                        <td className="border border-gray-300 px-4 py-2">{item.nivel_turbidez}</td>
                                        <td className="border border-gray-300 px-4 py-2">{item.status ? 'Buena' : 'Mala'}</td>
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

export default CalidadPage;
