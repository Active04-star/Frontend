// import React, { useState } from "react";        a usar en el futuro , comentado para realizar build
import Swal from 'sweetalert2';
import { useRouter } from "next/navigation";

const MSidebar: React.FC<{ onMenuClick?: (viewName: string) => void }> = ({ onMenuClick }) => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("userSession");

    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: "success",
      title: "Logout successfuly",
    });
    router.push("/");
  };

  return (
    <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-black text-gray-800">
      <div className="sticky flex flex-col top-0 left-0 w-64 bg-white h-full border-r">
        <div className="flex items-center justify-center h-14 border-b"></div>
        <div className="overflow-y-auto overflow-x-hidden flex-grow">
          <ul className="flex flex-col py-4 space-y-1">
            {/* Menu Item "Panel" */}
            <li>
              <button>
                <span className="inline-flex justify-center items-center ml-4"></span>
                <span className="ml-2 text-sm tracking-wide truncate">Menu</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => onMenuClick && onMenuClick("panel")}
                className="relative flex flex-row items-center h-11 focus:outline-none text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-yellow-400 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                  </svg>
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">Panel</span>
              </button>
            </li>

            {/* Menu Item "Notificaciones" */}
            <li>
              <button
                onClick={() => onMenuClick && onMenuClick("Notificaciones")}
                className="relative flex flex-row items-center h-11 focus:outline-none text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-yellow-400 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                  </svg>
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">Notificaciones</span>
              </button>
            </li>

            {/* Otros botones */}
            {/* ... */}

            {/* Menu Item "Cerrar sesión" */}
            <li>
              <button
                onClick={handleLogout}
                className="relative flex flex-row items-center h-11 focus:outline-none text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-yellow-400 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">Cerrar sesión</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MSidebar;
