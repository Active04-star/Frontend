import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

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
      className="fixed left-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none z-10"
    >
      Volver
    </button>
  );
};

export default BotonVolver;
