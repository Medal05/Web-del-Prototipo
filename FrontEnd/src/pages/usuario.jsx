import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SidePage from "./sidebar";
import { useAuth } from "../context/Auth.context";
import Swal from 'sweetalert2';
import { deleteUserRequest } from "../api/auth";

function UsuariosPage() {
    const { getUser, user } = useAuth();
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            const usersData = await getUser();
            setUsers(usersData.filter(user => user.rol !== true && user.estatus !== false));
        };
        fetchUsers();
    }, []);

    const handleDelete = async () => {
        if (selectedUsers.length === 0) {
            Swal.fire({
                title: 'Atención',
                text: 'Debes seleccionar al menos un usuario para eliminar.',
                icon: 'warning',
                confirmButtonText: 'OK'
            });
            return;
        }
        
        Swal.fire({
            title: '¿Estás seguro?',
            text: "Se eliminarán los usuarios seleccionados",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await Promise.all(selectedUsers.map(async (iduser) => {
                        await deleteUserRequest(iduser);
                    }));
                    const updatedUsers = users.filter(user => !selectedUsers.includes(user._id));
                    setUsers(updatedUsers);
                    setSelectedUsers([]);
                    Swal.fire(
                        'Eliminados!',
                        'Los usuarios seleccionados han sido eliminados.',
                        'success'
                    );
                } catch (error) {
                    console.error("Error al eliminar usuarios:", error);
                    Swal.fire(
                        'Error!',
                        'Ocurrió un error al intentar eliminar los usuarios seleccionados.',
                        'error'
                    );
                }
            }
        });
    };

    const handleCheckboxChange = (iduser) => {
        setSelectedUsers(prevSelected => {
            if (prevSelected.includes(iduser)) {
                return prevSelected.filter(id => id !== iduser);
            } else {
                return [...prevSelected, iduser];
            }
        });
    };

    const filteredUsers = users.filter((user) =>
        user.nombres.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.apellidos.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.correo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.telefono.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        if (user.rol !== true) {
            Swal.fire({
                title: 'Error',
                text: 'No tiene permiso para acceder a esta página',
                icon: 'error',
                confirmButtonText: 'OK'
            }).then(() => {
                window.location.href = '/inicio';
            });
        }
    }, [users]);

    return (
        <div className="m-0">
            <div className="flex justify-between items-center mb-4">
                <h1 className="ml-96 text-4xl text-black">Usuarios</h1>
                <div className="flex items-center">
                    
                    <input
                        type="text"
                        placeholder="Buscar..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className=" border-l-transparent border-blue-500 border-r-transparent border-t-transparent border-b-2 border-solid mt-3 mr-2"
                        style={{ width: '400px'}}
                    />

                    <button onClick={handleDelete} className="bi bi-trash flex items-center bg-red-500 text-white h-10 mt-3 py-2 px-4 rounded-full hover:bg-red-600 mr-2"></button>
                    <Link to="/agregar" className="bi bi-person-add items-center bg-blue-500 text-white mt-3 mr-2 py-2 px-4 rounded-full hover:bg-blue-600"></Link>
                    <a className="bi bi-person-dash items-center bg-green-500 text-white mt-3 py-2 px-4 rounded-full hover:bg-green-600 mr-4" href="/basurero"></a>
                </div>
            </div>
            <hr className="my-2 text-black" />
            <div>
                <SidePage/>
            </div>
            <div className="grid ml-80 md:grid-cols-2">
                {filteredUsers.length === 0 ? (
                    <div className="text-center text-gray-600 mt-8 mb-4 text-2xl font-bold">No se ha encontrado ningún usuario</div>
                ) : (
                    filteredUsers.map((user) => (
                        <div key={user._id} className="bg-white rounded-lg shadow-md p-4 m-2 flex items-center justify-between">
                            <div>
                                <h1 className="text-xl font-semibold">{user.nombres} {user.apellidos}</h1>
                                <p className="text-gray-600">{user.correo}</p>
                                <p className="text-gray-600">{user.telefono}</p>
                            </div>
                            <div className="flex items-center">
                                <input 
                                    type="checkbox" 
                                    className="rounded-xl mr-2" 
                                    onChange={() => handleCheckboxChange(user._id)}
                                    checked={selectedUsers.includes(user._id)}
                                />
                                <Link to={`/editar/${user._id}`}>
                                    <span className="bi bi-pencil text-blue-500"></span>
                                </Link>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default UsuariosPage;
