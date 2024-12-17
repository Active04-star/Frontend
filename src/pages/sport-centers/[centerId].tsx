import { GetStaticProps, GetStaticPaths } from 'next';
import FieldCards from "@/components/fieldCard/fieldCard"



type SportCenterPageProps = {
  id: string;
};


// Generar rutas dinámicas en build time
export const getStaticPaths: GetStaticPaths = async () => {
  // Aquí obtendrías los IDs de tus centros deportivos
  const ids = ['1', '2', '3']; // Ejemplo estático o consulta a tu API
  const paths = ids.map((id) => ({
    params: { id },
  }));

  return {
    paths,
    fallback: 'blocking', // Para generar páginas en tiempo real si no existe en el build inicial
  };
};

// Obtener los datos específicos para cada página
export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params!;

  // Aquí iría tu lógica para obtener datos del backend o API
  return {
    props: {
      id,
    },
  };
};


const SportCenterPage: React.FC<SportCenterPageProps> = ({ id }) => {
  return (
    <div>
      <FieldCards />
      <p>ID: {id}</p>
    </div>
  );
};

export default SportCenterPage;
