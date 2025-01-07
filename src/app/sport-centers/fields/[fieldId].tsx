import { GetStaticProps, GetStaticPaths } from 'next';
import { API_URL } from "@/config/config";
import { IField } from '@/interfaces/field_Interface';

interface Props {
  fieldData: IField;
}

export const getStaticPaths: GetStaticPaths = async () => {
    const response = await fetch(`${API_URL}/sportcenter/search`);
    const sportCenters = await response.json();
  
    const paths = sportCenters.flatMap((center: { fields: IField[] }) =>
      center.fields.map((field) => ({
        params: { fieldId: field.id.toString() },
      }))
    );
  
    console.log('Paths generados:', paths); // Verificar las rutas generadas
  
    return {
      paths,
      fallback: 'blocking',
    };
  };
  

  export const getStaticProps: GetStaticProps = async (context) => {
    const { fieldId } = context.params!;
    console.log('fieldId recibido:', fieldId); // Verificar el campo ID recibido
  
    const response = await fetch(`${API_URL}/field/${fieldId}`);
    const fieldData: IField = await response.json();
  
    if (!fieldData) {
      console.error('No se encontró el campo con ID:', fieldId);
      return {
        notFound: true,
      };
    }
  
    return {
      props: {
        fieldData,
      },
    };
  };
  
const FieldPage = ({ fieldData }: Props) => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Cancha #{fieldData.number}</h1>
      <p className="mb-4">Precio: {fieldData.price} por {fieldData.duration_minutes} minutos</p>
      <p className="mb-4">Estado: {fieldData.isActive ? 'Activa' : 'Inactiva'}</p>
      {fieldData.sportCategory && (
        <p className="mb-4">Categoría deportiva: {fieldData.sportCategory.name}</p>
      )}
      {fieldData.photos && (
        <div>
          <h2 className="text-lg font-semibold">Foto:</h2>
          <img src={fieldData.photos} alt={`Cancha ${fieldData.number}`} className="mt-2 w-full max-w-md rounded" />
        </div>
      )}
    </div>
  );
};

export default FieldPage;
