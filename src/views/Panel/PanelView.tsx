"use client"
import ManagerSportCenterCard from "@/components/SportCenterCard/sportCenterCard.managerVIew";
import { useLocalStorage } from "@/helpers/auth/useLocalStorage";
import { ISportCenter } from "@/interfaces/sport_center.interface";
import { API_URL } from "@/config/config";
import React, { useState, useEffect, useCallback } from "react";
import { fetchWithAuth } from "@/helpers/errors/fetch-with-token-interceptor";
import { UserSchemaWToken } from "@/types/user-schema";
import { zodValidate } from "@/helpers/validate-zod";
import { UserRole } from "@/enum/userRole";
import LoadingCircle from "@/components/general/loading-circle";
import { IUser } from "@/types/zTypes";

const PanelView: React.FC = () => {
  const [user] = useLocalStorage<IUser | null>("userSession", null);
  const [sportCenter,] = useLocalStorage("sportCenter", "");
  const [center, setCenter] = useState<ISportCenter | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSportCenter = useCallback(async () => {
    if (typeof window !== "undefined") {
      const validate = zodValidate(user, UserSchemaWToken);
      // const validate_center = zodValidate(sportCenter, z.string().uuid());

      if (validate.success && sportCenter !== "" && user !== null) {
        if (user.user.role === UserRole.MAIN_MANAGER || user.user.role === UserRole.MANAGER) {

          try {

            const response = await fetchWithAuth(`${API_URL}/sportcenter/${sportCenter}`, { method: "GET" });
            console.log(response)
            setCenter(response);
            setIsLoading(false);
          } catch (error) {
            console.error(error);

          }

        } else {
          // window.location.href = "/";
        }

      } else {
        console.error("user localStorage is invalid format", validate.errors);
        window.location.href = "/";

      }
    }

  }, [user]);

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
        {center ? (
          <ManagerSportCenterCard
            sportCenter={center}
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