// src/views/Panel/PanelView.tsx
"use client"
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 pt-20">
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
