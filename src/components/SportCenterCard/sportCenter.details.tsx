import React from 'react';
import { MapPin, Star } from 'lucide-react';
import { ISportCategory } from '@/interfaces/sportCategory_interface';

interface SportCenterDetailsProps {
  name: string;
  address: string;
  averageRating: number;
  fieldsCount: number;
  sportCategories: ISportCategory[];
}

export default function SportCenterDetails({
  name,
  address,
  averageRating,
  fieldsCount,
  sportCategories,
}: SportCenterDetailsProps) {
  return (
    <div className="p-4">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">{name}</h2>
          <div className="flex items-center text-gray-500 mt-1">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="text-sm">{address}</span>
          </div>
        </div>
        <div className="flex items-center bg-blue-50 px-2 py-1 rounded">
          <Star className="w-4 h-4 text-yellow-400 mr-1" />
          <span className="text-sm font-medium">{averageRating.toFixed(1)}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">Canchas</h3>
          <p className="text-lg font-semibold text-gray-900">{fieldsCount}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">Deportes</h3>
          <div className="flex flex-wrap gap-1">
            {sportCategories.map((sport) => (
              <span
                key={sport.id}
                className="inline-block px-2 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded"
              >
                {sport.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}