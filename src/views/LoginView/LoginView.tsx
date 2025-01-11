"use client";
import LoadingCircle from "@/components/general/loading-circle";
import { UserRole } from "@/enum/userRole";
import { zodValidate } from "@/helpers/validate-zod";
import { AuthErrorHelper } from "@/helpers/errors/auth-error-helper";
import { ErrorHelper } from "@/helpers/errors/error-helper";
import { login } from "@/helpers/auth/login";
import { swalCustomError } from "@/helpers/swal/swal-custom-error";
import { swalNotifySuccess } from "@/helpers/swal/swal-notify-success";
import { LoginErrors } from "@/types/Errortypes";
import { UserLoginSchema } from "@/types/userLogin-schema";
import { IUser, IUserLogin } from "@/types/zTypes";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { ApiStatusEnum } from "@/enum/HttpStatus.enum";
import { getCenterIfManager } from "@/helpers/auth/getCenterIfManager";
import { getUserType } from "@/helpers/auth/getUserType";
import { swalConfirmation } from "@/helpers/swal/swal-notify-confirm";

const LoginView: React.FC = () => {
  const router = useRouter();
  const initialState = {
    email: "",
    password: "",
  };

  const [userData, setUserData] = useState<IUserLogin>(initialState);
  const [errors, setErrors] = useState<LoginErrors | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
  }, [userData]);


  useEffect(() => {
    const queryString = new URLSearchParams(window.location.search);
    const queryParams = Object.fromEntries(queryString.entries()) as { from: string };

    if (queryParams.from === "business") {
      swalCustomError("Necesitas una cuenta", "Debes estar registrado para poder acceder a esta funcion", [, 6000]);

    } else if (queryParams.from === "out_session") {
      swalCustomError("La sesion ha expirado!", "Debes iniciar sesion nuevamente", [, 6000]);

    } else if (queryParams.from === "user_blocked") {
      swalCustomError("No se pudo iniciar sesion", "Este usuario fue baneado!", [, 6000]);

    }

  }, []);


  const redirectToAuth = (email: string) => {
    window.location.href = `api/auth/login?login_hint=${encodeURIComponent(email)}`
  };


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);

    const validation = zodValidate(userData, UserLoginSchema);

    if (validation.errors === undefined || validation.errors.email === undefined) {

      try {

        const response = await getUserType(userData.email);

        if (response.message === ApiStatusEnum.USER_IS_THIRD_PARTY) {
          redirectToAuth(userData.email.toLowerCase());
          return;
        }

      } catch (error) {

        if (error instanceof ErrorHelper && error.message === ApiStatusEnum.USER_DELETED) {
          swalCustomError(ApiStatusEnum.USER_DELETED, "No se pudo logear");
          setIsSubmitting(false);
          setUserData(initialState);
          
          return;

        } else {
          console.error(error);
          window.location.href = "/";

        }
      }
    }

    if (Object.values(userData).find((data) => data === "") === "") {
      swalCustomError("Error en Logueo", "Los campos están vacios.");

      setIsSubmitting(false);
      return;
    }


    if (!validation.success) {
      swalCustomError("Error en Logueo", "Por favor corrige los errores antes de continuar.");

      setIsSubmitting(false);
      return;
    }

    try {
      localStorage.clear();

      const response: IUser = await login(userData);
      const { token, user } = response;

      localStorage.setItem("userSession", JSON.stringify({ token, user }));

      swalNotifySuccess("¡Bienvenido de nuevo!", "");

      setUserData(initialState);
      await getCenterIfManager(response);

      const roleRoutes = {
        [UserRole.USER]: "/user",
        [UserRole.MAIN_MANAGER]: "/manager",
        [UserRole.ADMIN]: "/admin",
        [UserRole.MANAGER]: "/manager",
      };

      const route = roleRoutes[user.role];
      if (route) {
        router.push(route);
        return;
      }

      router.push("/");
    } catch (error) {
      if (
        error instanceof ErrorHelper &&
        error.message === ApiStatusEnum.USER_DELETED
      ) {
        swalCustomError(ApiStatusEnum.USER_DELETED, "No se pudo logear");
      } else {
        AuthErrorHelper(error);
      }

      setIsSubmitting(false);
    }
  };


  return (
    <div className="bg-custom-dark min-h-screen flex flex-col items-center justify-center text-center">
      {isSubmitting ? (
        <>
          <h1 className="text-4xl font-bold mb-8 font-serif text-white">
            Cargando...
          </h1>
          <div className="w-32 h-32">
            <LoadingCircle />
          </div>
        </>
      ) : (
        <>
          <h1 className="text-5xl font-bold mb-8 font-serif text-white">
            Active
          </h1>
          <form onSubmit={handleSubmit} className="w-full max-w-sm">
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
                value={userData.email}
                onChange={handleChange}
                placeholder="Active123@mail.com"
                className="w-full px-4 py-2 border-gray-300 rounded-lg bg-gray-200 focus:outline-none text-black font-sans"
              />
              {userData.email &&
                errors !== null &&
                errors.email !== undefined &&
                errors?.email._errors !== undefined ? (
                <span
                  className="text-sm text-red-600"
                  style={{ fontSize: "12px" }}
                >
                  {errors.email._errors}
                </span>
              ) : null}
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
              </div>
              {userData.password &&
                errors !== null &&
                errors.password !== undefined &&
                errors?.password._errors !== undefined ? (
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
                      {errors.password._errors[1] !== undefined &&
                        errors.password._errors[1].length > 0
                        ? errors.password._errors[1]
                        : null}
                    </span>
                  </div>
                </>
              ) : null}
            </div>

            <div className="w-auto flex justify-around">
              <button
                type="submit"
                className="mt-5 bg-primary text-dark px-6 py-2 rounded hover:bg-yellow-700 bg-yellow-600"
              >
                Ingresar
              </button>
            </div>

            <div className="mt-3">
              <span className="mr-4">¿No tienes cuenta?</span>
              <Link href={"/register"}>
                <span className="text-yellow-600">Regístrate</span>
              </Link>
            </div>

            <div className="flex justify-around py-5">
              <div className="w-2/5 border-b border-white mb-3"></div>
              <div className="mx-2">o</div>
              <div className="w-2/5 border-b border-white mb-3"></div>
            </div>

            <div className="w-auto flex justify-around">
              <Link
                type="submit"
                className="mt-5 bg-primary text-dark px-6 py-2 rounded bg-orange-100 text-black flex justify-between"
                href="api/auth/login/"
              >
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
      )}
    </div>
  );
};

export default LoginView;
