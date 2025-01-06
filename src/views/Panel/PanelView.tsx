// src/views/Panel/PanelView.tsx
import ManagerSportCenterCard from "@/components/SportCenterCard/sportCenterCard.managerVIew";
import { useLocalStorage } from "@/helpers/auth/useLocalStorage";
import React from "react";

const PanelView: React.FC = () => {
  const [user] = useLocalStorage("userSession", null);
  const [center] = useLocalStorage("sportCenter", null);

  const handlePublish = (id: string) => {
    console.log("Publishing sport center:", id);
  };

  const handleImageUpload = (file: File) => {
    console.log("Uploading image:", file);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 pt-20 bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100">
      {/* Título del panel */}
      <h1 className="text-4xl font-semibold text-center text-indigo-700 mb-6">
        Bienvenido al Panel
      </h1>
      <div className="max-w-2xl mx-auto pt-5">
        <ManagerSportCenterCard
          sportCenter={center}
          onPublish={handlePublish}
          onImageUpload={handleImageUpload}
        />
      </div>
    </div>
  );
};

export default PanelView;
