import Sidepage from "./sidebar";
import { useAuth } from "../context/Auth.context";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import hasbu from "../assets/images/hasbu.jpeg";

function PerfilPage() {
    const { getUser, user } = useAuth();
    const [users, setUsers] = useState([]);

    console.log(user.id)

    // Obtener el primer carácter del nombre del usuario
    const firstLetter = user.nombres.charAt(0).toUpperCase();

    return (
        <div className="m-0">
            <h1 className="mr-96 flex justify-center text-4xl text-black text-">Perfil</h1>
            <hr className="my-2 text-black" />
            <div>
                <Sidepage />
            </div>
            <div className="mt-1 flex justify-center">
                {/* Reemplaza la imagen por un div circular con el primer carácter del nombre */}
                <div className="ml-80 mt-2 bg-customBlue3 h-36 w-5/12 m-6 rounded-full flex items-center justify-center shadow">
                    <div className="w-28 h-28 mt-28 text-center rounded-full" style={{ backgroundColor: "#549CE4", fontSize: "70px", color: "#FFF" }}>
                        {firstLetter}
                    </div>
                </div>
            </div>

            <div className="flex justify-center mb-10">
                <form className="bg-slate-50 mt-16 w-5/12 ml-80 border rounded py-10 px-10 text-gray-700 shadow-xl shadow-zinc-400 hover:shadow-customBlue3 relative">
                    <div className="absolute top-0 right-0">
                        <Link to={`/editar/${user.id}`} className="flex items-center justify-center rounded-full bg-customBlue3 text-white w-12 h-12 mr-10 mt-2">
                            <span className="bi bi-pencil"></span>
                        </Link>
                    </div>
                    <div className="mb-4">
                        <label className=" text-customBlue2 font-semibold border-dashed text-base mb-1 ml-2" htmlFor="nombre"> Nombre(s): </label>
                        <label className="shadow border rounded w-full py-2 px-3 text-black leading-tight border-blue">{user.nombres}</label>

                        <label className=" text-customBlue2 font-semibold border-dashed text-base mb-1 ml-2 mt-2" htmlFor="apellido"> Apellidos: </label>
                        <label className="shadow border rounded w-full py-2 px-3 text-black leading-tight border-blue">{user.apellidos}</label>

                        <label className=" text-customBlue2 font-semibold border-dashed text-base mb-1 ml-2 mt-2" htmlFor="email"> Correo Electronico: </label>
                        <label className="shadow border rounded w-full py-2 px-3 text-black leading-tight border-blue">{user.correo}</label>

                        <label className=" text-customBlue2 font-semibold border-dashed text-base mb-1 ml-2 mt-2" htmlFor="telefono"> No. Telefono: </label>
                        <label className="shadow border rounded w-full py-2 px-3 text-black leading-tight border-blue">{user.telefono}</label>
                    </div>
                </form>
            </div>

        </div>

    );
}

export default PerfilPage;
