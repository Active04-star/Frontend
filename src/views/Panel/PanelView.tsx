"use client";
import ManagerSportCenterCard from "@/components/SportCenterCard/sportCenterCard.managerVIew";
import { useLocalStorage } from "@/helpers/auth/useLocalStorage";
import { ISportCenter } from "@/interfaces/sport_center.interface";
import { API_URL } from "@/config/config";
import React, { useState, useEffect, useCallback } from "react";
import { fetchWithAuth } from "@/helpers/errors/fetch-with-token-interceptor";
import { IUser } from "@/types/zTypes";
import { SportCenterStatus } from "@/enum/sportCenterStatus";
import { swalNotifySuccess } from "@/helpers/swal/swal-notify-success";
import { swalConfirmation } from "@/helpers/swal/swal-notify-confirm";
import { swalCustomError } from "@/helpers/swal/swal-custom-error";
import { swalNotifyError } from "@/helpers/swal/swal-notify-error";

const PanelView: React.FC = () => {
  const [userLocalStorage] = useLocalStorage<IUser | null>("userSession", null);
  const [sportCenter, setSportCenter] = useState<ISportCenter | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPublishing, setIsPublishing] = useState(false);

  const fetchSportCenter = useCallback(async () => {
    console.log("user", userLocalStorage);

    if (!userLocalStorage?.user?.id) return;
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
      console.log("sportcenter", response);

      setSportCenter(response);
    } catch (error) {
      console.error("Error fetching sport center:", error);
    } finally {
      setIsLoading(false);
    }
  }, [userLocalStorage]);

  useEffect(() => {
    fetchSportCenter();
  }, [fetchSportCenter]);

  const handlePublish = async (id: string) => {
    setIsPublishing(true);
    console.log('id', id);
  
    try {
      await fetchWithAuth(
        `${API_URL}/manager/sportcenter/publish/${sportCenter?.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      setSportCenter((prevState) => ({
        ...prevState!,
        status: SportCenterStatus.PUBLISHED,
      }));
  
      swalConfirmation("Centro deportivo publicado exitosamente");
    } catch (error) {
      // Aquí puedes usar el tipo de error más específico
      if (error instanceof Error) {
        console.error("Error publishing sport center:", error);
        swalNotifyError(error.message);  // Error.message o cualquier otra propiedad que necesites
      } else {
        console.error("Unexpected error:", error);
        swalNotifyError("Error desconocido al publicar el centro deportivo.");
      }
    } finally {
      setIsPublishing(false);
    }
  };
  

  const handleImageUpload = (file: File) => {
    console.log("Uploading image:", file);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="w-full max-w-4xl mx-auto">
        {sportCenter ? (
          <ManagerSportCenterCard
            sportCenter={sportCenter}
            onPublish={handlePublish}
            onImageUpload={handleImageUpload}
            onUpdateSuccess={fetchSportCenter}
            isPublishing={isPublishing}
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
