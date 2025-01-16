"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/navbar/navbar";
import MSidebar from "@/components/managerSidebar/managerSidebar";
import UbicacionView from "@/views/Ubicacion/ubicacion.view";
import PanelView from "@/views/Panel/PanelView";
import CanchasView from "@/views/Canchas/CanchasViews";
import ReservacionesViews from "@/views/reservaciones/reservacionesViews";
import PremiumCard from "@/views/PremiumCard/PremiumCard";
import { useLocalStorage } from "@/helpers/auth/useLocalStorage";
import { IUser } from "@/types/zTypes";
import { UserRole } from "@/enum/userRole";
import { useRouter } from "next/navigation";

// Define view types for better type safety
export type ViewName =
  | "panel"
  | "Ubicacion"
  | "canchas"
  | "reservaciones"
  | "premiumCard";

const VIEWS: Record<ViewName, React.ComponentType> = {
  panel: PanelView,
  Ubicacion: UbicacionView,
  canchas: CanchasView,
  reservaciones: ReservacionesViews,
  premiumCard: PremiumCard,
};

const ManagerPage = () => {
  const router = useRouter();
  const [currentView, setCurrentView] = useState<ViewName>("panel");
  const [sidebarWidth, setSidebarWidth] = useState<number>(250); // Ancho inicial en píxeles
  const [user, setUser] = useLocalStorage<IUser | null>("userSession", null);
  // Estado para manejar la altura del sidebar
  const [sidebarHeight, setSidebarHeight] = useState<number>(0); // Altura inicial igual al alto de la ventana
  const [isMounted, setIsMounted] = useState(false);

  const handleMenuClick = (viewName: ViewName) => {
    setCurrentView(viewName);
  };

  const updateSidebarDimensions = () => {
    if (typeof window === "undefined") return;

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

  useEffect(() => {
    const checkUserSession = () => {
      // const storedUser = JSON.parse(localStorage.getItem("userSession") || "null");
      // if (!storedUser || storedUser.user.role !== UserRole.MAIN_MANAGER) {
      //   router.push("/login?from=out_session");
      //   return;
      // }
      // setUser(storedUser); // Asegurarse de que el estado de usuario esté sincronizado con localStorage
      setIsMounted(true);
      updateSidebarDimensions();
    };

    checkUserSession();
    const handleResize = () => {
      window.requestAnimationFrame(updateSidebarDimensions);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [user?.token, user?.user.role]);

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <h1>No se monto el componente</h1>
      </div>
    );
  }

  const CurrentViewComponent = VIEWS[currentView];

  // if (
  //   user?.user === undefined ||
  //   user?.user.role === UserRole.ADMIN ||
  //   user?.user.role === UserRole.USER
  // ) {
  //   window.location.href = "/";
  //   return <div className="flex min-h-screen"></div>;
  // }

  if (user?.user === undefined || (user?.user.role !== UserRole.MAIN_MANAGER && user?.user.role !== UserRole.MANAGER)) {
    window.location.href = "/";
    return (<div className="flex min-h-screen"></div>);

  }

  return (
    <div className="flex min-h-screen bg-black">
      <div
        className="bg-gray-800 transition-all duration-300"
        style={{ width: sidebarWidth, height: sidebarHeight }}
      >
        <MSidebar onMenuClick={handleMenuClick} />
      </div>

      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="flex-1 overflow-auto p-6">
          <CurrentViewComponent />
        </main>
      </div>
    </div>
  );
};

export default ManagerPage;
