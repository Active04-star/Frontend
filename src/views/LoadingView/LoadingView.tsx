/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import LoadingCircle from "@/components/general/loading-circle";
import { API_URL } from "@/config/config";
import { UserRole } from "@/enum/userRole";
import { getCenterIfManager } from "@/helpers/auth/getCenterIfManager";
import { useLocalStorage } from "@/helpers/auth/useLocalStorage";
import { swalCustomError } from "@/helpers/swal/swal-custom-error";
import { zodValidate } from "@/helpers/validate-zod";
import { UserSchemaWToken } from "@/types/user-schema";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect, useState } from "react";
import { fetchAndCatch } from "@/helpers/errors/fetch-error-interceptor";
import { IUser } from "@/types/zTypes";
import { ApiError } from "next/dist/server/api-utils";

const LoadingView: React.FC = () => {
    const { user, isLoading, error: e } = useUser();
    const [, setSession] = useLocalStorage("userSession", "");
    const [error, setError] = useState(false);
    const [show, setShow] = useState(false);

    useEffect(() => {

        const handle = async () => {
            try {

                const cookie = await fetchAndCatch("/api/get-cookie", { method: "GET" });

                if (cookie.to === 'login') {

                    if (!isLoading) {

                        if (user) {
                            setShow(true);
                            await fetchAndCatch("/api/remove-cookie?cookie=to", { method: "GET" });

                            try {
                                const { email, name, sub, picture: profile_image } = user;

                                const response = await fetchAndCatch(`${API_URL}/auth/authenticate`, {
                                    method: "POST",
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },

                                    body: JSON.stringify({
                                        email,
                                        name,
                                        sub,
                                        profile_image,
                                    })
                                });

                                const validate = zodValidate(response, UserSchemaWToken);

                                if (validate.success) {

                                    setSession({ token: (response as IUser).token, user: (response as IUser).user });
                                    await getCenterIfManager(response as IUser);

                                    // if (user.role === UserRole.USER) {
                                    //     window.location.href = "/user";
                                    //     return;
                                    // }

                                          const roleRoutes = {
                                            [UserRole.USER]: "/user",
                                            [UserRole.MAIN_MANAGER]: "/manager",
                                            [UserRole.ADMIN]: "/admin",
                                            [UserRole.MANAGER]: "/manager",
                                          };
                                    
                                          const route = roleRoutes[(response as IUser).user.role];
                                          if (route) {
                                            window.location.href = route;
                                            return;
                                          }
                                    

                                    window.location.href = "/"
                                } else {
                                    console.log("invalid Response From Backend:");
                                    console.log(validate.errors);
                                    throw new ApiError(500, "invalid response");

                                }

                            } catch (error) {

                                setError(true);
                                console.log(error);

                                if(error instanceof ApiError) {
                                    await swalCustomError(error.message)
                                }

                                await swalCustomError("No se pudo iniciar sesion intentalo mas tarde",).then((result) => {

                                    if (result.isConfirmed) {
                                        window.location.href = "/";
                                    }
                                });
                                window.location.href = "/api/auth/logout";

                            }
                        }
                    }

                } else {
                    window.location.href = "/";
                    setShow(false);
                }

            } catch (error: any) {
                
                if (error.message === "Cookie not found") {
                    setShow(true);
                    window.location.href = "/";
                } else {
                    setShow(false);
                    console.log(error);
                }
            }

        }

        handle();
    }, [user, isLoading]);

    return (
        <section className="bg-black min-h-screen flex items-center justify-center">
            {!show ?
                null :
                <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                    <div className="mx-auto max-w-screen-sm text-center">
                        <p className="mb-4 text-3xl tracking-tight font-bold text-white md:text-4xl">
                            {error ? "Error!" : "Cargando..."}
                        </p>
                        <p className="mb-4 text-lg font-light text-white">
                            {error ? "No se pudo iniciar sesion, intentalo mas tarde!" : "Por favor, espera mientras autenticamos la información."}
                        </p>

                        {error ? null :
                            <div className="min-w-full flex justify-around">
                                <div className="w-32 h-32">
                                    <LoadingCircle />
                                </div>
                            </div>
                        }
                    </div>
                </div>}
        </section>
    );
}

export default LoadingView;