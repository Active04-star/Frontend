import React from "react";
import { logout } from "@/helpers/auth/logout";
import Link from "next/link";

const MSidebar: React.FC<{ onMenuClick: (viewName: string) => void }> = ({ onMenuClick }) => {

  const handleLogout = () => {
    
    localStorage.removeItem("userSession");

    logout(true);
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



            <li>
              <button
              >
                <span className="inline-flex justify-center items-center ml-4">
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">Mis Canchas</span>
              </button>
            </li>


            {/* Menu Item "Canchas" */}
            <li>
              <button
                onClick={() => onMenuClick("canchas")}
                className="relative flex flex-row items-center h-11 focus:outline-none text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-yellow-400 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                  </svg>
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">Canchas</span>
              </button>
            </li>

            {/* Menu Item "Reservaciones" */}
            <li>
              <button
                onClick={() => onMenuClick("reservaciones")}
                className="relative flex flex-row items-center h-11 focus:outline-none text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-yellow-400 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                  </svg>
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">Reservaciones</span>
              </button>
            </li>



            <li>
              <button
              >
                <span className="inline-flex justify-center items-center ml-4">
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">Cuenta</span>
              </button>
            </li>


            {/* Menu Item "Perfil" */}
            <li>
              <button
                onClick={() => onMenuClick("perfil")}
                className="relative flex flex-row items-center h-11 focus:outline-none text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-yellow-400 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">Perfil</span>
              </button>
            </li>
            <li>
  <button onClick={()=>onMenuClick('premiumCard')}

    className="relative flex flex-row items-center h-11 focus:outline-none text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-yellow-400 pr-6"
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
    
    <span className="ml-2 text-sm tracking-wide truncate">Pásate a premium</span>
  </button>

</li>

            {/* Menu Item "Configuración" */}
            <li>
              <button
                onClick={() => onMenuClick("settings")}
                className="relative flex flex-row items-center h-11 focus:outline-none text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-yellow-400 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0=" />
                  </svg>
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">Configuración</span>
              </button>
            </li>

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
