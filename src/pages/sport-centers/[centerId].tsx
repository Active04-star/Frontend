// pages/[centerId].tsx
import { GetStaticProps, GetStaticPaths } from 'next';
import FieldCard from '@/components/fieldCard/fieldCard';
import { ISportCenter } from '@/interfaces/SportCenter_Interface';
import {IField} from '@/interfaces/field_Interface'
import { API_URL } from "@/config/config";

interface Props {
  centerData: ISportCenter;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(`${API_URL}/sportcenter/search`);
  const sportCenters: ISportCenter[] = await response.json();  // Tipamos sportCenters
  const paths = sportCenters
  .map((center) =>
    center.fields.map((field) => ({
      params: { centerId: center.id, fieldId: field.id },
    }))
  )
  .flat(); // Usamos flat() para aplanar el array

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { centerId } = context.params!;
  const response = await fetch(`${API_URL}/${centerId}`);
  const centerData: ISportCenter = await response.json();  // Tipamos centerData

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
        {centerData.fields.map((field: IField) => (  // Tipamos field
          <FieldCard key={field.id} {...field} />
        ))}
      </div>
    </div>
  );
};

export default SportCenterPage;
