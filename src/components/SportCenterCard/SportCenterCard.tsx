import React from 'react';
import Image from 'next/image';
import { ISportCenter } from '@/interfaces/SportCenter_Interface';

const SportCenterCard: React.FC<ISportCenter> = ({
  name,
  address,
  averageRating,
  photos,
  main_manager,
}) => {
  return (
    <div className="flex flex-col bg-white shadow-md rounded-xl p-3 w-full h-full">
      {/* Imagen */}
      <div className="relative w-full h-32 md:h-40">
        <Image
          src={photos[0]?.imageUrl || '/placeholder-image.jpg'}
          alt={name}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
      </div>

      {/* Contenido */}
      <div className="flex flex-col flex-1 p-2">
        <h2 className="text-md font-semibold text-gray-800 truncate">{name}</h2>
        <p className="text-xs text-gray-500 truncate">{address}</p>
        <p className="text-xs text-gray-600">
          Manager: {main_manager?.name || 'Desconocido'}
        </p>

        {/* Rating */}
        <div className="mt-1 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-yellow-400 mr-1"
            fill="currentColor"
            viewBox="0 0 24 24"
            stroke="none"
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
          <span className="text-sm text-gray-600">{averageRating || 'N/A'}</span>
        </div>

        {/* Botón Ver Más */}
        <div className="mt-3">
          <button className="w-full text-center bg-blue-500 hover:bg-blue-600 text-white text-sm py-2 rounded-lg transition duration-300">
            Ver más
          </button>
        </div>
      </div>
    </div>
  );
};



export default SportCenterCard;
