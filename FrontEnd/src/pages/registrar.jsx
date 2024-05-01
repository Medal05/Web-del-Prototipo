import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/Auth.context";
import { useNavigate } from "react-router-dom";
import 'tailwindcss/tailwind.css';
import Swal from 'sweetalert2';

import logo from "../assets/images/logo_copy.png"

function Register() {
  const { signup, errors: registerErrors, isAuth} = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [formCompleted, setFormCompleted] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) navigate('/login');
  }, [isAuth]);

  const onSubmit = handleSubmit(async (values) => {
    if (values.password === values.password_confirm) {
      try {
        await signup(values);
        console.log(values);
        // Mostrar alerta de registro exitoso
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
          text: 'Tu cuenta ha sido creada correctamente',
        });
      } catch (error) {
        console.error('Error al registrar:', error);
        // Manejar error al registrar
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ha ocurrido un error al registrar tu cuenta. Por favor, inténtalo de nuevo más tarde.',
        });
      }
    } else {
      setPasswordMatch(false);
    }
  });

  const checkFormCompletion = () => {
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellidos").value;
    const telefono = document.getElementById("telefono").value;
    const correo = document.getElementById("correo").value;
    const password = document.getElementById("password").value;
    const password_confirm = document.getElementById("password_confirm").value;
    setFormCompleted(password_confirm !== "" && telefono !== "" && apellido !== "" && nombre !== "" && correo !== "" && password !== "");
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="flex">
        <div className="border-4 border-cyan-600 w-96 h-1/3 rounded-3xl justify-items-center ml-64 mt-4">
          {registerErrors.map((error, i) => (
            <div className="bg-red-500 p-2 text-white text-center m-2" key={i}>
              {error}
            </div>
          ))}
          <form onSubmit={onSubmit} onChange={checkFormCompletion} className="p-8 flex flex-col">
            <h1 className="text-2xl text-black-900 mb-4">Registrar</h1>
            <div className="flex mb-4">
              <div className="flex-1 mr-2">
                <p>Nombre(s)</p>
                <input className={`border-l-transparent border-r-transparent border-t-transparent border-b-2 border-solid ${errors.nombres ? 'border-red-500' : 'border-cyan-600'} w-full`} autoFocus id="nombre" type="text" placeholder="Nombre(s)" {...register('nombres', { required: true })} />
                {errors.nombres && <p className="text-red-500">nombre es requerido</p>}
              </div>
              <div className="flex-1 ml-2">
                <p>Apellido(s)</p>
                <input className={`border-l-transparent border-r-transparent border-t-transparent border-b-2 border-solid ${errors.apellidos ? 'border-red-500' : 'border-cyan-600'} w-full`} id="apellidos" type="text" placeholder="Apellido(s)" {...register('apellidos', { required: true })} />
                {errors.apellidos && <p className="text-red-500">Los apellidos son requeridos</p>}
              </div>
            </div>
            <div className="flex mb-4">
              <div className="flex-1 mr-2">
                <p>Correo electrónico</p>
                <input className={`border-l-transparent border-r-transparent border-t-transparent border-b-2 border-solid ${errors.correo ? 'border-red-500' : 'border-cyan-600'} w-full`} id="correo" type="text" placeholder="Correo electrónico" {...register('correo', { required: true })} />
                {errors.correo && <p className="text-red-500">Correo es requerido</p>}
              </div>
              <div className="flex-1 ml-2">
                <p>No. Teléfono</p>
                <input maxLength={10} className={`border-l-transparent border-r-transparent border-t-transparent border-b-2 border-solid ${errors.telefono ? 'border-red-500' : 'border-cyan-600'} w-full`} id="telefono" type="number" placeholder="No. Teléfono" {...register('telefono', { required: true })} onInput={(e) => {e.target.value = Math.max(0, parseInt(e.target.value.toString().slice(0, 10)));}}/>
                {errors.telefono && <p className="text-red-500">Teléfono es requerido</p>}
              </div>
            </div>
            <div className="flex mb-4">
              <div className="flex-1 mr-2">
                <p>Contraseña</p>
                <input className={`border-l-transparent border-r-transparent border-t-transparent border-b-2 border-solid ${errors.password ? 'border-red-500' : 'border-cyan-600'} w-full`} id="password" type="password" placeholder="Contraseña" {...register('password', { required: true })} />
                {errors.password && <p className="text-red-500">Contraseña es requerido</p>}
              </div>
              <div className="flex-1 ml-2">
                <p>Confirmar Contraseña</p>
                <input className={`border-l-transparent border-r-transparent border-t-transparent border-b-2 border-solid ${errors.password_confirm || !passwordMatch ? 'border-red-500' : 'border-cyan-600'} w-full`} id="password_confirm" type="password" placeholder="Confirmar Contraseña" {...register('password_confirm', { required: true })} />
                {errors.password_confirm && <p className="text-red-500">Contraseña es requerido</p>}
                {!passwordMatch && <p className="text-red-500">Las contraseñas no coinciden</p>}
              </div>
            </div>
            <button
              type="submit"
              disabled={!formCompleted}
              id="botonIngresar"
              className={`rounded-full self-center text-white p-2 w-36 ${
                formCompleted
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "disabled-button"
              }`}
            >
              Entrar
            </button>

          </form>
        </div>

      </div>
    </div>
  );
}

export default Register;

