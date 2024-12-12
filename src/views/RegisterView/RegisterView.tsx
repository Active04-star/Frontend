/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { ErrorHelper } from '@/scripts/errors/error-helper';
import { swalNotifyError } from '@/scripts/swal/swal-notify-error';
import { swalNotifyUnknownError } from '@/scripts/swal/swal-notify-unknown-error';
import { zodValidate } from '@/helpers/validate-zod';
import { UserRegister } from '@/types/zTypes';
import { UserRegisterSchema } from '@/types/zUserRegisterSchema';
import React, { useEffect, useState } from 'react'
import { swalCustomError } from '@/scripts/swal/swal-custom-error';
import { useLocalStorage } from '@/helpers/auth-helpers/useLocalStorage';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { RegisterErrors } from '@/types/Errortypes';

const RegisterView: React.FC = () => {
  //     const initalState = {
  //         name: "",
  //         email: "",
  //         password: "",
  //         confirmPassword: "",
  //         profileImage: "",
  //       };

  const initalState: UserRegister = {
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    profile_image: null
  };

  const [userData, setUserData] = useState<UserRegister>(initalState)
  const [errors, setErrors] = useState<RegisterErrors | null>(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAllowed, setIsAllowed] = useState(true);
  const [iuser,] = useLocalStorage("userSession", "");

  //   useEffect(() => {
  //     if (iuser.token === null || iuser.token === undefined) {
  //       setIsAllowed(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setUserData({
      ...userData,
      [name]: value,
    });
  };

  useEffect(() => {
    if (iuser.token === null || iuser.token === undefined) {
      setIsAllowed(true);

    } else {
      setIsAllowed(false);

    }

  }, [iuser]);

  useEffect(() => {

    const data = zodValidate(userData, UserRegisterSchema);

    if (!data.success) {
      setErrors(data.errors);
    } else {
      setErrors(null);
    }

  }, [userData])

  //     if (Object.values(currentErrors).some((error) => error)) {
  //       Swal.fire({
  //         icon: "error",
  //         title: "Error en el registro",
  //         text: "Por favor corrige los errores antes de continuar.",
  //       });
  //       setIsSubmitting(false);
  //       return;
  //     }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);

    if(Object.values(userData).find((data) => data === "") === "") {
      swalCustomError("Error en el registro", "Los campos están vacios.");

      setIsSubmitting(false);
      return;
    }
    
    const data = zodValidate(userData, UserRegisterSchema)
    
    console.log(data);
    if (!data.success) {

      swalCustomError("Error en el registro", "Por favor corrige los errores antes de continuar.");

      setIsSubmitting(false);
      return;
    }

    console.log("success");

    try {
      //FETCH A BACK AQUi
      // await register(userData);

    } catch (error: any) {
      if (error instanceof ErrorHelper) {
        swalNotifyError(error);

      } else {
        swalNotifyUnknownError(error);

      }

    } finally {
      setIsSubmitting(false);
    }

  };

  return (
    <>
      {!isAllowed ?
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-8  ">
            Regístrate
          </h1>
          <form onSubmit={handleSubmit} className="w-full max-w-sm">
            <div className="mb-6">
              <label
                className="block text-gray-500 mb-2 text-center font-medium text-lg"
                htmlFor="name"
              >
                Nombre
              </label>
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
                userData.name && errors !== null && errors.name !== undefined && errors?.name._errors !== undefined
                  ?
                  (
                    <span
                      className="text-sm text-red-600"
                      style={{ fontSize: "12px" }}
                    >
                      {errors.name._errors}
                    </span>
                  )
                  :
                  null
              }
            </div>

            <div className="mb-6">
              <label
                className="block text-gray-500 mb-2 text-center font-medium text-lg"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                placeholder="agu@gmail.com"
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
                className="block text-gray-500 mb-2 text-center font-medium text-lg"
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
                  {
                    showPassword ?
                      (<FaEyeSlash style={{ color: "black" }} />)
                      :
                      (<FaEye style={{ color: "black" }} />)
                  }
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

            <div>
              <div>
                <label
                  className="block text-gray-500 mb-2 text-center font-medium text-lg"
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
                  {
                    showConfirmPassword ?
                      (<FaEyeSlash style={{ color: "black" }} />)
                      :
                      (<FaEye style={{ color: "black" }} />)
                  }
                </div>
              </div>
              {
                userData.confirm_password && errors !== null && errors.confirm_password !== undefined && errors?.confirm_password._errors !== undefined
                  ?
                  (
                    <span
                      className="text-sm text-red-600"
                      style={{ fontSize: "12px" }}
                    >
                      {errors.confirm_password._errors}
                    </span>
                  )
                  :
                  null
              }
            </div>

            <button
              type="submit"
              className="bg-primary text-dark px-4 py-2 rounded hover:bg-yellow-600 bg-yellow-400"
            >
              Registrarse
            </button>
          </form>
        </div>
        :
        null}
    </>
  )
}


export default RegisterView;
