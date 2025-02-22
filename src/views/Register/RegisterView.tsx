"use client";
import { ErrorHelper } from "@/helpers/errors/error-helper";
import { swalNotifyError } from "@/helpers/swal/swal-notify-error";
import { swalNotifyUnknownError } from "@/helpers/swal/swal-notify-unknown-error";
import { zodValidate } from "@/helpers/validate-zod";
import { IUser, IUserRegister } from "@/types/zTypes";
import { UserRegisterSchema } from "@/types/userRegister-schema";
import React, { useEffect, useState } from "react";
import { swalCustomError } from "@/helpers/swal/swal-custom-error";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { register } from "@/helpers/auth/register";
import LoadingCircle from "@/components/general/loading-circle";
import { useRouter } from "next/navigation";
import { swalNotifySuccess } from "@/helpers/swal/swal-notify-success";
import Link from "next/link";
import Image from "next/image";
import { useLocalStorage } from "@/helpers/auth/useLocalStorage";
import { useError } from "@/helpers/errors/zod-error-normalizator";
import ErrorSpan from "@/components/general/error-form-span";

const RegisterView: React.FC = () => {
  const router = useRouter();

  const initalState: IUserRegister = {
    name: "",
    email: "",
    password: "",
    confirm_password: ""
  };

  const [userData, setUserData] = useState<IUserRegister>(initalState);
  const [errors, setErrors] = useError<IUserRegister | null>(null);
  const [user] = useLocalStorage<IUser | null>("userSession", null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    let value_

    if (name === "email") {
      value_ = value.toLowerCase();
    }

    setUserData({
      ...userData,
      [name]: value_ || value,
    });
  };


  useEffect(() => {
    const data = zodValidate<IUserRegister>(userData, UserRegisterSchema);

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
      swalCustomError("Error", "Los campos están vacios.");

      setIsSubmitting(false);
      return;
    }

    const data = zodValidate<IUserRegister>(userData, UserRegisterSchema);

    if (!data.success) {
      swalCustomError("Error en el registro", "Por favor corrige los errores antes de continuar.");

      setIsSubmitting(false);
      return;
    }

    try {
      localStorage.clear();

      await register(userData);

      swalNotifySuccess("Registro exitoso", "Serás redirigido al login en breve.");

      router.push("/login");
    } catch (error: any) {

      if (error instanceof ErrorHelper) {
        swalNotifyError(error);

      } else {
        swalNotifyUnknownError(error);

      }

      setIsSubmitting(false);
    }

  };

  if (user !== null) {
    window.location.href = "/";
    return;
  }

  return (
    <>
      <div className="mt-10 min-h-screen flex flex-col items-center justify-center bg-custom-dark text-center">
        {
          isSubmitting ?
            (
              <>
                <h1 className="text-4xl font-bold mb-8 font-serif text-white">
                  Cargando...
                </h1>
                <div className="w-32 h-32">
                  <LoadingCircle />
                </div>
              </>
            ) :
            (
              <>
                <h1 className="text-5xl font-bold text-white mb-8  ">Regístrate</h1>
                <form onSubmit={handleSubmit} className="w-full max-w-sm mb-8">
                  <div className="mb-6">
                    <label
                      className="block text-white mb-2 text-center font-medium text-lg"
                      htmlFor="name"
                    >
                      Nombre
                    </label>
                    <div className="relative">

                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={userData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full px-4 py-2 border-gray-300 rounded-lg bg-gray-200 focus:outline-none text-black font-sans"
                      />
                      {
                        userData.name && errors?.name !== undefined &&
                        <div className="absolute top-1 text-start text-xs text-red-600 z-20 w-full max-w-full left-full ml-3">
                          <ErrorSpan errors={errors?.name} />
                        </div>
                      }
                    </div>
                  </div>

                  <div className="mb-6">
                    <label
                      className="block text-white mb-2 text-center font-medium text-lg"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <div className="relative">

                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                        placeholder="mail@mail.com"
                        className="w-full px-4 py-2 border-gray-300 rounded-lg bg-gray-200 focus:outline-none text-black font-sans"
                      />
                      {
                        userData.email && errors?.email !== undefined &&
                        <div className="absolute top-1 text-start text-xs text-red-600 z-20 w-full max-w-full left-full ml-3">
                          <ErrorSpan errors={errors?.email} />
                        </div>
                      }
                    </div>
                  </div>

                  <div className="mb-6 relative">
                    <label
                      className="block text-white mb-2 text-center font-medium text-lg"
                      htmlFor="password"
                    >
                      Contraseña
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        value={userData.password}
                        onChange={handleChange}
                        placeholder="******"
                        className="w-full px-4 py-2 border-gray-300 rounded-lg bg-gray-200 focus:outline-none text-black font-sans"
                      />
                      <div
                        className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <FaEyeSlash style={{ color: "black" }} />
                        ) : (
                          <FaEye style={{ color: "black" }} />
                        )}
                      </div>
                      {
                        userData.password && errors?.password !== undefined &&
                        <div className="absolute top-1 text-start text-xs text-red-600 z-20 w-full max-w-full left-full ml-3">
                          <ErrorSpan errors={errors?.password} />
                        </div>
                      }
                    </div>

                  </div>

                  <div>
                    <div>
                      <label
                        className="block text-white mb-2 text-center font-medium text-lg"
                        htmlFor="confirm_password"
                      >
                        Confirmar Contraseña
                      </label>
                    </div>

                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirm_password"
                        name="confirm_password"
                        value={userData.confirm_password}
                        onChange={handleChange}
                        placeholder="******"
                        className="w-full px-4 py-2 border-gray-300 rounded-lg bg-gray-200 focus:outline-none text-black font-sans"
                      />
                      <div
                        className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <FaEyeSlash style={{ color: "black" }} />
                        ) : (
                          <FaEye style={{ color: "black" }} />
                        )}
                      </div>
                      {
                        userData.confirm_password && errors?.confirm_password !== undefined &&
                        <div className="absolute top-1 text-start text-xs text-red-600 z-20 w-full max-w-full left-full ml-3">
                          <ErrorSpan errors={errors?.confirm_password} />
                        </div>
                      }
                    </div>
                  </div>

                  <div className="w-auto flex justify-around">

                    <button
                      type="submit"
                      // disabled={errors !== null ? true : false}
                      className=" mt-5 bg-primary text-dark px-4 py-2 rounded hover:bg-yellow-700 bg-yellow-600 disabled:cursor-not-allowed disabled:text-yellow-100 disabled:hover:bg-yellow-600"
                    >
                      Registrarse
                    </button>
                  </div>

                  <div className="mt-3">
                    <span className="mr-4">
                      ¿Ya tienes una cuenta?
                    </span>
                    <Link href={"/login"}>
                      <span className="text-yellow-600">
                        Iniciar sesión
                      </span>
                    </Link>
                  </div>

                  <div className="flex justify-around py-5">
                    <div className="w-2/5 border-b border-white mb-3"></div>
                    <div className="mx-2">
                      o
                    </div>
                    <div className="w-2/5 border-b border-white mb-3"></div>
                  </div>

                  <div className="w-auto flex justify-around">
                    <Link
                      type="submit"
                      className="mt-5 bg-primary text-dark px-6 py-2 rounded bg-white text-black flex justify-between"
                      href={"api/auth/login?screen_hint=signup"}>

                      <Image
                        src="https://auth.openai.com/assets/google-logo-NePEveMl.svg"
                        alt="google icon"
                        width={25}
                        height={25}
                        className="mr-2"
                      />
                      Continuar con Google
                    </Link>
                  </div>
                </form>
              </>
            )
        }
      </div >
    </>
  );
};

export default RegisterView;
