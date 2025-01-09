"use client";
import ManagerSportCenterCard from "@/components/SportCenterCard/sportCenterCard.managerVIew";
import { useLocalStorage } from "@/helpers/auth/useLocalStorage";
import { ISportCenter } from "@/interfaces/sport_center.interface";
import { API_URL } from "@/config/config";
import React, { useState, useEffect, useCallback } from "react";
import { fetchWithAuth } from "@/helpers/errors/fetch-with-token-interceptor";
import { IUser } from "@/types/zTypes";


const PanelView: React.FC = () => {
  const [userLocalStorage] = useLocalStorage<IUser | null>("userSession", null);
  const [sportCenter, setSportCenter] = useState<ISportCenter | null>(null);
  const [isLoading, setIsLoading] = useState(true);


  const fetchSportCenter = useCallback(async () => {
    console.log('user',userLocalStorage);
    
    if (!userLocalStorage?.user?.id ) return;
    try {
      const response = await fetchWithAuth(
        `${API_URL}/manager/center/${userLocalStorage.user.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
console.log('sportcenter',response);

      setSportCenter(response);
    } catch (error) {
      console.error("Error fetching sport center:", error);
    } finally {
      setIsLoading(false);
    }
  }, [userLocalStorage?.user?.id]);




  useEffect(() => {
    fetchSportCenter();
  }, [fetchSportCenter]);

  const handlePublish = (id: string) => {
    console.log("Publishing sport center:", id);
  };

  const handleImageUpload = (file: File) => {
    console.log("Uploading image:", file);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 pt-20 text-white text-center">
        Cargando...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 pt-20">
      <h1 className="text-4xl font-semibold text-center text-indigo-700 mb-6">
        Bienvenido al Panel
      </h1>
      <div className="w-full max-w-4xl mx-auto">
        {sportCenter ? (
          <ManagerSportCenterCard
            sportCenter={sportCenter}
            onPublish={handlePublish}
            onImageUpload={handleImageUpload}
            onUpdateSuccess={fetchSportCenter}

          />
        ) : (
          <div className="text-center text-white text-lg">
            No existe el centro deportivo.
          </div>
        )}
      </div>
    </div>
  );
};

export default PanelView;
