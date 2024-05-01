import { SensoresContext } from "../context/sensores.context";
import SidePage from "./sidebar";
import { useContext } from "react";
import { Link } from 'react-router-dom';



// import { verPh } from "../api/sensors.js";

function InicioPage() {
    // Obtener loos valores del contexto de ultimo dato en la base de datos
    const { nivelPh, nivelFlujo, nivelTurbidez } = useContext(SensoresContext);


    return (
        <div className="m-0">
            <div>
                <SidePage />
            </div>

            <div className="flex justify-center 2xl:ml-72 xl:ml-72 lg:ml-72 md:ml-72">
                {/* Seccion del ph */
                    <div className="bg-[url('src/assets/images/inicio_img1.png')] w-[300px] h-screen justify-center flex flex-col items-center">
                        <h1 className="text-3xl font-semibold text-center mb-3">Nivel del agua</h1>
                        <div className="bg-white shadow-xl shadow-customBlue3 hover:shadow-white h-40 w-6/12 m-6 rounded-[50px] content-center flex flex-col items-center">
                        <Link to="/Ph">
                            <i className="bi-droplet-half" style={{ fontSize: '3.2rem' }}></i>
                            </Link>
                            <div className="bg-customBlue3 h-1/4 w-4/6 rounded-full mt-2 text-center text-xl">{nivelPh.nivel_ph}</div>
                        </div>
                    </div>}
                {/* Seccion de la turbidez */
                    <div className="bg-[url('src/assets/images/inicio_img2.png')] w-[300px] h-screen justify-center flex flex-col items-center">
                        <h1 className="text-3xl font-semibold text-center mb-3">Turbidez del agua</h1>
                        <div className="bg-white shadow-xl shadow-customBlue3 hover:shadow-white h-40 w-6/12 m-6 rounded-[50px] content-center flex flex-col items-center">
                        <Link to="/Calidad">
                            <i className="bi-tsunami" style={{ fontSize: '3.2rem' }}></i>
                            </Link>
                            <div className="bg-customBlue3 h-1/4 w-4/6 rounded-full mt-2 text-center text-xl">{nivelTurbidez.nivel_turbidez}</div>
                        </div>
                    </div>}
                {/* Seccion del flujo del agua */
                    <div className="bg-[url('src/assets/images/inicio_img3.png')] w-[300px] h-screen justify-center flex flex-col items-center">
                        <h1 className="text-3xl font-semibold text-center mb-3">Flujo del agua</h1>
                        <div className="bg-white shadow-xl shadow-customBlue3 hover:shadow-white h-40 w-6/12 m-6 rounded-[50px] content-center flex flex-col items-center">
                        <Link to="/Flujo">
                            <i className="bi-water" style={{ fontSize: '3.2rem' }}></i>
                            </Link>
                            <div className="bg-customBlue3 h-1/4 w-4/6 rounded-full mt-2 text-center text-xl">{nivelFlujo.mlSalidos}</div>
                        </div>
                    </div>}
                {/* Seccion de las ventas */
                    <div className="bg-[url('src/assets/images/inicio_img4.png')] w-[300px] h-screen justify-center flex flex-col items-center">
                        <h1 className="text-3xl font-semibold text-center mb-3">Total de ventas</h1>
                        
                        <div className="bg-white shadow-xl shadow-customBlue3 hover:shadow-white h-40 w-6/12 m-6 rounded-[50px] content-center flex flex-col items-center">
                        <Link to="/Ventas">
                            <i className="bi-cash-coin" style={{ fontSize: '3.2rem' }}></i>
                            </Link>
                            <div className="bg-customBlue3 h-1/4 w-4/6 rounded-full mt-2 text-center text-xl">$1,202</div>
                        </div>
                       
                    </div>}

            </div>

        </div>

    );
}

export default InicioPage;
