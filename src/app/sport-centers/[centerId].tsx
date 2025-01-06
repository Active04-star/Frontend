// pages/[centerId].tsx
import { GetStaticProps, GetStaticPaths } from 'next';
import FieldCard from '@/components/fieldCard/fieldCard';
import { IField } from '@/interfaces/field_Interface'
import { API_URL } from "@/config/config";
import { ISportCenterList } from '@/interfaces/sport_center_list.interface';
import { ISportCenter } from '@/interfaces/sport_center.interface';

interface Props {
  centerData: ISportCenter;
}


// type SportCenterPageProps = {
//   id: string;
// };


// Generar rutas dinámicas en build time
// export const getStaticPaths: GetStaticPaths = async () => {
//   const response = await fetch(`${API_URL}/sportcenter/search`);
//   const sportCenters: ISportCenterList = await response.json();  // Tipamos sportCenters
//   const paths = sportCenters.sport_centers.map((center) =>
//     center.fields.map((field) => ({
//       params: { centerId: center.id, fieldId: field.id },
//     }))
//   )
//     .flat(); // Usamos flat() para aplanar el array

//   return { paths, fallback: 'blocking' };
// };

export const getStaticProps: GetStaticProps = async (context) => {
  const { centerId } = context.params!;
  const response = await fetch(`${API_URL}/${centerId}`);
  const centerData: ISportCenterList = await response.json();  // Tipamos centerData

  return {
    props: {
      centerData,
    },
  };
};

const SportCenterPage = ({ centerData }: Props) => {
  return (
    <div>
      <h1>{centerData.name}</h1>
      <div className="flex flex-wrap gap-4">
        {/* {centerData.fields.map((field: IField) => (  // Tipamos field
          <FieldCard key={field.id} {...field} />
        ))} */}
      </div>
    </div>
  );
};

export default SportCenterPage;
