"use client";
import React, { useCallback, useEffect, useState } from "react";
import { CheckCircle, Send } from "lucide-react";
import ImageCarousel from "./ImageCarousel";
import SportCenterDetails from "./sportCenter.details";
import { ISportCenter } from "@/interfaces/sport_center.interface";
import { fetchWithAuth } from "@/helpers/errors/fetch-with-token-interceptor";
import { API_URL } from "@/config/config";
import { SportCenterStatus } from "@/enum/sportCenterStatus";

interface StoredImage {
  id: string;
  dataUrl: string;
  fileName: string;
  fileType: string;
  fileSize: number;
}

interface SportCenterCardProps {
  sportCenter: ISportCenter;
  onPublish: (id: string) => void;
  onImageUpload: (file: File) => void;
  onUpdateSuccess: () => void;
  isPublishing:boolean
}

const ManagerSportCenterCard: React.FC<SportCenterCardProps> = ({
  sportCenter,
  onPublish,
  onImageUpload,
  onUpdateSuccess,
  isPublishing
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [pendingImages, setPendingImages] = useState<StoredImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handlePublish = () => {
    console.log('sportcenterid',sportCenter.id);
  
    onPublish(sportCenter.id);
  };

  // Sincronizar imágenes pendientes con el estado local
  useEffect(() => {
    const storedImages = JSON.parse(
      localStorage.getItem("pendingImages") || "[]"
    );
    setPendingImages(storedImages);
    setIsLoading(false);
  }, []);

  const handlePendingImagesChange = useCallback((images: StoredImage[]) => {
    setPendingImages(images);
  }, []);

  const handleSave = useCallback(async () => {
    const storedImages: StoredImage[] = JSON.parse(
      localStorage.getItem("pendingImages") || "[]"
    );
    console.log("storedImages", storedImages);

    if (storedImages.length === 0) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      const imageFiles = await Promise.all(
        storedImages.map(async (img) => {
          const response = await fetch(img.dataUrl);
          const blob = await response.blob();
          return new File([blob], img.fileName, { type: img.fileType });
        })
      );

      imageFiles.forEach((file) => {
        formData.append("images", file);
      });

      await fetchWithAuth(`${API_URL}/upload/sport-center/${sportCenter.id}`, {
        method: "PUT",
        body: formData,
      });

      // Clear local storage after successful upload
      localStorage.removeItem("pendingImages");
      setPendingImages([]);

      // Refresh sport center data
      onUpdateSuccess();
    } catch (error) {
      console.error("Error uploading images:", error);
    } finally {
      setIsUploading(false);
    }
  }, [sportCenter.id, onUpdateSuccess]);

  // Filtrar fotos vacías o inválidas
  const validPhotos =
    sportCenter?.photos?.filter(
      (photo) => photo && photo.image_url.trim() !== ""
    ) || [];

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        <ImageCarousel
          images={validPhotos}
          pendingImages={pendingImages}
          onImageUpload={onImageUpload}
          onPendingImagesChange={handlePendingImagesChange}
          isLoading={isLoading}
        />
        <div className="absolute top-4 right-4 flex gap-2">
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
            sportCenter.status === "draft" ? 'bg-gray-100 text-gray-800' : 'bg-green-100 text-green-800'
          }`}>
            {sportCenter.status === "draft" ? "Borrador" : "Publicado"}
          </span>
          {pendingImages.length > 0 && (
            <button
              onClick={handleSave}
              disabled={isUploading}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                isUploading
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              <span>{isUploading ? "Guardando..." : "Guardar Imágenes"}</span>
            </button>
          )}
       {sportCenter.status === SportCenterStatus.DRAFT && (
            <button
              onClick={handlePublish}
              disabled={isPublishing}
              className="px-3 py-1 rounded-md text-sm font-medium bg-yellow-600 text-white hover:bg-yellow-700 flex items-center"
            >
              <Send className="w-4 h-4 mr-2" />
              {isPublishing ? "Publicando..." : "Publicar"}
            </button>
          )}
          {sportCenter.status === SportCenterStatus.PUBLISHED && (
            <CheckCircle className="w-6 h-6 text-green-500" />
          )}
        </div>
      </div>

      <SportCenterDetails
        id={sportCenter?.id}
        name={sportCenter?.name}
        address={sportCenter?.address}
        averageRating={sportCenter?.averageRating || 0}
        schedules={sportCenter?.schedules || []}
        onUpdateSuccess={onUpdateSuccess}
      />
    </div>
  );
};

export default ManagerSportCenterCard;
