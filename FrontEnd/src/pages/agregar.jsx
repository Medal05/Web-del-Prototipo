import React, { useState, useEffect } from "react";
import SidePage from "./sidebar";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/Auth.context";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "tailwindcss/tailwind.css";

function AgregarPage() {
  const { users, agregarUsers, signup, errors: registerErrors } = useAuth();
  const [validacion, setValidacion] = useState([]);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [rolValue, setRolValue] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [formCompleted, setFormCompleted] = useState(false);
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (values) => {
    if (registerErrors.length > 0) {
      Swal.fire({
        title: "Error",
        text: "Por favor, corrige los errores en el formulario.",
        icon: "error",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Aceptar",
      });
      return;
    }

    if (
      validacion.includes(values.correo) ||
      validacion.includes(values.telefono)
    ) {
      Swal.fire({
        title: "Error",
        text: "Estos datos ya existen",
        icon: "error",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Aceptar",
      });
      return;
    }

    if (values.password === values.password_confirm) {
      Swal.fire({
        title: "¿Estás seguro?",
        text: "Una vez agregado, no podrás deshacer esta acción",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, agregarlo!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          values.rol = rolValue;
          await agregarUsers(values);
          reset();
          Swal.fire({
            title: "Usuario agregado",
            text: "El usuario se ha agregado exitosamente",
            icon: "success",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Aceptar",
          });
          navigate("/agregar");
        }
      });
      return;
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
    setFormCompleted(
      password_confirm !== "" &&
        telefono !== "" &&
        apellido !== "" &&
        nombre !== "" &&
        correo !== "" &&
        password !== ""
    );
  };

  return (
    <div className="flex">
      <SidePage />
      <div className="flex flex-col justify-center items-center w-full">
        <div className="flex justify-between items-center mb-4">
          <h1 className="ml-96 text-4xl text-black mr-96">Agregar Usuario</h1>
          <Link
            to="/user"
            className=" arrow-left items-center bg-blue-500 text-white mt-3 mr-2 py-2 px-4 rounded-full hover:bg-blue-600"
          >
            Regresar
          </Link>
        </div>
        <div className="flex justify-center mb-10">
          <form
            onSubmit={onSubmit}
            onChange={checkFormCompletion}
            className="bg-slate-50 mt-4 w-5/12 ml-80 border rounded py-10 px-10 text-gray-700 shadow-xl shadow-zinc-400 hover:shadow-customBlue3"
          >
            <div className="mb-4">
              {registerErrors.length > 0 && (
                <div className="bg-red-500 p-2 text-white text-center m-2">
                  {registerErrors.map((error, i) => (
                    <p key={i}>{error}</p>
                  ))}
                </div>
              )}

              <label
                className="text-customBlue2 font-semibold border-dashed text-base mb-1 ml-2"
                htmlFor="nombre"
              >
                {" "}
                Nombre(s):{" "}
              </label>
              <input
                className={`${
                  errors.nombres ? "border-red-500" : "border-cyan-600"
                } shadow border rounded w-full py-2 px-3 text-black leading-tight border-blue`}
                {...register("nombres", { required: true })}
                autoFocus
                id="nombre"
                type="text"
              />
              {errors.nombres && (
                <p className="text-red-500">Nombre es requerido</p>
              )}

              <label
                className="text-customBlue2 font-semibold border-dashed text-base mb-1 ml-2 mt-2"
                htmlFor="apellido"
              >
                {" "}
                Apellidos:{" "}
              </label>
              <input
                className={`${
                  errors.apellidos ? "border-red-500" : "border-cyan-600"
                } shadow border rounded w-full py-2 px-3 text-black leading-tight border-blue`}
                {...register("apellidos", { required: true })}
                id="apellidos"
                type="text"
              />
              {errors.apellidos && (
                <p className="text-red-500">Apellidos es requerido</p>
              )}

              <label
                className="text-customBlue2 font-semibold border-dashed text-base mb-1 ml-2 mt-2"
                htmlFor="email"
              >
                {" "}
                Correo Electrónico:{" "}
              </label>
              <input
                className={`${
                  errors.correo ? "border-red-500" : "border-cyan-600"
                } shadow border rounded w-full py-2 px-3 text-black leading-tight border-blue`}
                {...register("correo", { required: true })}
                id="correo"
                type="email"
              />
              {errors.correo && (
                <p className="text-red-500">Correo es requerido</p>
              )}

              <label
                className="text-customBlue2 font-semibold border-dashed text-base mb-1 ml-2 mt-2"
                htmlFor="telefono"
              >
                {" "}
                No. Teléfono:{" "}
              </label>
              <input
                maxLength={10}
                className={`${
                  errors.telefono ? "border-red-500" : "border-cyan-600"
                } shadow border rounded w-full py-2 px-3 text-black leading-tight border-blue`}
                {...register("telefono", { required: true })}
                id="telefono"
                type="tel"
              />
              {errors.telefono && (
                <p className="text-red-500">Telefono es requerido</p>
              )}

              <label
                className="text-customBlue2 font-semibold border-dashed text-base mb-1 ml-2 mt-2"
                htmlFor="password"
              >
                {" "}
                Contraseña:{" "}
              </label>
              <input
                className={`${
                  errors.password ? "border-red-500" : "border-cyan-600"
                } shadow border rounded w-full py-2 px-3 text-black leading-tight border-blue`}
                {...register("password", { required: true })}
                id="password"
                type="password"
              />
              {errors.password && (
                <p className="text-red-500">Contraseña es requerido</p>
              )}

              <label
                className="text-customBlue2 font-semibold border-dashed text-base mb-1 ml-2 mt-2"
                htmlFor="password"
              >
                {" "}
                Confirmar Contraseña:{" "}
              </label>
              <input
                className={`${
                  errors.password_confirm || !passwordMatch
                    ? "border-red-500"
                    : "border-cyan-600"
                } shadow border rounded w-full py-2 px-3 text-black leading-tight border-blue`}
                id="password_confirm"
                type="password"
                {...register("password_confirm", { required: true })}
              />
              {errors.password_confirm && (
                <p className="text-red-500">Contraseña es requerido</p>
              )}
              {!passwordMatch && (
                <p className="text-red-500">Las contraseñas no coinciden</p>
              )}

              <label
                className="text-customBlue2 font-semibold border-dashed text-base mb-1 ml-2 mt-2"
                htmlFor="rol"
              >
                {" "}
                Rol:{" "}
              </label>
              <select
                className="shadow border rounded w-full py-2 px-3 text-black leading-tight border-blue"
                value={rolValue ? "administrador" : "empleado"}
                onChange={(e) =>
                  setRolValue(e.target.value === "administrador")
                }
                id="rol"
              >
                <option value="administrador">Administrador</option>
                <option value="empleado">Empleado</option>
              </select>
              {errors.rol && <p className="text-red-500">Rol es requerido</p>}
            </div>
            <button
              type="submit"
              disabled={!formCompleted}
              id="botonAgregar"
              className={`mt-4 rounded-full self-center text-white p-2 w-36 ${
                formCompleted
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "disabled-button"
              }`}
            >
              Agregar
            </button>
            <button
              className=" bg-red-500 text-white ml-4 py-1 px-2 p-2 w-36 h-10 hover:bg-red-600 items-center rounded-full"
              onClick={() => navigate("/user")}
            >
              Cancelar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AgregarPage;
