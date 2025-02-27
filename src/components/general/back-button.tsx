"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";

const BackButton: React.FC = () => {
  const router = useRouter();
  const [navbarHeight, setNavbarHeight] = useState<number>(0);

  useEffect(() => {
    const navbar = document.querySelector("nav");
    if (navbar) {
      setNavbarHeight(navbar.getBoundingClientRect().height);
    }
  }, []);

  return (
    <button
      onClick={() => router.back()}
      style={{ top: `${navbarHeight + 16}px` }} // Calcula la altura de la navbar más un margen
      className="fixed left-4 px-4 py-2 bg-yellow-600  text-white rounded-md  hover:bg-yellow-700 focus:outline-none z-10 flex"
    >
      <AiOutlineArrowLeft className="text-white mt-1 mr-1"></AiOutlineArrowLeft>{""}
      Volver
    </button>
  );
};

export default BackButton;
