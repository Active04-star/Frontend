"use client";

import React, { useState } from "react";
import Navbar from "@/components/navbar/navbar";  // Barra de navegación
import CanchasView from "@/views/Canchas/CanchasViews";  // Vista de las canchas
import ReservacionesViews from "@/views/reservaciones/reservacionesViews";  // Vista de Reservaciones
import ProfileView from "@/views/PerfilViews/PerfilView";  // Vista del Perfil de Usuario
import PerfilView from "@/views/configuracionViews/configuracionViews";  // Vista de Configuración
import Userbar from "@/components/user/userSiderbar";
import UserBar from "@/views/UserView/UserView";

const ManagerPage = () => {
  // Estado para manejar la vista actual
  const [currentView, setCurrentView] = useState<string>("");

    // Función para manejar el clic en los elementos del menú del sidebar
    const handleMenuClick = (viewName: string) => {
      setCurrentView(viewName);  // Cambia la vista activa al hacer clic en un elemento del menú
    };

    return (
      <div className="flex min-h-screen">
        {/* Sidebar con los links del menú */}
        
        <Userbar onMenuClick={handleMenuClick} />

        {/* Navbar */}
        <Navbar />

        {/* Contenido principal que cambia según la vista seleccionada */}

        {currentView === "panel" && (
          <div className="w-full h-140 overflow-auto">
            {/* Vista del Panel */}
            <UserBar/>
          </div>
      )}

      {currentView === "Notificaciones" && (
        <div className="w-full h-140 overflow-auto">
          {/* Vista de Notificaciones */}
          <UserBar />
        </div>
      )}

      {currentView === "canchas" && (
        <div className="w-full h-140 overflow-auto">
          {/* Vista de Canchas */}
          <CanchasView />
        </div>
      )}

      {currentView === "reservaciones" && (
        <div className="w-full h-140 overflow-auto">
          {/* Vista de Reservaciones */}
          <ReservacionesViews />
        </div>
      )}

      {currentView === "perfil" && (
        <div className="w-full h-140 overflow-auto">
          {/* Vista de Perfil de Usuario */}
          <ProfileView />
        </div>
      )}

      {currentView === "configuracion" && (
        <div className="w-full h-140 overflow-auto">
          {/* Vista de Configuración */}
          <PerfilView />
        </div>
      )}
    </div>
  );
};

export default ManagerPage;
