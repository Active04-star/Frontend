import Link from 'next/link'; // Asegúrate de importar Link de Next.js
import Image from 'next/image';
import { ISportCenter } from '@/interfaces/sport_center.interface';

const SportCenterCard: React.FC<ISportCenter> = ({
  id,
  name,
  address,
  averageRating,
  photos,
}) => {

  return (
    <Link href={`/sport-centers/${id}`} passHref>
      <div className="flex justify-center items-center p-2">
        <div className="flex flex-col bg-white shadow-md rounded-lg overflow-hidden transform transition hover:scale-105 hover:shadow-lg w-60">
          {/* Imagen */}
          <div className="relative w-full h-32">
            <Image
              src={photos?.[0].image_url || '/placeholder-image.jpg'}
              alt={name}
              layout="fill"
              objectFit="cover"
              className="rounded-t-lg"
            />
          </div>

          {/* Contenido */}
          <div className="flex flex-col p-3">
            <h2 className="text-sm font-semibold text-gray-800 truncate">{name}</h2>
            <p className="text-xs text-gray-500 truncate mt-1">{address}</p>

            {/* Rating */}
            <div className="mt-2 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-yellow-400 mr-1"
                fill="currentColor"
                viewBox="0 0 24 24"
                stroke="none"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              <span className="text-xs text-gray-600">{averageRating}</span>
            </div>

            {/* Botón Ver Más */}
            <div className="mt-3">
              <button className="w-full bg-yellow-600 text-white text-xs font-medium py-1 rounded transition duration-300">
                Ver más
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SportCenterCard;
