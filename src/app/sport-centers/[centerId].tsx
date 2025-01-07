import { GetStaticProps, GetStaticPaths } from 'next';
import FieldCard from '@/components/fieldCard/fieldCard';
import { API_URL } from "@/config/config";
import { ISportCenter } from '@/interfaces/sport_center.interface';

interface Props {
  centerData: ISportCenter;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(`${API_URL}/sportcenter/search`);
  const sportCenters = await response.json();

  const paths = sportCenters.flatMap((center: { id: string }) => ({
    params: { centerId: center.id },
  }));

  console.log('Paths generados:', paths); // Verifica las rutas generadas

  return {
    paths,
    fallback: 'blocking',
  };
};


export const getStaticProps: GetStaticProps = async (context) => {
  const { centerId } = context.params!;
  const response = await fetch(`${API_URL}/sportcenter/${centerId}`);
  
  if (!response.ok) {
    console.error('Error al obtener los datos del centro deportivo:', response.statusText);
    return {
      notFound: true, // Si no se encuentra el centro, retorna 404
    };
  }

  const centerData: ISportCenter = await response.json();

  // Verificar que centerData tiene los datos correctos
  if (!centerData) {
    console.error('No se encontró el centro deportivo con ID:', centerId);
    return {
      notFound: true,
    };
  }

  return {
    props: {
      centerData,
    },
  };
};

const SportCenterPage = ({ centerData }: Props) => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">{centerData.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {centerData.fields.map((field) => (
          <FieldCard key={field.id} {...field} />
        ))}
      </div>
    </div>
  );
};

export default SportCenterPage;
