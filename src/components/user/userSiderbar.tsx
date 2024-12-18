import React from "react";

const Userbar: React.FC<{ onMenuClick: (viewName: string) => void }> = ({ onMenuClick }) => {
  return (
    <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-gray-50 text-gray-800">
      <div className="sticky flex flex-col top-0 left-0 w-64 bg-white h-full border-r">
        <div className="flex items-center justify-center h-14 border-b"></div>
        <div className="overflow-y-auto overflow-x-hidden flex-grow">
          <ul className="flex flex-col py-4 space-y-1">
            {/* Menu Item "Panel" */}
            <li>
              <button
              
                onClick={() => onMenuClick("panel")}
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
                onClick={() => onMenuClick("Notificaciones")}
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
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Userbar;
