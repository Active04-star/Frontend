import React from "react";
import Link from "next/link";
import Image from "next/image";
import DropDownButton from "./dropdownbutton";

const Navbar: React.FC = () => {

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
          <DropDownButton />
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

