import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";

const BotonVolver: React.FC = () => {
  const router = useRouter();
  const [navbarHeight, setNavbarHeight] = useState<number>(0);

  useEffect(() => {
    const navbar = document.querySelector("nav");
    if (navbar) {
      setNavbarHeight(navbar.getBoundingClientRect().height);
    }
  }, []);

  const manejarVolver = () => {
    router.back();
  };

  return (
    <button
      onClick={manejarVolver}
      style={{ top: `${navbarHeight + 16}px` }} // Calcula la altura de la navbar más un margen
      className="left-4 px-4 py-2 text-white rounded-md hover:bg-neutral-800 focus:outline-none z-10 font-bold flex"
    >
      <AiOutlineArrowLeft className="text-white mt-1 mr-1"></AiOutlineArrowLeft>{""}
      Volver
    </button>
  );
};

export default BotonVolver;
