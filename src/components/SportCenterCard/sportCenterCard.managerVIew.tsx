import React, { useState } from 'react';
import { Send } from 'lucide-react';
import ImageCarousel from './ImageCarousel';
import SportCenterDetails from './sportCenter.details';
import { ISportCenter } from '@/interfaces/sport_center.interface';
import { fetchWithAuth } from '@/helpers/errors/fetch-with-token-interceptor';
import { API_URL } from '@/config/config';

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

}

const ManagerSportCenterCard: React.FC<SportCenterCardProps>=({
  sportCenter,
  onPublish,
  onImageUpload,
  onUpdateSuccess
})=> {
  const [isUploading, setIsUploading] = useState(false);

  const handlePublish = () => {
    onPublish(sportCenter.id);
  };

  const handleSave = async () => {
    const storedImages: StoredImage[] = JSON.parse(localStorage.getItem('pendingImages') || '[]');
    console.log('storedImages', storedImages);

    if (storedImages.length === 0) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      const imageFiles = await Promise.all(storedImages.map(async (img) => {
        const response = await fetch(img.dataUrl);
        const blob = await response.blob();
        return new File([blob], img.fileName, { type: img.fileType });
      }));


      imageFiles.forEach((file) => {
        formData.append('images', file); // Aquí usamos el mismo nombre 'images'
      });

      await fetchWithAuth(`${API_URL}/upload/sport-center/${sportCenter.id}`, {
        method: 'PUT',
        body: formData,
      });

      // Clear local storage after successful upload
      localStorage.removeItem('pendingImages');
      
      // Refresh sport center data
      onUpdateSuccess();
    } catch (error) {
      console.error('Error uploading images:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        <ImageCarousel
          images={sportCenter?.photos?.map((photo) => photo.image_url) || []} // Usa las URL de las imágenes
          onImageUpload={onImageUpload}
        />
          <div className="absolute top-4 right-4 flex gap-2">
          {JSON.parse(localStorage.getItem('pendingImages') || '[]').length > 0 && (
            <button
              onClick={handleSave}
              disabled={isUploading}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                isUploading
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              <span>{isUploading ? 'Guardando...' : 'Guardar Imágenes'}</span>
            </button>
          )}
          {sportCenter?.status === 'draft' && (
            <button
              onClick={handlePublish}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
            >
              <Send className="w-4 h-4" />
              <span>Publicar</span>
            </button>
          )}
        </div>
      </div>

      <SportCenterDetails
        name={sportCenter?.name}
        address={sportCenter?.address}
        averageRating={sportCenter?.averageRating || 0}
        schedules={sportCenter?.schedules   || []}
      />
    </div>
  );
}


export default ManagerSportCenterCard