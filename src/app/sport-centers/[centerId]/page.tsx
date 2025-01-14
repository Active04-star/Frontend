// src/app/sport-centers/[centerId]/page.tsx
import { API_URL } from "@/config/config";
import FieldCard from "@/components/fieldCard/fieldCard";
import { ISportCenter } from "@/interfaces/sport_center.interface";
import Navbar from "@/components/navbar/navbar";
import BotonVolver from "@/components/back-button/back-button";
import { IField } from "@/interfaces/field_Interface";
import FieldList from "@/components/fieldList/field_list";

// ✅ Generar rutas estáticas dinámicamente
export async function generateStaticParams() {
  try {
    const response = await fetch(`${API_URL}/sportcenter/search`);

    if (!response.ok) {
      throw new Error("Failed to fetch sport centers");
    }

    const { sport_centers }: { sport_centers: { id: string }[] } =
      await response.json();

    return sport_centers.map((center) => ({
      centerId: center.id,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}
//Promise<{centerId: string;}[]>

// ✅ Página dinámica
const SportCenterPage = async ({ params }: { params: Promise<{ centerId: string }> }) => {
  try {
    // Obtener datos del Sport Center
    const id = (await params).centerId;
    const sportCenterResponse = await fetch(
      `${API_URL}/sportcenter/${id}`,
      { cache: "no-store" } // Asegura que no use datos en caché
    );

    if (!sportCenterResponse.ok) {
      return <h1>Sport Center not found</h1>;
    }

    const centerData: ISportCenter = await sportCenterResponse.json();

    // Obtener fields asociados al Sport Center
    const fieldsResponse = await fetch(`${API_URL}/field/fields/${id}`,
      { cache: "no-store" } // Asegura que no use datos en caché
    );

    if (!fieldsResponse.ok) {
      return <h1>No fields found</h1>;
    }

    const fieldsData: IField[] = await fieldsResponse.json();

    return (
      <div className="pt-8">
        <Navbar />
        <BotonVolver />
        {centerData && (
        <h1 className="text-2xl font-bold mb-6 mt-16 text-center">{centerData.name}</h1>
      )}
      <div className="mt-8 mb-8">
        <FieldList fields={fieldsData} />
      </div>
      </div>
    );

  } catch (error) {
    console.error("Error loading sport center data:", error);
    return <h1>Error loading sport center</h1>;
  }
};

export default SportCenterPage;