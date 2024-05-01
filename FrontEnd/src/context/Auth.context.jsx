import { createContext, useState, useContext, useEffect } from "react";
import { RegistrarUsuario, login, verifyTokenRequest, getUserRequest, getUsersRequest, updateUserRequest, deleteUsersRequest, createUserRequest, restoreUserRequest } from "../api/auth";

import PropTypes from 'prop-types';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth deberia estar dentro del provider");
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState([]);
    const [isAuth, setIsAuth] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);

    //Toma solo un usuario
    const getUsers = async (id) => {
        try {
          const res = await getUsersRequest(id);
          return res.data;
        } catch (error) {
          console.error(error);
        }
      };

    //Toma todos los usuarios
    const getUser = async () => {
        try {
            const res = await getUserRequest();
            return res.data; 
        } catch (error) {
            console.error(error);
            return []; 
        }
    };

    //Agrega Usuarios
    const agregarUsers = async (user) =>{
        try {
            const res = await createUserRequest(user)
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

    //Hace el registro
    const signup = async (user) => {
        try {
          const response = await RegistrarUsuario(user);
          
          if (response.status === 201) {
            setUser(response.data);
            setIsAuth(true);
          } else {
            console.error(response.data.message);
            setErrors([response.data.message]);
          }
        } catch (error) {
          console.error(error.message);
          setErrors(["Error al intentar registrar el usuario"]);
        }
      };
      

    //Hace el login
    const signin = async (user) => {
        try {
            const res = await login(user);
            setUser(res.data);
            setIsAuth(true);
        } catch (error) {
            if (Array.isArray(error.response.data)) {
                setErrors(error.response.data);
            } else {
                setErrors([error.response.data.message]);
            }
        }
    };

    //Hace el logout
    const logout = () => {
        Cookies.remove("token");
        setIsAuth(false);
        setUser(null);
    };

    //actualiza los datos
    const updateUser = async (id, user) =>{
        try {
            await updateUserRequest(id, user); // Pasamos user como argumento
        } catch (error) {
            console.error(error);
        }
    };

    //baja definitiva de usuarios
    const deleteUser = async (id) =>{
        try {
            const res = await deleteUsersRequest(id)
            console.log(res.data)
        } catch (error) {
            console.log(error)

        }
    }
    const restoreUser = async (id) =>{
        try {
            const res = await restoreUserRequest(id)
            console.log(res.data)
        } catch (error) {
            console.log(error)

        }
    }
    
    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [errors]);

    useEffect(() => {
        async function checkLogin() {
            const cookies = Cookies.get();
            if (!cookies.token) {
                setIsAuth(false);
                setLoading(false);
                return setUser(null);
            }
            try {
                const res = await verifyTokenRequest(cookies.token);
                if (!res.data) {
                    setIsAuth(false);
                    setLoading(false);
                    return;
                }

                setIsAuth(true);
                setUser(res.data);
                setLoading(false);
            } catch (error) {
                setIsAuth(false);
                setUser(null);
                setLoading(false);
            }
        }
        checkLogin();
    }, []);


    return (
        <AuthContext.Provider value={{
            signup,
            signin,
            logout,
            getUser,
            getUsers,
            updateUser,
            deleteUser,
            restoreUser,
            agregarUsers,
            user,
            isAuth,
            loading,
            errors,
           
        }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
