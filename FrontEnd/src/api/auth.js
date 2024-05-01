import axios from './axios';

export const RegistrarUsuario = (user) => axios.post(`/registrar`, user);
export const login = (user) => axios.post(`/login`, user);
export const verifyTokenRequest = () => axios.get(`/verify`);

export const getUserRequest = () => axios.get(`/usuarios`);
export const getUsersRequest = (id) => axios.get(`/usuario/${id}`);

export const createUserRequest = (user) => axios.post(`/usuario`, user)
export const searchUserRequest = (id) => axios.get(`/users/${id}`);
export const updateUserRequest = (id, user) => axios.put(`/usuario/${id}`, user);
export const deleteUserRequest = async (iduser) => {
    try {
        await axios.put(`/bajaUsuario/${iduser}`);
    } catch (error) {
        console.error("Error al eliminar usuario:", error);
        throw new Error("Error al eliminar usuario");
    }
};
export const restoreUserRequest = async (id) => {
    try {
        await axios.put(`/restaurarUsuario/${id}`);
    } catch (error) {
        console.error("Error al restaurar usuario:", error);
        throw new Error("Error al restaurar usuario");
    }
};
export const getDeletedUsersRequest = () => axios.get("/usuarios/eliminados");
export const deleteUsersRequest = (id)=>axios.delete(`/usuario/${id}`);