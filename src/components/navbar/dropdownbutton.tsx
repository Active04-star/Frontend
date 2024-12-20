"use client";
import { UserRole } from "@/enum/userRole";
import { logout } from "@/helpers/auth/logout";
import { useLocalStorage } from "@/helpers/auth/useLocalStorage";
import { IUser } from "@/types/zTypes";
import { getSubPath } from "@/utils/getSubPath";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AiOutlineCalendar, AiOutlineDollar, AiOutlineKey, AiOutlineLogout, AiOutlineSetting } from "react-icons/ai";

const DropDownButton: React.FC = () => {
    const [userData, setUserData] = useState<IUser | null>(null);
    const [actualPage, setActualPage] = useState("loading");
    const [user,] = useLocalStorage("userSession", "");
    const divRef = useRef<HTMLDivElement>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const offStyle = "flex items-center block px-4 py-2 text-gray-400 hover:bg-gray-100 transition-colors duration-200 pointer-events-none";
    const onStyle = "flex items-center block px-4 py-2 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-yellow-400";

//TODO AGREGAR EL COMPONENTE LOADING PARA EVITAR VISTAS INDESEADAS; (TALVEZ EN EL NAVBAR)
    useEffect(() => {
        setActualPage(getSubPath(window.location.href));

        const mouseOut = (event: MouseEvent) => {
            if (divRef.current && event.target instanceof Node && !divRef.current.contains(event.relatedTarget as Node)) {
                timeoutRef.current = setTimeout(() => {
                    setIsDropdownOpen(false);
                }, 2000);
            }
        };

        const clickOut = (event: MouseEvent) => {
            if (divRef.current && !divRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        }

        const mouseEnter = () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }
        };

        const element = divRef.current;
        console.log(element);
        if (element) {
            element.addEventListener("mouseout", mouseOut);
            element.addEventListener("mouseover", mouseEnter);
        }
        document.addEventListener("mousedown", clickOut);

        return () => {
            if (element) {
                element.removeEventListener("mouseout", mouseOut);
                element.removeEventListener("mouseover", mouseEnter);
            }
            document.removeEventListener("mousedown", clickOut);

        };
    }, []);


    useEffect(() => {
        if (typeof window !== "undefined" && window.localStorage) {
            setUserData(user);
        }
    }, [user]);


    const handleLogout = async () => {
        logout(true);
    };


    const toggleDropdown = (event: React.MouseEvent) => {
        event.stopPropagation();
        setIsDropdownOpen(!isDropdownOpen);
    };


    return (
        <div ref={divRef} className="relative">
            {
                userData ?

                    <div>
                        <button
                            onClick={toggleDropdown}
                            type="button"
                            className="flex items-center text-white bg-yellow-600 focus:outline-none focus:black font-bold rounded-lg text-sm px-4 py-2 text-center "
                        >
                            Mi perfil

                            <span className="ml-2">
                                {isDropdownOpen ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.293 9.707a1 1 0 001.414 0L10 6.414l3.293 3.293a1 1 0 001.414-1.414l-4-4a1 1 0 00-1.414 0l-4 4a1 1 0 000 1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M14.707 10.293a1 1 0 00-1.414 0L10 13.586 6.707 10.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l4-4a1 1 0 000-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                )}
                            </span>
                        </button>

                    </div>
                    :
                    actualPage === "loading" || actualPage === "/login" || actualPage === "/register" ?
                        null
                        :
                        <Link href="/login">
                            <button
                                type="button"
                                // onClick={}
                                className="text-white font-bold bg-yellow-600 focus:outline-none focus:black rounded-lg text-sm px-4 py-2 text-center "
                            >
                                Iniciar Sesion
                            </button>
                        </Link>
            }

            {isDropdownOpen ?
                (
                    <div className="absolute right-0 max-w-fit max-h-fit">
                        <div className="mt-2 w-48 bg-white border border-gray-300 rounded-sm shadow-lg z-10">
                            <ul className="py-2">
                                {userData && userData.user.role === UserRole.USER ? (
                                    <li>
                                        {/* TODO AQUI VA LA REDIRECCION AL FORMULARIO DE CENTRO DEPORTIVO */}
                                        <Link
                                            href={"/for-business"}
                                            aria-disabled={actualPage === "/for-business"}
                                            className={actualPage === "/for-business" ? offStyle : onStyle}
                                        >
                                            <AiOutlineDollar className="mr-2" />{" "}
                                            Para Negocios
                                        </Link>
                                    </li>
                                ) : null}
                             
                                {userData && userData.user.role === UserRole.MANAGER && (
                                    <li>
                                        <Link
                                            href={"/manager"}
                                            className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors duration-200"
                                        >
                                            <AiOutlineDollar className="mr-2" />{" "}
                                            Mi negocio
                                        </Link>
                                    </li>
                                )}
                                {userData && userData.user.role === UserRole.ADMIN && (
                                    <li>
                                        <Link
                                            //TODO AQUI VA EL LINK AL DASHBOARD DE ADMIN
                                            href={"/AquiVaElDashboardDeManager"}
                                            aria-disabled={actualPage === "/AquiVaElDashboardDeManager"}
                                            className={actualPage === "/AquiVaElDashboardDeManager" ? offStyle : onStyle}
                                        >
                                            <AiOutlineKey className="mr-2" />{" "}
                                            Administracion
                                        </Link>
                                    </li>
                                )}
                                <li>
                                    <Link
                                        //TODO AQUI VA EL LINK A LA VISTA DE CENTROS DEPORTIVOS (PARA USUARIO)
                                        href={"/AquiVaLaVistaDeCentrosDeportivos"}
                                        aria-disabled={actualPage === "/AquiVaLaVistaDeCentrosDeportivos"}
                                        className={actualPage === "/AquiVaLaVistaDeCentrosDeportivos" ? offStyle : onStyle}
                                    >
                                        <AiOutlineCalendar className="mr-2" />{" "}
                                        Reservar
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        //TODO AQUI VA EL LINK A CONFIGURACION DE PERFIL DE USUARIO
                                        href={"/settings"}
                                        aria-disabled={actualPage === "/AquiVaLaConfiguracionDePerfil"}
                                        className={actualPage === "/AquiVaLaConfiguracionDePerfil" ? offStyle : onStyle}
                                    >
                                        <AiOutlineSetting className="mr-2" />{" "}
                                        Configuracion
                                    </Link>
                                </li>

                                <li>
                                    <button
                                        onClick={handleLogout}
                                        className={onStyle}
                                    >
                                        <AiOutlineLogout className="mr-2" />{" "}
                                        Cerrar Sesión
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>

                )
                :
                null
            }
        </div>
    );
};

export default DropDownButton;