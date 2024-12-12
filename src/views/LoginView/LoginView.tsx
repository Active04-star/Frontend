"use client";

import { swalNotifySuccess } from "@/helpers/swal/swal-notify-success";
import { IErrorsProps, IloginProps } from "@/interfaces/interfaces.types";
import React, { useState } from "react";

const LoginView: React.FC = () => {
  
  const initalState = {
    email: "",
    password: "",
  };

  const [userData, setUserData] = useState<IloginProps>(initialState);
  const [errors, setErrors] = useState<IErrorsProps>(initialState);

  const [isSubmitting, setIsSubmitting] = useState(false); // Estado para el mensaje de "Logueándose..."

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const response = await login(userData);
      const { token, user } = response;

      localStorage.setItem("userSession", JSON.stringify({ token, user }));
      swalNotifySuccess("¡Bienvenido de nuevo!", "");

      setUserData(initialState);

      if (user.role === UserRole.MANAGER) {
        const id = await fetchManagerData();
        setRestId(id);
      }

      window.location.href = "/pageUser";
    } catch (error) {
      console.log(error);
      if (
        error instanceof ErrorHelper &&
        error.message === HttpMessagesEnum.USER_DELETED
      ) {
        swalNotifyCustomError(
          HttpMessagesEnum.USER_DELETED,
          "No se pudo logear"
        );
      } else {
        AuthErrorHelper(error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className=" bg-custom-dark min-h-screen flex flex-col items-center justify-center  text-center">
      <h1 className="text-5xl font-bold text-gray-900 mb-8 font-serif text-white">
        Active
      </h1>
      <form className="w-full max-w-sm">
        <div className="mb-6">
          <label
            className="block text-white mb-2 text-center font-medium text-lg"
            htmlFor="username"
          >
            Usuario
          </label>
          <input
            type="text"
            id="username"
            name="email"
            placeholder="Rest012"
            className="w-full px-4 py-2 border-gray-300 rounded-lg bg-gray-200 focus:outline-none text-black font-sans"
          />
        </div>
        <div className="mb-6 relative">
          <label
            className="block text-white text-lg mb-2 text-center font-medium"
            htmlFor="password"
          >
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="******"
            className="w-full px-4 py-2 border-gray-300 rounded-lg bg-gray-200 focus:outline-none text-black font-sans"
          />
        </div>
        <button
          type="submit"
          className=" mt-5 bg-primary text-dark px-4 py-2 rounded hover:bg-yellow-700 bg-yellow-600"
        >
          Ingresar
        </button>
      </form>
    </div>
  );
};

export default LoginView;
//
