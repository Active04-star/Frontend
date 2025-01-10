import { IField } from '@/interfaces/field_Interface';
import Image from 'next/image';
import React from 'react';

const FieldCard: React.FC<IField> = ({ id, number, price, photos, sportCategory }) => {
  return (
    <div className="flex justify-center items-center p-8">
      <div className="flex flex-col bg-white shadow-md rounded-lg overflow-hidden transform transition hover:scale-105 hover:shadow-lg w-60">
        {/* Imagen */}
        <div className="relative w-full h-32">
          <Image
            src={photos?.[0] || '/placeholder-image.jpg'} // Usa la primera foto si existe
            alt={`Imagen de la cancha ${number}`}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
          />
        </div>

        {/* Contenido */}
        <div className="flex flex-col p-3">
          <h2 className="text-sm font-semibold text-gray-800 truncate">
            Cancha #{number} - {sportCategory?.name || 'Sin categoría'}
          </h2>
          <p className="text-xs text-gray-500 truncate mt-1">
            Precio: ${price} por hora
          </p>

          {/* Botón Reservar */}
          <div className="mt-3">
            <button className="w-full bg-yellow-600 text-white text-xs font-medium py-1 rounded transition duration-300">
              Reservar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FieldCard;
