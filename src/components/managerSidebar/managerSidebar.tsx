import React from "react";
import { logout } from "@/helpers/auth/logout";
import Link from "next/link";
import { ViewName } from "@/app/manager/page";

const MSidebar: React.FC<{ onMenuClick: (viewName: ViewName) => void }> = ({
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
            {/* Menu Item "Panel" */}
            <li className="px-5">
              <div className="flex flex-row items-center h-8">
                <div className="text-sm font-light tracking-wide text-gray-500">
                  Menu
                </div>
              </div>
            </li>
            <li>
              <button
                onClick={() => onMenuClick && onMenuClick("panel")}
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
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    ></path>
                  </svg>
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">
                  Panel
                </span>
              </button>
            </li>
            {/* Menu Item "Notificaciones" */}
            <li>
              <button
                onClick={() => onMenuClick && onMenuClick("Ubicacion")}
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
                      d="M9 20l-5.447-2.724A2 2 0 013 15.382V6.618a2 2 0 011.553-1.894L9 2l6 2.724 5.447-2.724A2 2 0 0121 6.618v8.764a2 2 0 01-1.553 1.894L15 20l-6-2.724L9 20z"
                    ></path>
                  </svg>
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">
                  Ubicacion
                </span>
              </button>
            </li>

            <li className="px-5">
              <div className="flex flex-row items-center h-8">
                <div className="text-sm font-light tracking-wide text-gray-500">
                  Mis canchas
                </div>
              </div>
            </li>

            {/* Menu Item "Canchas" */}
            <li>
              <button
                onClick={() => onMenuClick("canchas")}
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
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">
                  Canchas
                </span>
              </button>
            </li>

            {/* Menu Item "Reservaciones" */}
            <li>
              <button
                onClick={() => onMenuClick("reservaciones")}
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
                  Reservaciones
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
                onClick={() => onMenuClick("premiumCard")}
                className="relative flex flex-row items-center h-11 focus:outline-none text-gray-600 hover:text-white -l-4 border-transparent hover:border-yellow-400 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.77 5.82 22l1.09-7.86-5-4.87 6.91-1.01L12 2z"></path>
                  </svg>
                </span>

                <span className="ml-2 text-sm tracking-wide truncate">
                  Pásate a premium
                </span>
              </button>
            </li>
            {/* Menu Item "Cerrar sesión" */}
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

export default MSidebar;
