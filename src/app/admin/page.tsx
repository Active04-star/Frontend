"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/navbar/navbar";
import Sidebar from "@/components/adminSidebar/adminSidebar";
import SettingsView from "@/views/SettingsView/SettingsView";
import UserList from "@/components/userList/userList";
import AdminSportCentersView from "@/views/AdminSportCentersView/AdminSportCentersView";
import { useLocalStorage } from "@/helpers/auth/useLocalStorage";
import { IUser } from "@/types/zTypes";
import { UserRole } from "@/enum/userRole";
import ManagerPremium from "@/components/managerPremium/managerPremium";
import InicioView from "@/views/inicioView/inicioView";
import verifyUser from "@/helpers/auth/illegalUserVerify";
import RegisterAdminView from "@/views/RegisterAdminView/RegisterAdminView";

export type ViewName = "settings" | "centers" | "clientes" | "managers" | "inicio" | "newadmin";
const validViewNames: ViewName[] = ["settings", "centers", "clientes", "managers", "inicio", "newadmin"];

const isValidViewName = (value: string): value is ViewName => {
  return validViewNames.includes(value as ViewName);
};

const VIEWS: Record<ViewName, React.ComponentType<{ onCardClick?: (viewName: ViewName) => void }>> = {
  settings: SettingsView,
  centers: AdminSportCentersView,
  clientes: UserList,
  managers: ManagerPremium,
  newadmin: RegisterAdminView,
  inicio: ({ onCardClick }) => <InicioView onCardClick={onCardClick!} />,
};

const Admin = () => {

  const [user] = useLocalStorage<IUser | null>("userSession", null);
  const [currentView, setCurrentView] = useState<ViewName>("inicio");
  const [sidebarWidth, setSidebarWidth] = useState<number>(250);
  const [sidebarHeight, setSidebarHeight] = useState<number>(0);
  const [isMounted, setIsMounted] = useState(false);

  const handleMenuClick = (viewName: ViewName) => {
    // setCurrentView(viewName);
    const searchParams = new URLSearchParams({
      view: viewName,
    });

    if (viewName === "centers") {
      searchParams.append("page", "1");
      searchParams.append("search", "");
      searchParams.append("limit", "9");
      searchParams.append("rating", "0");
    } else if (viewName === "clientes") {
      searchParams.append("page", "1");
      searchParams.append("search", "");
      searchParams.append("limit", "9");
    }

    window.location.href = `/admin?${searchParams.toString()}`;
  };

  const verify = async () => {
    try {
      await verifyUser();
    } catch (error: any) {
      console.error(error);
    }

    const queryString = new URLSearchParams(window.location.search);
    const queryParams: any = Object.fromEntries(queryString.entries());

    if (queryParams.view !== undefined && isValidViewName(queryParams.view)) {
      setCurrentView(queryParams.view);
    } else {
      setCurrentView("inicio");
    }
  };

  useEffect(() => {
    setIsMounted(true);
    verify();

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


  if (user?.user === undefined || (user?.user.role !== UserRole.ADMIN && user?.user.role !== UserRole.SUPER_ADMIN)) {
    window.location.href = "/";
    return (<div className="flex min-h-screen"></div>);

  }

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
          <CurrentViewComponent onCardClick={handleMenuClick} />
        </main>
      </div>
    </div>
  );
};

export default Admin;
