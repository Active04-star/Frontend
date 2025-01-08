"use client";
import ManagerSportCenterCard from "@/components/SportCenterCard/sportCenterCard.managerVIew";
import { useLocalStorage } from "@/helpers/auth/useLocalStorage";
import { ISportCenter } from "@/interfaces/sport_center.interface";
import { API_URL } from "@/config/config";
import React, { useState, useEffect, useCallback } from "react";
import { fetchWithAuth } from "@/helpers/errors/fetch-with-token-interceptor";

const PanelView: React.FC = () => {
  const [userLocalStorage] = useLocalStorage("userSession", null);
  const { token, user } = userLocalStorage || { token: null, user: null };
  const [sportCenter, setSportCenter] = useState<ISportCenter | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSportCenter = useCallback(async () => {
    if (!user?.id || !token) return;
    console.log("token", token, "user", user);

    try {
      const response = await fetchWithAuth(
        `${API_URL}/manager/center/${user.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setSportCenter(response);
    } catch (error) {
      console.error("Error fetching sport center:", error);
    } finally {
      setIsLoading(false);
    }
  }, [user?.id]);

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
      <div className="min-h-screen pt-20 text-white text-center">
        Cargando...
      </div>
    );
  }

  return (
    <div className="min-h-screen  pt-20">
      
      <div className="max-w-2xl mx-auto pt-5">
        {sportCenter ? (
          <ManagerSportCenterCard
            sportCenter={sportCenter}
            onPublish={handlePublish}
            onImageUpload={handleImageUpload}
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
