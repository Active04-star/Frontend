"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/navbar/navbar"; // Barra de navegación
import MSidebar from "@/components/managerSidebar/managerSidebar"; // Sidebar del administrador
import NotificacionesView from "@/views/Notificaciones/NotificacionesView"; // Vista de Notificaciones
import PanelView from "@/views/Panel/PanelView"; // Vista del Panel Principal
import CanchasView from "@/views/Canchas/CanchasViews"; // Vista de las canchas
import ReservacionesViews from "@/views/reservaciones/reservacionesViews"; // Vista de Reservaciones
import PerfilView from "@/views/configuracionViews/configuracionViews"; // Vista de Configuración
import SettingsView from "@/views/SettingsView/SettingsView";
import PremiumCard from "@/views/PremiumCard/PremiumCard";
import { useLocalStorage } from "@/helpers/auth/useLocalStorage";

const ManagerPage = () => {
  

  // Estado para manejar la vista actual
  const [currentView, setCurrentView] = useState<string>("panel");

  // Estado para manejar el ancho del sidebar
  const [sidebarWidth, setSidebarWidth] = useState<number>(250); // Ancho inicial en píxeles

  // Estado para manejar la altura del sidebar
  const [sidebarHeight, setSidebarHeight] = useState<number>(0); // Altura inicial igual al alto de la ventana

  // Función para manejar el clic en los elementos del menú del sidebar
  const handleMenuClick = (viewName: string) => {
    setCurrentView(viewName); // Cambia la vista activa al hacer clic en un elemento del menú
  };

  // Ajustar automáticamente el ancho y la altura del sidebar en función del tamaño de la ventana
  const updateSidebarDimensions = () => {
    const width = window.innerWidth; // Obtener el ancho de la ventana
    const height = window.innerHeight; // Obtener la altura de la ventana
    if (width < 768) {
      setSidebarWidth(200); // Si el ancho de la ventana es pequeño, ajustar el sidebar a 200px
    } else if (width < 1024) {
      setSidebarWidth(250); // Si el ancho de la ventana es mediano, ajustar el sidebar a 250px
    } else {
      setSidebarWidth(300); // Si el ancho de la ventana es grande, ajustar el sidebar a 300px
    }

    setSidebarHeight(height); // Ajustar la altura del sidebar igual al alto de la ventana
  };

  // Efecto para actualizar el tamaño del sidebar (ancho y alto) al cambiar el tamaño de la ventana
  useEffect(() => {
    // Llamamos a la función para establecer el tamaño inicial del sidebar
    updateSidebarDimensions();

    // Agregar evento para escuchar cambios en el tamaño de la ventana
    window.addEventListener("resize", updateSidebarDimensions);

    // Limpiar el evento cuando el componente se desmonta
    return () => {
      window.removeEventListener("resize", updateSidebarDimensions);
    };
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar con los links del menú */}
      <div
        className="bg-gray-800"
        style={{ width: sidebarWidth, height: sidebarHeight }} // El ancho y la altura se ajustan dinámicamente
      >
        <MSidebar onMenuClick={handleMenuClick} />
      </div>

      {/* Navbar */}
      <Navbar />

      {/* Contenido principal que cambia según la vista seleccionada */}
      <div className="w-full h-full overflow-auto">
        {currentView === "panel" && <PanelView />}

        {currentView === "Notificaciones" && <NotificacionesView />}

        {currentView === "canchas" && <CanchasView />}

        {currentView === "reservaciones" && <ReservacionesViews />}

        {currentView === "settings" && <SettingsView />}

        {currentView === "perfil" && <PerfilView />}

        {currentView === "premiumCard" && <PremiumCard />}
      </div>
    </div>
  );
};

export default ManagerPage;
