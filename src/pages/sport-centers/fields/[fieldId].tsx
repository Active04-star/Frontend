// pages/[centerId]/[fieldId].tsx
import { GetStaticProps, GetStaticPaths } from 'next';
import Image from 'next/image';  // Importa el componente Image de Next.js
import { IField } from '@/interfaces/field_Interface';  // Asegúrate de importar las interfaces correctas
import { API_URL } from "@/config/config";

interface Props {
  fieldData: IField;
  centerId: string;
  fieldId: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(`${API_URL}/sportcenter/search `);
  const sportCenters: ISportCenter[] = await response.json();  // Tipamos la respuesta como ISportCenter[]
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
  const { centerId, fieldId } = context.params!;
  const response = await fetch(`${API_URL}/sportcenter/search`);   // en un futuro agregar esta ruta  ${centerId}/fields/${fieldId}
  const fieldData: IField = await response.json();  // Tipamos fieldData como IField

  return {
    props: {
      fieldData,
      centerId,
      fieldId,
    },
  };
};

const FieldPage = ({ fieldData, centerId, fieldId }: Props) => {
  return (
    <div>
      <h1>Detalles del campo</h1>
      <p>Sport Center ID: {centerId}</p>
      <p>Field ID: {fieldId}</p>
      <div className="field-images">
        {/* Usamos el componente Image de Next.js en lugar de <img> */}
        {fieldData.photos ? (
          // fieldData.photos.map((photo) => (
          <Image
            src={fieldData.photos}
            alt={`Campo ${fieldId}`}
            width={500}  // Añadimos un tamaño (ajústalo según sea necesario)
            height={300} // Añadimos un tamaño (ajústalo según sea necesario)
          />
          // ))
        ) : (
          <p>No hay imagenes disponibles para este campo.</p>
        )}
      </div>
    </div>
  );
};

export default FieldPage;
