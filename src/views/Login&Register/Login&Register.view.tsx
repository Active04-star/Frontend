"use client";
import React, { useState, useEffect } from "react";
import styles from "./LoginandRegister.module.css";
import Google from "@/components/icons/Google.icon";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useLoginFunctions } from "../LoginView/LoginView";
import Register from '@/components/Register/Register.component'
export const LoginandRegister = () => {
  const [isActive, setIsActive] = useState(false);
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Obtener funciones de login del hook
  const {
    userData,
    errors,
    handleChange,
    handleSubmit,
    checkUrlParams,
    initialState,
  } = useLoginFunctions();

  useEffect(() => {
    // Verificar parámetros de URL para mensajes
    checkUrlParams();
  }, []);

  // Manejador para cambiar a vista de registro
  const handleRegisterClick = () => {
    setIsActive(true);
  };

  // Manejador para cambiar a vista de login
  const handleLoginClick = () => {
    setIsActive(false);
  };

  // Función personalizada para manejar el envío del formulario de login
  const handleLoginFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoadingLogin(true);
    handleSubmit(e).finally(() => {
      setIsLoadingLogin(false);
    });
  };

  return (
    <div id={styles.loginandregister}>
      <div
        className={`${styles.container} ${isActive ? styles.active : ""}`}
        id="container"
      >
        {/* Formulario de Registro */}
        <div className={`${styles.formContainer} ${styles.signUp}`}>
          <Register handleLoginClick={handleLoginClick} />
        </div>

        {/* Formulario de Login */}
        <div className={`${styles.formContainer} ${styles.signIn}`}>
          <form onSubmit={handleLoginFormSubmit}>
            <h1>Iniciar Sesión</h1>
            <hr className="w-full border-t-2 border-yellow-600" />
            <nav className="flex flex-wrap gap-4 my-3 ">
              <Link
                href="api/auth/login/"
                target="_blank"
                rel="noopener noreferrer"
                role="link"
                className="inline-flex items-center justify-center gap-2 px-4 py-1 text-gray-800 transition bg-gray-100 border border-gray-300 rounded-full dark:bg-gray-800 dark:border-gray-600 dark:text-white focus-visible:ring-yellow-500/80 text-md hover:bg-gray-900 hover:border-gray-700 hover:text-white dark:hover:bg-gray-100 dark:hover:border-gray-300 dark:hover:text-black group max-w-fit focus:outline-none focus-visible:outline-none focus-visible:ring focus-visible:ring-white focus-visible:ring-offset-2 active:bg-black text-sm"
              >
                <Google /> Inicia Sesión con Google
              </Link>
            </nav>
            <div className="flex items-center w-[100%]">
              <div className="flex-grow border-t-2 border-yellow-600"></div>
              <span className="mx-4 text-sm text-gray-500">
                o usa tu email y contraseña
              </span>
              <div className="flex-grow border-t-2 border-yellow-600"></div>
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={userData.email}
              onChange={handleChange}
            />
            {userData.email && errors?.email?._errors ? (
              <span className="text-sm text-red-600 self-start">
                {errors.email._errors}
              </span>
            ) : null}
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Contraseña"
                value={userData.password}
                onChange={handleChange}
                className="w-full"
              />
              <div
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            {userData.password && errors?.password?._errors ? (
              <span className="text-sm text-red-600 self-start">
                {errors.password._errors[0]}
              </span>
            ) : null}
            <button type="submit" disabled={isLoadingLogin}>
              {isLoadingLogin ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Cargando...
                </span>
              ) : (
                "Ingresar"
              )}
            </button>{" "}
          </form>
        </div>

        {/* Panel de cambio entre login y registro */}
        <div className={styles.toggleContainer}>
          <div className={styles.toggle}>
            <div className={`${styles.togglePanel} ${styles.toggleLeft}`}>
              <h1>Bienvenido!</h1>
              <p>¿Ya tienes una cuenta?</p>
              <button
                className={styles.hidden}
                id="login"
                type="button"
                onClick={handleLoginClick}
              >
                Iniciar sesión
              </button>
            </div>
            <div className={`${styles.togglePanel} ${styles.toggleRight}`}>
              <h1>Bienvenido de vuelta!</h1>
              <p>¿No tienes cuenta?</p>
              <button
                className={styles.hidden}
                id="register"
                type="button"
                onClick={handleRegisterClick}
              >
                Registrarse
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
