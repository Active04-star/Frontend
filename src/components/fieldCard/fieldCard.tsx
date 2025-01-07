import { IField } from '@/interfaces/field_Interface';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const FieldCard: React.FC<IField> = ({ id, number, price }) => {
  return (
    <Link href={`/sport-centers/fields/${id}`} passHref>
      <div className="flex flex-row items-center rounded-lg gap-4 justify-center border p-2 w-[240px] h-[200px] transform transition duration-300 hover:scale-105 hover:shadow-lg cursor-pointer">
        <Image
          className="max-w-[120px] w-full h-auto"
          src="/default-image.jpg"
          alt={`Imagen de la cancha ${id}`}
          width={120}
          height={120}
        />
        <div>
          <h2 className="font-semibold text-xs">ID: {id}</h2>
          <p className="text-xs">Number: {number}</p>
          <p className="text-xs">Price: {price}</p>
        </div>
      </div>
    </Link>
  );
};

export default FieldCard;
