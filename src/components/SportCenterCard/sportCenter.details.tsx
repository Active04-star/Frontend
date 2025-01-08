import React from 'react';
import { MapPin, Star, Clock } from 'lucide-react';
import { ISportCenterSchedule } from '@/interfaces/sportCenter_schedule_interface';
import Link from 'next/link';

interface SportCenterDetailsProps {
  name: string;
  address: string;
  averageRating: number;
  schedules: ISportCenterSchedule[];
}

const DAYS_OF_WEEK = {
 Monday :'Monday',
    Tuesday :'Tuesday',
    Wednesday :'Wednesday',
    Thursday :'Thursday',
    Friday :'Friday',
    Saturday : 'Saturday',
    Sunday : 'Sunday',
};

export default function SportCenterDetails({
  name,
  address,
  averageRating,
  schedules
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


      <div className="border-t pt-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-500 flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            Horarios
          </h3>
          {schedules.length === 0 && (
            <Link
              href="/horarios"
              className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
            >
              Agregar horarios
            </Link>
          )}
        </div>
        
        {schedules.length > 0 ? (
          <div className="grid grid-cols-7 gap-2 text-center">
            {Object.entries(DAYS_OF_WEEK).map(([key, dayName]) => {
              const daySchedule = schedules.find(s => s.day === key);
              return (
                <div key={key} className="flex flex-col">
                  <span className="text-sm font-medium text-gray-700 mb-1">
                    {dayName}
                  </span>
                  <div className="text-xs text-gray-500">
                    {daySchedule?.isOpen ? (
                      <>
                        <div>{daySchedule.opening_time}</div>
                        <div>{daySchedule.closing_time}</div>
                      </>
                    ) : (
                      <span className="text-red-500">Cerrado</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-gray-500 text-center">
            No hay horarios configurados
          </p>
        )}
      </div>
    </div>
  );
}