import { useContext, useState } from "react";
import SidePage from "./sidebar";
import { SensoresContext } from "../context/sensores.context";
import Paginacion from "../components/Paginacion"

function FlujoPage() {
    const { historialFlujo, nivelFlujo } = useContext(SensoresContext);
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
    const ultimos10Registros = filtrarDatos(historialFlujo);

    return (
        <div className="m-0 ">
            <h1 className="mr-64 text-xl flex justify-center">Flujo del Agua</h1>
            <hr className="my-2 text-black" />
            <div>
                <SidePage />
            </div>

            <div className="mt-1 flex justify-center">
                <div className="mt-24 ml-60 h-56 w-2/6 bg-gray-400 rounded-xl">
                    <h1 className="m-auto font-medium text-2xl text-white p-1">Ultima Revision:</h1>
                    <div className="mt-10 mx-auto my-auto bg-stone-950 h-32 w-80 rounded-xl">

                        <h1 className="font-semibold text-5xl mt-4 m-auto text-center text-red-600 mb-3">
                            {nivelFlujo.mlSalidos} L
                        </h1>
                        <h1 className="text-center text-white ">
                            {nivelFlujo.fecha}
                        </h1>
                        <h1 className=" font-medium text-center text-lime-500 mb-2 text-xl">
                            Flujo Acumulado: {nivelFlujo.FlujoAcumulado}
                        </h1>

                    </div>
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
                                        <td className="border border-gray-300 px-4 py-2">{item.mlSalidos}</td>
                                        <td className="border border-gray-300 px-4 py-2">{item.estado}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
            <div className="flex justify-center 2xl:ml-72 xl:ml-72 lg:ml-72 md:ml-72 mb-10">
                <Paginacion />
            </div>

        </div>
    );
}

export default FlujoPage;
