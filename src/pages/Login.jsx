import React, { createRef, useEffect, useState } from "react";
import clienteAxios from "../config/axios";
import Alerta from "../components/Alerta";
export default function Login() {
  const emailRef = createRef();
  const passwordRef = createRef();

  const [errors, setErrors] = useState({});
  const handleSubmit = async (e) => {
    e.preventDefault();
    const datos = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    try {
      const {data} = await clienteAxios.post("/api/login", datos);
      console.log("Respuesta: ",data);
      localStorage.setItem('AUTH_TOKEN',data.token)
      setErrors([]);
    } catch (error) {
      setErrors(error.response.data.errors);
    }
  };

  return (
    <>
      <div className="h-screen flex">
        <div className="flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 justify-around items-center">
          <div>
            <h1 className="text-white font-bold text-4xl font-sans">
              Chimpokomon Admin
            </h1>
            <p className="text-white mt-1">
              El sistema de administración para administrar el Blog.
            </p>
            <button
              type="submit"
              className="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2"
            >
              Leer Más
            </button>
          </div>
        </div>
        <div className="flex w-1/2 justify-center items-center bg-white">
          <form className="bg-white" onSubmit={handleSubmit}>
            <h1 className="text-gray-800 font-bold text-2xl mb-1">
              ¡Hola de Nuevo!
            </h1>
            <p className="text-sm font-normal text-gray-600 mb-7">
              Bienvenido de nuevo
            </p>
            {errors.invalid && <Alerta>{errors.invalid}</Alerta>}
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
              <input
                className="pl-2 outline-none border-none"
                type="text"
                name="email"
                id="email"
                placeholder="Correo Electrónico"
                ref={emailRef}
              />
            </div>
            {errors.email &&
            errors.email.map((error, index) => (
              <Alerta key={index}>{error}</Alerta>
            ))}
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                className="pl-2 outline-none border-none"
                type="password"
                name="password"
                id="password"
                placeholder="Contraseña"
                ref={passwordRef}
              />
            </div>
            {errors.password &&
            errors.password.map((error, index) => (
              <Alerta key={index}>{error}</Alerta>
            ))}
            <button
              type="submit"
              className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
            >
              Iniciar Sesión
            </button>
            <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer">
              ¿Olvidaste tu contraseña?
            </span>
          </form>
        </div>
      </div>
    </>
  );
}
