import React from 'react';
import { Send } from 'lucide-react';
import ImageCarousel from './ImageCarousel';
import SportCenterDetails from './sportCenter.details';
import { ISportCenter } from '@/interfaces/sport_center.interface';



interface SportCenterCardProps {
  sportCenter: ISportCenter;
  onPublish: (id: string) => void;
  onImageUpload: (file: File) => void;
}

const ManagerSportCenterCard: React.FC<SportCenterCardProps>=({
  sportCenter,
  onPublish,
  onImageUpload,
})=> {
  const handlePublish = () => {
    onPublish(sportCenter.id);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        <ImageCarousel
          images={sportCenter.photos || []}
          onImageUpload={onImageUpload}
        />
        {sportCenter.status === 'draft' && (
          <button
            onClick={handlePublish}
            className="absolute top-4 right-4 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
          >
            <Send className="w-4 h-4" />
            <span>Publicar</span>
          </button>
        )}
      </div>

      <SportCenterDetails
        name={sportCenter.name}
        address={sportCenter.address}
        averageRating={sportCenter.averageRating || 0}
        fieldsCount={sportCenter.fields?.length || 0}
        sportCategories={sportCenter.sportCategories || []}
      />
    </div>
  );
}


export default ManagerSportCenterCard