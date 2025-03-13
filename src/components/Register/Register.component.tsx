"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ErrorHelper } from "@/helpers/errors/error-helper";
import { swalNotifyError } from "@/helpers/swal/swal-notify-error";
import { swalNotifyUnknownError } from "@/helpers/swal/swal-notify-unknown-error";
import { zodValidate } from "@/helpers/validate-zod";
import { IUserRegister } from "@/types/zTypes";
import { UserRegisterSchema } from "@/types/userRegister-schema";
import { swalCustomError } from "@/helpers/swal/swal-custom-error";
import { RegisterErrors } from "@/types/Errortypes";
import { register } from "@/helpers/auth/register";
import { swalNotifySuccess } from "@/helpers/swal/swal-notify-success";
import LoadingCircle from "@/components/general/loading-circle";
import Google from "@/components/icons/Google.icon";

interface RegisterComponentProps {
  handleLoginClick: () => void; // La prop es opcional para mantener compatibilidad
}

const Register: React.FC<RegisterComponentProps> = ({ handleLoginClick }) => {
  const initialState: IUserRegister = {
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  };

  const [userData, setUserData] = useState<IUserRegister>(initialState);
  const [errors, setErrors] = useState<RegisterErrors | null>(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;
    let { value } = event.target;
    if (name === "email") {
      value = value.toLowerCase();
    }

    setUserData({
      ...userData,
      [name]: value,
    });
  };

  useEffect(() => {
    const data = zodValidate<RegisterErrors>(userData, UserRegisterSchema);

    if (!data.success) {
      setErrors(data.errors);
    } else {
      setErrors(null);
    }
  }, [userData]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);

    if (Object.values(userData).find((data) => data === "") === "") {
      swalCustomError("Error en el registro", "Los campos están vacios.");

      setIsSubmitting(false);
      return;
    }

    const data = zodValidate(userData, UserRegisterSchema);

    if (!data.success) {
      swalCustomError(
        "Error en el registro",
        "Por favor corrige los errores antes de continuar."
      );

      setIsSubmitting(false);
      return;
    }

    try {
      localStorage.clear();

      await register(userData);

      swalNotifySuccess(
        "Registro exitoso",
        "Podras iniciar sesion en un momento"
      );

      handleLoginClick();
      setIsSubmitting(false);
      setUserData(initialState);
    } catch (error: any) {
      if (error instanceof ErrorHelper) {
        swalNotifyError(error);
      } else {
        swalNotifyUnknownError(error);
      }

      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>Crear Cuenta</h1>
        <hr className="w-full border-t-2 border-yellow-600" />
        <nav className="flex flex-wrap gap-4 my-3 ">
          <Link
            type="submit"
            href="api/auth/login?screen_hint=signup"
            target="_blank"
            rel="noopener noreferrer"
            role="link"
            className="inline-flex items-center justify-center gap-2 px-4 py-1 text-gray-800 transition bg-gray-100 border border-gray-300 rounded-full dark:bg-gray-800 dark:border-gray-600 dark:text-white focus-visible:ring-yellow-500/80 text-md hover:bg-gray-900 hover:border-gray-700 hover:text-white dark:hover:bg-gray-100 dark:hover:border-gray-300 dark:hover:text-black group max-w-fit focus:outline-none focus-visible:outline-none focus-visible:ring focus-visible:ring-white focus-visible:ring-offset-2 active:bg-black text-sm"
          >
            <Google />
            Registrate con Google
          </Link>
        </nav>
        <div className="flex items-center w-[100%]">
          <div className="flex-grow border-t-2 border-yellow-600"></div>
          <span className="mx-4 text-sm text-gray-500">
            o usa tu email para registrarte
          </span>
          <div className="flex-grow border-t-2 border-yellow-600"></div>
        </div>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={userData.name}
          onChange={handleChange}
        />
        {userData.name &&
        errors !== null &&
        errors.name !== undefined &&
        errors?.name._errors !== undefined ? (
          <span className="text-sm text-red-600" style={{ fontSize: "12px" }}>
            {errors.name._errors}
          </span>
        ) : null}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={userData.email}
          onChange={handleChange}
        />
        {userData.email &&
        errors !== null &&
        errors.email !== undefined &&
        errors?.email._errors !== undefined ? (
          <span className="text-sm text-red-600" style={{ fontSize: "12px" }}>
            {errors.email._errors}
          </span>
        ) : null}
        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Contraseña"
            className="w-full"
            value={userData.password}
            onChange={handleChange}
          />
          <div
            className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
        </div>
        {userData.password &&
        errors !== null &&
        errors.password !== undefined &&
        errors?.password._errors !== undefined ? (
          <>
            <span className="text-sm text-red-600" style={{ fontSize: "12px" }}>
              {errors.password._errors[0]}
            </span>

            <div>
              <span
                className="text-sm text-red-600"
                style={{ fontSize: "12px" }}
              >
                {errors.password._errors[1] !== undefined &&
                errors.password._errors[1].length > 0
                  ? errors.password._errors[1]
                  : null}
              </span>
            </div>
          </>
        ) : null}
        <div className="relative w-full">
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirm_password"
            placeholder="Confirmar Contraseña"
            className="w-full"
            value={userData.confirm_password}
            onChange={handleChange}
          />
          <div
            className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
        </div>
        {userData.confirm_password &&
        errors !== null &&
        errors.confirm_password !== undefined &&
        errors?.confirm_password._errors !== undefined ? (
          <span className="text-sm text-red-600" style={{ fontSize: "12px" }}>
            {errors.confirm_password._errors}
          </span>
        ) : null}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
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
            "Registrarse"
          )}
        </button>{" "}
      </form>
    </>
  );
};

export default Register;
