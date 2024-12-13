import { ICardProps } from '@/interfaces/card_Interface';
import React from 'react';

const Card: React.FC<ICardProps> = ({ id, address, active, image }) => {
  return (
    <div className="flex flex-row items-center rounded-lg gap-4 justify-center border p-2 w-[240px] h-[200px] transform transition duration-300 hover:scale-105 hover:shadow-lg">
      <img className="max-w-[120px] w-full h-auto" src={image || '/default-image.jpg'} alt={`Imagen del complejo ${id}`} />
      <div>
        <h2 className="font-semibold text-xs">ID: {id}</h2>
        <p className="text-xs">Dirección: {address}</p>
        <p className="text-xs">{active ? 'Activo' : 'Inactivo'}</p>
      </div>
    </div>
  );
};

export default Card;
