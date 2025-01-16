"use client";

import { ViewName } from "@/app/admin/page";
import { logout } from "@/helpers/auth/logout";

const Sidebar: React.FC<{ onMenuClick: (viewName: ViewName) => void }> = ({
  onMenuClick,
}) => {
  const handleLogout = () => {
    localStorage.removeItem("userSession");

    logout(true);
  };
  return (
    <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-black text-gray-800">
      <div className="sticky flex flex-col top-0 left-0 w-64 bg-black h-full ">
        <div className="flex items-center justify-center h-14 border-b"></div>
        <div className="overflow-y-auto overflow-x-hidden flex-grow">
          <ul className="flex flex-col py-4 space-y-1">
            <li className="px-5" >
              <div className="flex flex-row items-center h-8">
                <div className="text-sm font-light tracking-wide text-gray-500">
                  Menu
                </div>
              </div>
            </li>
            <li>
              <button
                onClick={() => onMenuClick && onMenuClick("inicio")}
                className="relative flex flex-row items-center h-11 focus:outline-none text-gray-600 hover:text-white -l-4 border-transparent hover:border-yellow-400 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 10l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V10z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 21V12h6v9"
                    />
                  </svg>
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">
                  Inicio
                </span>
              </button>
            </li>

            <li>
              <button
                onClick={() => onMenuClick && onMenuClick("managers")}
                className="relative flex flex-row items-center h-11 focus:outline-none text-gray-600 hover:text-white -l-4 border-transparent hover:border-yellow-400 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 11c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zM16 14H8c-2.21 0-4 1.79-4 4v2h16v-2c0-2.21-1.79-4-4-4zM20 8h-1.6M19 10l1 1m-1-1l-1-1m2-2l-2-2"
                    ></path>
                  </svg>
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">
                  Managers Premium
                </span>
              </button>
            </li>
            <li>
  <button
    onClick={() => onMenuClick && onMenuClick("categorias")}
    className="relative flex flex-row items-center h-11 focus:outline-none text-gray-600 hover:text-white -l-4 border-transparent hover:border-yellow-400 pr-6"
  >
    <span className="inline-flex justify-center items-center ml-4">
      {/* Nuevo SVG - Ícono de Carpeta */}
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M3 7c0-1.1.9-2 2-2h6l2 2h6c1.1 0 2 .9 2 2v8c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V7z"
        ></path>
      </svg>
    </span>
    <span className="ml-2 text-sm tracking-wide truncate">Crear Categorias</span>
  </button>
</li>


            <div className="flex flex-row items-center h-8">
              <div className="text-sm font-light tracking-wide text-gray-500 pl-5">
                Centro deportivos y clientes
              </div>
            </div>
            <li>
              <button
                onClick={() => onMenuClick && onMenuClick("centers")}
                className="relative flex flex-row items-center h-11 focus:outline-none text-gray-600 hover:text-white -l-4 border-transparent hover:border-yellow-400 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                    ></path>
                  </svg>
                  <span className="ml-2 text-sm tracking-wide truncate">
                    Centros Deportivos
                  </span>
                </span>
              </button>
            </li>

            <li>
              <button
                onClick={() => onMenuClick && onMenuClick("clientes")}
                className="relative flex flex-row items-center h-11 focus:outline-none text-gray-600 hover:text-white -l-4 border-transparent hover:border-yellow-400 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    ></path>
                  </svg>
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">
                  Clientes
                </span>
              </button>
            </li>
            <li className="px-5">
              <div className="flex flex-row items-center h-8">
                <div className="text-sm font-light tracking-wide text-gray-500">
                  Cuenta
                </div>
              </div>
            </li>
            <li>
              <button
                onClick={() => onMenuClick("settings")}
                className="relative flex flex-row items-center h-11 focus:outline-none text-gray-600 hover:text-white -l-4 border-transparent hover:border-yellow-400 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0="
                    />
                  </svg>
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">
                  Configuración
                </span>
              </button>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="relative flex flex-row items-center h-11 focus:outline-none text-gray-600 hover:text-white -l-4 border-transparent hover:border-yellow-400 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 12h14M12 5l7 7-7 7"
                    ></path>
                  </svg>
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">
                  Cerrar sesión
                </span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
