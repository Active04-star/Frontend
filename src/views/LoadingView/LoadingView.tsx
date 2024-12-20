/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import LoadingCircle from "@/components/general/loading-circle";
import { API_URL } from "@/config/config";
import { UserRole } from "@/enum/userRole";
import { useLocalStorage } from "@/helpers/auth/useLocalStorage";
import { swalCustomError } from "@/helpers/swal/swal-custom-error";
import { zodValidate } from "@/helpers/validate-zod";
import { UserSchemaWToken } from "@/types/user-schema";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect } from "react";

const LoadingView: React.FC = () => {
    const { user, isLoading, error } = useUser();
    // const [complex, setComplex] = useLocalStorage("complex", "");
    const [session, setSession] = useLocalStorage("userSession", "");

    useEffect(() => {

        const handle = async () => {
            if (!isLoading) {
                // console.log(user);
                if (user) {

                    try {
                        const { email, name, sub, picture: profile_image } = user;

                        const response: Response = await fetch(`${API_URL}/auth/authenticate`, {
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

                        const data = await response.json();
                        const validate = zodValidate(data, UserSchemaWToken);
                        
                        if (validate.success) {

                            setSession({ token: data.token, user: data.user });

                            if (data.user.role === UserRole.MAIN_MANAGER) {
                                // const id = await fetchRestaurantData();
                                // setComplex(id);
                            }

                            window.location.href = "/"
                        } else {
                            console.log("invalid Response From Backend:");
                            console.log(validate.errors);

                        }

                    } catch (error) {
                        console.log(error);
                        await swalCustomError("No se pudo iniciar sesion con auth0",).then((result) => {

                            if (result.isConfirmed) {
                                window.location.href = "/";
                            }
                        });

                    }

                } 
            }
        }

        handle();
    }, [user, isLoading]);

    return (
        <section className="bg-black min-h-screen flex items-center justify-center">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-sm text-center">
                    <p className="mb-4 text-3xl tracking-tight font-bold text-white md:text-4xl">
                        Cargando...
                    </p>
                    <p className="mb-4 text-lg font-light text-white">
                        Por favor, espera mientras autenticamos la información.
                    </p>
                    <div className="min-w-full flex justify-around">
                        <div className="w-32 h-32">
                            <LoadingCircle />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default LoadingView;