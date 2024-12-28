import React from "react";
import MSidebar from "@/components/managerSidebar/managerSidebar";

const ManagerView: React.FC = () => {

  // Definimos la función que se pasará a onMenuClick
  const handleMenuClick = (viewName: string) => {
    console.log("Vista seleccionada:", viewName);
    // agregar la lógica que necesites para cambiar de vista
  };

  return (
    <MSidebar onMenuClick={handleMenuClick} />
  );
};
  
export default ManagerView;
