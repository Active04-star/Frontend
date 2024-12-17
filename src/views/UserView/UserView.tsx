import Card from '@/components/card/card'; // Asegúrate de que Card pueda recibir y mostrar los datos de SportCenter
import { getSportCentersDB } from '@/helpers/sportCenters_helpers'; // Debes crear esta función para obtener los datos de la DB
import React, { useEffect, useState } from 'react';
import { ISportCenter } from '@/interfaces/SportCenter_Interface'; // Usando la nueva interfaz ISportCenter
import { SportCenterStatus } from '@/enum/sportCenterStatus.enum';
import { UserRole } from '@/enum/userRole';
import { SubscriptionStatus } from '@/enum/SubscriptionStatus';


const UserView = () => {
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
      {sportCenters.map((center) => (
        <Card key={center.id} {...center} />
      ))}
    </div>
  );
};

export default UserView;

// comentado para la demo1 , agregar cuando esté bien gestionado en el back el  traer a todos los centros deportivos 
//const UserView = () => {
//  const [sportCenters, setSportCenters] = useState<ISportCenter[]>([]); // Cambiar a ISportCenter
//  const [loading, setLoading] = useState(true);
//  const [error, setError] = useState<string | null>(null);
//
//  useEffect(() => {
//    const getSportCenters = async () => {
//      try {
//        const data = await getSportCentersDB(); // Llama a la función que obtiene los datos de la DB
//        setSportCenters(
//          data.map((center: any) => ({
//            id: center.id,
//            name: center.name,
//            address: center.address || 'Dirección no disponible',
//            averageRating: center.averageRating ?? null, // Si no tiene valor, se asigna null
//            status: center.status,
//            photos: center.photos || [], // Asegúrate de manejar las imágenes correctamente
//            fields: center.fields || [], // Relaciona los campos deportivos
//            managers_list: center.managers_list || [],
//            main_manager: center.main_manager || {}, // Relaciona el gerente principal
//            sport_categories: center.sport_categories || [], // Relaciona las categorías deportivas
//            reviews: center.reviews || [], // Asignar un valor vacío si no existe
//            payments: center.payments || [], // Asignar un valor vacío si no existe
//            paymentsHistory: center.paymentsHistory || [], // Asignar un valor vacío si no existe
//            schedules: center.schedules || [] // Asignar un valor vacío si no existe
//          }))
//        );
//      } catch (err: any) {
//        setError(err.message);
//      } finally {
//        setLoading(false);
//      }
//    };
//    getSportCenters();
//  }, []);
//
//  if (loading) return <p>Loading...</p>;
//  if (error) return <p>Error: {error}</p>;
//
//  return (
//    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//      {sportCenters.map((center) => (
//        <Card key={center.id} {...center} /> 
//      ))}
//    </div>
//  );
//};
//
//export default UserView;