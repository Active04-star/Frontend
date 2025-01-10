"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/navbar/navbar";
import Sidebar from "@/components/adminSidebar/adminSidebar";
import SettingsView from "@/views/SettingsView/SettingsView";
import UserList from "@/components/userList/userList";
import AdminSportCentersView from "@/views/AdminSportCentersView/AdminSportCentersView";

export type ViewName = "settings" | "centroDepotivos" | "clientes";

const VIEWS: Record<ViewName, React.ComponentType> = {
  settings: SettingsView,
  centroDepotivos: AdminSportCentersView,  
  clientes: UserList,
};

const Admin = () => {

  const [currentView, setCurrentView] = useState<ViewName>("settings"); 
  const [sidebarWidth, setSidebarWidth] = useState<number>(250); 
  const [sidebarHeight, setSidebarHeight] = useState<number>(0); 
  const [isMounted, setIsMounted] = useState(false);

  const handleMenuClick = (viewName: ViewName) => {
    setCurrentView(viewName);
  };

  useEffect(() => {
    setIsMounted(true);
    const handleResize = () => {
      window.requestAnimationFrame(() => {
        if (typeof window === "undefined") return;
        const width = window.innerWidth;
        const height = window.innerHeight;

        if (width < 768) setSidebarWidth(200);
        else if (width < 1024) setSidebarWidth(250);
        else setSidebarWidth(300);
        
        setSidebarHeight(height);
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  const CurrentViewComponent = VIEWS[currentView];

  return (
    <div className="flex min-h-screen bg-black">
      <div
        className="bg-gray-800 transition-all duration-300"
        style={{ width: sidebarWidth, height: sidebarHeight }}
      >
        <Sidebar onMenuClick={handleMenuClick} />
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

export default Admin;
