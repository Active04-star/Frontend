"use client";
import { StatusEnum } from "@/enum/HttpStatus.enum";
import { UserRole } from "@/enum/userRole";
import { zodValidate } from "@/helpers/validate-zod";
import { AuthErrorHelper } from "@/scripts/errors/auth-error-helper";
import { ErrorHelper } from "@/scripts/errors/error-helper";
import { login } from "@/scripts/login";
import { swalCustomError } from "@/scripts/swal/swal-custom-error";
import { swalNotifySuccess } from "@/scripts/swal/swal-notify-success";
import { LoginErrors } from "@/types/Errortypes";
import { UserLoginSchema } from "@/types/userLogin-schema";
import { User, UserLogin } from "@/types/zTypes";
import React, { useEffect, useState } from "react";

const LoginView: React.FC = () => {

  const initialState = {
    email: "",
    password: "",
  };

  const [userData, setUserData] = useState<UserLogin>(initialState);
  const [errors, setErrors] = useState<LoginErrors | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };


  useEffect(() => {

    const data = zodValidate(userData, UserLoginSchema);

    if (!data.success) {
      setErrors(data.errors);
    } else {
      setErrors(null);
    }

  }, [userData])


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);

    if (Object.values(userData).find((data) => data === "") === "") {
      swalCustomError("Error en Logueo", "Los campos están vacios.");

      setIsSubmitting(false);
      return;
    }

    const data = zodValidate(userData, UserLoginSchema);

    if (!data.success) {
      swalCustomError("Error en Logueo", "Por favor corrige los errores antes de continuar.");

      setIsSubmitting(false);
      return;
    }

    try {
      const response = await login(userData);
      const { token, user  } = response;

      localStorage.setItem("userSession", JSON.stringify({ token, user }));
      swalNotifySuccess("¡Bienvenido de nuevo!", "");

      setUserData(initialState);

      if ((user as User).role === UserRole.MANAGER) {
        //SET ID DE CENTRO DEPORTIVO
      }

      window.location.href = "/";
    } catch (error) {

      if (error instanceof ErrorHelper && error.message === StatusEnum.USER_DELETED) {
        swalCustomError(StatusEnum.USER_DELETED, "No se pudo logear");

      } else {
        AuthErrorHelper(error);

      }
    } finally {
      setIsSubmitting(false);

    }
  };


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center">
      <h1 className="text-5xl font-bold text-gray-900 mb-8 font-serif ">
        Active
      </h1>
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className="mb-6">
          <label
            className="block text-gray-500 mb-2 text-center font-medium text-lg"
            htmlFor="username"
          >
            Usuario
          </label>
          <input
            type="text"
            id="username"
            name="email"
            value={userData.email}
            onChange={handleChange}
            placeholder="Active123@mail.com"
            className="w-full px-4 py-2 border-gray-300 rounded-lg bg-gray-200 focus:outline-none text-black font-sans"
          />
          {
            userData.email && errors !== null && errors.email !== undefined && errors?.email._errors !== undefined
              ?
              (
                <span
                  className="text-sm text-red-600"
                  style={{ fontSize: "12px" }}
                >
                  {errors.email._errors}
                </span>
              )
              :
              null
          }
        </div>
        <div className="mb-6 relative">
          <label
            className="block text-gray-500 text-lg mb-2 text-center font-medium"
            htmlFor="password"
          >
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            placeholder="******"
            className="w-full px-4 py-2 border-gray-300 rounded-lg bg-gray-200 focus:outline-none text-black font-sans"
          />
          {
            userData.password && errors !== null && errors.password !== undefined && errors?.password._errors !== undefined
              ?
              (
                <>
                  <span
                    className="text-sm text-red-600"
                    style={{ fontSize: "12px" }}
                  >
                    {errors.password._errors[0]}
                  </span>

                  <div>
                    <span
                      className="text-sm text-red-600"
                      style={{ fontSize: "12px" }}
                    >
                      {errors.password._errors[1] !== undefined && errors.password._errors[1].length > 0 ? errors.password._errors[1] : null}
                    </span>
                  </div>
                </>

              )
              :
              null
          }
        </div>
        <button
          type="submit"
          className=" mt-5 bg-primary text-dark px-4 py-2 rounded hover:bg-yellow-600 bg-yellow-400"
        >
          Ingresar
        </button>
      </form>
    </div>
  );
};

export default LoginView;
