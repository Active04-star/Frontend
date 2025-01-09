import { API_URL } from "@/config/config";
import FieldCard from "@/components/fieldCard/fieldCard";
import NavbarUser from "@/components/navbarUser/navbarUser";
import { ISportCenter } from "@/interfaces/sport_center.interface";
import { IField } from "@/interfaces/field_Interface";

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

// ✅ Página dinámica
const SportCenterPage = async ({
  params,
}: {
  params: { centerId: string };
}) => {
  try {
    // Obtener datos del Sport Center
    const sportCenterResponse = await fetch(
      `${API_URL}/sportcenter/${params.centerId}`,
      { cache: "no-store" } // Asegura que no use datos en caché
    );

    if (!sportCenterResponse.ok) {
      return <h1>Sport Center not found</h1>;
    }

    const centerData: ISportCenter = await sportCenterResponse.json();

    // Obtener fields asociados al Sport Center
    const fieldsResponse = await fetch(
      `${API_URL}/field/fields/${params.centerId}`,
      { cache: "no-store" } // Asegura que no use datos en caché
    );

    if (!fieldsResponse.ok) {
      return <h1>No fields found</h1>;
    }

    const fieldsData: IField[] = await fieldsResponse.json();

    return (
      <div className="pt-8">
        <NavbarUser />
        <h1 className="text-2xl font-bold mb-6 mt-16 text-center">
          {centerData.name}
        </h1>
        <div className="mt-8 mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fieldsData.map((field) => (
            <FieldCard key={field.id} {...field} />
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error loading sport center data:", error);
    return <h1>Error loading sport center</h1>;
  }
};

export default SportCenterPage;
