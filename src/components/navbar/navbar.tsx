"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocalStorage } from "@/helpers/auth/useLocalStorage";
import { IUser } from "@/types/zTypes";
import { swalNotifySuccess } from "@/helpers/swal/swal-notify-success";
import { useUser } from "@auth0/nextjs-auth0/client";
import { getSubPath } from "@/utils/getSubPath";

const Navbar: React.FC = () => {
  // const [user,] = useLocalStorage("userSession", "");
  // const [userData, setUserData] = useState<IUser | null>(null);
  // const { user: authUser } = useUser();
  const [actual, setActual] = useState("");

  useEffect(() => {
    setActual(getSubPath(window.location.href));
  }, []);


  // useEffect(() => {
  //   if (typeof window !== "undefined" && window.localStorage) {
  //     setUserData(user);
  //   }
  // }, []);

  // const handleLogout = () => {
  //   localStorage.removeItem("userSession");
  //   localStorage.removeItem("restaurant");

  //   if (authUser) {
  //     window.location.href = "/api/auth/logout";
  //   } else {
  //     swalNotifySuccess("¡Adiós!", "Tu sesión ha finalizado.");
  //     window.location.href = "/";
  //   }
  // };

  return (
    <nav className=" bg-black fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <Image
            src="https://i.pinimg.com/736x/21/ac/7d/21ac7dbd2e678acd2d86286b62cf9b4d.jpg"
            alt="Flowbite Logo"
            width={32}
            height={32}
            className="h-8"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">

          </span>
        </Link>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">

          {
            actual === "/login" || actual === "/register" ?
              null
              :
              <Link href="/login">
                <button

                  type="button"
                  className="text-white bg-yellow-600 focus:outline-none focus:black font-medium rounded-lg text-sm px-4 py-2 text-center "
                >
                  Iniciar Sesion <s></s>

                </button>
              </Link>
          }

          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className=" bg-black flex flex-col p-4 md:p-0 mt-4 font-medium border rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 ">

            <li>
              <Link
                href="#about"
                className="block py-2 px-3 text-gray-900 rounded md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Nuestro Servicio
              </Link>
            </li>
            <li>
              <Link
                href=""
                className="block py-2 px-3 text-gray-900 rounded md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Reservar
              </Link>
            </li>
            <li>
              <Link
                href="https://web.whatsapp.com/"
                className="block py-2 px-3 text-gray-900 rounded md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Contacto
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav >
  );
};

export default Navbar;

