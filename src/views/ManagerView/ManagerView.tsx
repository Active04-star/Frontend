import React from "react";
import MSidebar from "@/components/managerSidebar/managerSidebar";

const ManagerView: React.FC = () => {
  const handleMenuClick = (viewName: string) => {
    console.log(`Navigating to ${viewName}`);
    // Aquí puedes manejar la lógica de navegación o actualización del estado
  };

  return (
    <MSidebar onMenuClick={handleMenuClick} />
  );
};

export default ManagerView;
