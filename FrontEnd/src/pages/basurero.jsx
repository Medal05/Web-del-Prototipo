import React, { useState, useEffect, } from "react";
import SidePage from "./sidebar";
import { Link } from "react-router-dom";
import { getDeletedUsersRequest, restoreUserRequest } from "../api/auth";
import Swal from 'sweetalert2';
import { useAuth } from "../context/Auth.context";

function UsuariosEliminadosPage() {
    const [deletedUsers, setDeletedUsers] = useState([]);
    const { deleteUser } = useAuth();

    useEffect(() => {
        const fetchDeletedUsers = async () => {
            try {
                const res = await getDeletedUsersRequest();
                setDeletedUsers(res.data);
            } catch (error) {
                console.error("Error al obtener los usuarios eliminados:", error);
            }
        };
        fetchDeletedUsers();
    }, []);

    const handleDeleteUser = async (id) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "Se eliminará permanentemente este usuario",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteUser(id);
                    const updatedUsers = deletedUsers.filter(user => user._id !== id);
                    setDeletedUsers(updatedUsers);
                    Swal.fire(
                        'Eliminado!',
                        'El usuario ha sido eliminado permanentemente.',
                        'success'
                    );
                } catch (error) {
                    console.error("Error al eliminar el usuario:", error);
                    Swal.fire(
                        'Error!',
                        'Ocurrió un error al intentar eliminar el usuario.',
                        'error'
                    );
                }
            }
        });
    };

    const handleRestoreUser = async (id) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "Se restaurará este usuario",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, restaurar',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await restoreUserRequest(id); // Aquí se corrige la llamada a la función de restaurar usuario
                    const updatedUsers = deletedUsers.filter(user => user._id !== id);
                    setDeletedUsers(updatedUsers);
                    Swal.fire(
                        'Restaurado!',
                        'El usuario ha sido restaurado exitosamente.',
                        'success'
                    );
                } catch (error) {
                    console.error("Error al restaurar el usuario:", error);
                    Swal.fire(
                        'Error!',
                        'Ocurrió un error al intentar restaurar el usuario.',
                        'error'
                    );
                }
            }
        });
    };

    return (
        <div className="m-0">
            <div className="flex justify-between items-center mb-4">
                <h1 className="ml-96 text-4xl text-black">Papelera</h1>
                <Link to="/user" className=" arrow-left items-center bg-blue-500 text-white mt-3 mr-2 py-2 px-4 rounded-full hover:bg-blue-600">Regresar</Link>
            </div>
            
            <hr className="my-2 text-black" />
            <div>
                <SidePage/>
            </div>
            <div className="ml-80">
                <table className="table-fixed border-collapse border border-gray-400">
                    <thead>
                        <tr>
                            <th className="w-1/5 border border-gray-400 px-4 py-2">Nombre</th>
                            <th className="w-1/5 border border-gray-400 px-4 py-2">Apellido</th>
                            <th className="w-1/5 border border-gray-400 px-4 py-2">Correo</th>
                            <th className="w-1/5 border border-gray-400 px-4 py-2">Teléfono</th>
                            <th className="w-1/5 border border-gray-400 px-4 py-2">Fecha de Eliminación</th>
                            <th className="w-1/5 border border-gray-400 px-4 py-2">Borrar</th>
                            <th className="w-1/5 border border-gray-400 px-4 py-2">Restaurar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deletedUsers && deletedUsers.map((user) => (
                            <tr key={user._id}>
                                <td className="border border-gray-400 px-4 py-2">{user.nombres}</td>
                                <td className="border border-gray-400 px-4 py-2">{user.apellidos}</td>
                                <td className="border border-gray-400 px-4 py-2">{user.correo}</td>
                                <td className="border border-gray-400 px-4 py-2">{user.telefono}</td>
                                <td className="border border-gray-400 px-4 py-2">{new Date(user.fechaEliminacion).toLocaleDateString()}</td>
                                <td className="border border-gray-400 px-4 py-2">
                                    <button 
                                        onClick={() => handleDeleteUser(user._id)}
                                        className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                                    >
                                        Eliminar
                                    </button>
                                </td>
                                <td className="border border-gray-400 px-4 py-2">
                                    <button 
                                        onClick={() => handleRestoreUser(user._id)}
                                        className="bg-green-500 text-white py-1 px-2 rounded hover:bg-green-600"
                                    >
                                        Restaurar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UsuariosEliminadosPage;
