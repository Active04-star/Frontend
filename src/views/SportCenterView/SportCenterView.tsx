'use client'

//import { getSportCentersDB } from '@/helpers/sportCenters_helpers'; // Debes crear esta función para obtener los datos de la DB
// import React, { useEffect, useState } from 'react';               // a usarse en el futuro , comentado para hacer build 
import { ISportCenter } from '@/interfaces/SportCenter_Interface'; // Usando la nueva interfaz ISportCenter
import { SportCenterStatus } from '@/enum/sportCenterStatus.enum';
import { UserRole } from '@/enum/userRole';
import { SubscriptionStatus } from '@/enum/SubscriptionStatus';
import FieldCard from '@/components/fieldCard/fieldCard';


const SportCenterView = () => {
  // Datos harcodeados según la estructura de la interfaz ISportCenter
  const sportCenters: ISportCenter[] = [
    
      {
        id: '1',
        name: 'SportCenter 1',
        address: 'Calle Ficticia 123',
        averageRating: 4.5,
        status: SportCenterStatus.ACTIVE,
        reviews: [],
        photos: [
          { id: '1', imageUrl: 'https://res.cloudinary.com/duuzdompe/image/upload/v1733936638/ActiveProject/jqcfllas1ud2id4msoqg.webp' }
        ],
        payments: [],
        paymentsHistory: [],
        schedules: [],
        fields: [],
        managers_list: [],
        main_manager: {
          id: '1',
          name: 'Juan Pérez',
          email: 'juan@ejemplo.com',
          profile_image: 'https://via.placeholder.com/50',
          subscription_status : SubscriptionStatus.AUTHORIZED ,
          role: UserRole.USER ,
          was_banned:  false
        },
        sport_categories: []
      },
      {
        id: '2',
        name: 'SportCenter 1',
        address: 'Calle Ficticia 123',
        averageRating: 4.5,
        status: SportCenterStatus.ACTIVE,
        reviews: [],
        photos: [
          { id: '1', imageUrl: 'https://res.cloudinary.com/duuzdompe/image/upload/v1733936638/ActiveProject/jqcfllas1ud2id4msoqg.webp' }
        ],
        payments: [],
        paymentsHistory: [],
        schedules: [],
        fields: [],
        managers_list: [],
        main_manager: {
          id: '1',
          name: 'Juan Pérez',
          email: 'juan@ejemplo.com',
          profile_image: 'https://via.placeholder.com/50',
          subscription_status : SubscriptionStatus.AUTHORIZED ,
          role: UserRole.USER ,
          was_banned:  false
        },
        sport_categories: []
      },
    
  ];


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {/* Iterar sobre cada SportCenter */}
      {sportCenters.map((center) =>
        // Iterar sobre cada field dentro de fields de SportCenter
        center.fields.map((field) => (
          <FieldCard  key={field.id} {...field} />
        ))
      )}
    </div>
  );
};

export default SportCenterView;