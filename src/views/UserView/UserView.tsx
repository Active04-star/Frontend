"use client";
import LoadingCircle from '@/components/general/loading-circle';
import SportCenterCard from '@/components/SportCenterCard/SportCenterCard';
import { fetchSearchCenters } from '@/helpers/sport_center_helpers';
import { IQueryParams } from '@/interfaces/query_params.interface';
import { ISportCenterList } from '@/interfaces/sport_center_list.interface';
import React, { useEffect, useState } from 'react';

const UserView: React.FC = () => {
  const default_params: IQueryParams = { page: 1, limit: 8 }
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [centerList, setCenterList] = useState<ISportCenterList | null>(null);

  useEffect(() => {

    const fetchData = async () => {
      setIsLoading(true);

      try {
        //TODO AUN SE DEBE AGREGAR LOS PARAMETROS DE BUSQUEDA
        const response = await fetchSearchCenters();
        setCenterList(response);

      } catch (error) {
        console.error(error);

      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <>
      {
        isLoading ?
          <div className='h-96 flex justify-center items-center'>
            < div className='w-32 h-32' >
              <LoadingCircle />
            </div >
          </div >
          :
          <div className="mt-8 mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {
              centerList &&
              centerList.sport_centers.map((center) => (
                <SportCenterCard key={center.id} {...center} />
              ))
            }
          </div>
      }
    </>
  );
};

/**  ESTO ESTA MAL IMPLEMENTADO, NO VA A FUNCIONAR AQUI  */
// export const getServerSideProps: GetServerSideProps = async () => {
//   const response = await fetch(`${API_URL}/sportcenter/search`);
//   const sportCenters = await response.json();

//   return {
//     props: {
//       sportCenters,
//     },
//   };
// };

export default UserView;

