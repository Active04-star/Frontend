"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { AiOutlineDollar } from "react-icons/ai";
import Swal from "sweetalert2";
import DropDownButton from "./dropdownbutton";

const NavbarUser = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

 

  return (
    <nav className=" bg-black fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <Image
            src="https://i.pinimg.com/736x/21/ac/7d/21ac7dbd2e678acd2d86286b62cf9b4d.jpg"
            alt="Flowbite Logo"
            width={32}
            height={32}
            className="h-8"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"></span>
        </Link>

        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <DropDownButton />
        </div>

        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        ></div>
      </div>
    </nav>
  );
};

export default NavbarUser;
