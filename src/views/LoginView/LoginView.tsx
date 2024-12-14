"use client";
import LoadingCircle from "@/components/general/loading-circle";
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
import { IUser, IUserLogin } from "@/types/zTypes";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

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
      const { token, user } = response;

      localStorage.setItem("userSession", JSON.stringify({ token, user }));
      swalNotifySuccess("¡Bienvenido de nuevo!", "");

      setUserData(initialState);

      if ((user as IUser).user.role === UserRole.MANAGER) {
        //TODO SET ID DE CENTRO DEPORTIVO
      }
      else if ((user as IUser).user.role === UserRole.USER) {
        router.push("/user");
      }

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
    <div className=" bg-custom-dark min-h-screen flex flex-col items-center justify-center  text-center">
      {
        isSubmitting ?
          (
            <>
              <h1 className="text-4xl font-bold text-gray-900 mb-8 font-serif text-white">
                Cargando...
              </h1>
              <div className="w-32 h-32">
                <LoadingCircle />
              </div>
            </>
          ) :
          (
            <>
              <h1 className="text-5xl font-bold text-gray-900 mb-8 font-serif text-white">
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
                    className="block text-white mb-2 text-center font-medium text-lg"
                    htmlFor="password"
                  >
                    Contraseña
                  </label>
                  <div className="relative">

                    <input
                      type="password"
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
                  className="mt-5 bg-primary text-dark px-4 py-2 rounded hover:bg-yellow-700 bg-yellow-600"
                >
                  Ingresar
                </button>
              </form>
            </>



          )
      }
    </div >
  );
};

export default LoginView;