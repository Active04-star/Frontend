/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { RegisterErrors } from "@/types/Errortypes";
import LoadingCircle from "@/components/general/loading-circle";
import { swalNotifySuccess } from "@/helpers/swal/swal-notify-success";
import { fetchWithAuth } from "@/helpers/errors/fetch-with-token-interceptor";
import { API_URL } from "@/config/config";
import { UserRole } from "@/enum/userRole";
import { useLocalStorage } from "@/helpers/auth/useLocalStorage";

const RegisterAdminView: React.FC = () => {

    const initalState: IUserRegister = {
        name: "",
        email: "",
        password: "",
        confirm_password: ""
    };

    const [userData, setUserData] = useState<IUserRegister>(initalState);
    const [errors, setErrors] = useState<RegisterErrors | null>(null);
    const [user] = useLocalStorage<IUser | null>("userSession", null);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

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
            swalCustomError("Error en el registro", "Por favor corrige los errores antes de continuar.");

            setIsSubmitting(false);
            return;
        }

        try {
            await fetchWithAuth(`${API_URL}/auth/admin/register`, {
                method: "POST",
                headers: { "content-type": "application/json", },
                body: JSON.stringify({ ...userData })
            });

            swalNotifySuccess("Registro exitoso", "Nuevo administrador creado");

        } catch (error: any) {

            if (error instanceof ErrorHelper) {
                swalNotifyError(error);

            } else {
                swalNotifyUnknownError(error);

            }

        } finally {
            setIsSubmitting(false);
            setUserData(initalState);
        }

    };


    if (user?.user.role !== UserRole.SUPER_ADMIN) {
        window.location.href = "/admin?view=inicio";
        return (<div className="flex min-h-screen"></div>);
    }


    return (
        <>
            <div className="p-6">

                <h2 className="text-4xl font-semibold mb-4 text-center p-5 text-white mt-5">
                    Nuevo administrador
                </h2>
                <div className="mt-4 flex flex-col items-center justify-center bg-black text-center">
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
                                    {/* <h1 className="text-5xl font-bold text-white mb-8  ">Regístrate</h1> */}
                                    <form onSubmit={handleSubmit} className="w-full max-w-sm">
                                        <div className="mb-6">
                                            <label
                                                className="block text-white mb-2 text-center font-medium text-lg"
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
                                            {userData.name &&
                                                errors !== null &&
                                                errors.name !== undefined &&
                                                errors?.name._errors !== undefined ? (
                                                <span
                                                    className="text-sm text-red-600"
                                                    style={{ fontSize: "12px" }}
                                                >
                                                    {errors.name._errors}
                                                </span>
                                            ) : null}
                                        </div>

                                        <div className="mb-6">
                                            <label
                                                className="block text-white mb-2 text-center font-medium text-lg"
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
                                            </div>
                                            {userData.confirm_password &&
                                                errors !== null &&
                                                errors.confirm_password !== undefined &&
                                                errors?.confirm_password._errors !== undefined ? (
                                                <span
                                                    className="text-sm text-red-600"
                                                    style={{ fontSize: "12px" }}
                                                >
                                                    {errors.confirm_password._errors}
                                                </span>
                                            ) : null}
                                        </div>

                                        <div className="w-auto flex justify-around">
                                            <button
                                                type="submit"
                                                className=" mt-5 bg-primary text-dark px-4 py-2 rounded hover:bg-yellow-700 bg-yellow-600"
                                            >
                                                Registrar Administrador
                                            </button>
                                        </div>
                                    </form>
                                </>
                            )
                    }
                </div >
            </div>
        </>
    );
};

export default RegisterAdminView;
