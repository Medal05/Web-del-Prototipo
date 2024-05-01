import { useState, useEffect } from "react"; 
import { useForm } from "react-hook-form";
import { useAuth } from "../context/Auth.context";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import logo from "../assets/images/logo_copy.png";

function Login() {
  const { signin, errors: loginErrors, user } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [formCompleted, setFormCompleted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loginErrors.length > 0) {
      Swal.fire({
        icon: 'error',
        title: 'Hay un error, intenta de nuevo',
        text: loginErrors.join(', '),
      });
      setLoading(false);
    }
  }, [loginErrors]);

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    await signin(data);
    setLoading(false);

    if (signin()) {
      navigate("/Inicio");
      Swal.fire({
        icon: 'success',
        title: '¡Inicio de sesión exitoso!',
        text: 'Bienvenido de vuelta',
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Acceso denegado',
        text: 'No tienes permiso para acceder.',
      });
    }
  });

  const checkFormCompletion = () => {
    const correo = document.getElementById("correo").value;
    const password = document.getElementById("password").value;
    setFormCompleted(correo !== "" && password !== "");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-blue-200 p-8 hover:shadow-xl hover:shadow-blue-400 transition duration-300 ease-in-out">
          <div className="flex justify-center">
            <img className="w-24" src={logo} alt="logo" />
          </div>
          <h1 className="text-2xl text-center text-gray-800 font-semibold mt-4">Iniciar sesión</h1>
          <form onSubmit={onSubmit} onChange={checkFormCompletion} className="mt-4">
            {loginErrors.map((error, i) => (
              <div className="bg-red-500 p-2 text-white text-center m-2" key={i}>
                {error}
              </div>
            ))}
            <div className="mb-4">
              <input className="border-b-2 border-t-0 border-l-0 border-r-0 border-solid border-blue-500 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" id="correo" type="email" placeholder="Correo electrónico" {...register('correo', { required: true })} />
              {errors.correo && <p className="text-red-500">Correo es requerido</p>}
            </div>
            <div className="mb-4">
              <input className="border-b-2 border-t-0 border-l-0 border-r-0 border-solid border-blue-500 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" id="password" type="password" placeholder="Contraseña" {...register('password', { required: true })} />
              {errors.password && <p className="text-red-500">Contraseña es requerida</p>}
              </div>
            <button
              type="submit"
              disabled={!formCompleted || loading}
              id="botonIngresar"
              className={`rounded-full self-center text-white p-2 w-full mt-4 ${
                formCompleted
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 ml-40" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zM20 12c0-3.042-1.135-5.824-3-7.938l-3 2.647A7.962 7.962 0 0120 12h4zm-7 7.938A7.962 7.962 0 0112 20v4c3.042 0 5.824-1.135 7.938-3l-2.647-3zM7.938 4A7.962 7.962 0 0112 4V0c-3.042 0-5.824 1.135-7.938 3l2.647 3z"></path>
                </svg>
              ) : (
                'Entrar'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
