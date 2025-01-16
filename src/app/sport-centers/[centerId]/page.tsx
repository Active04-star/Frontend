// src/app/sport-centers/[centerId]/page.tsx
import { API_URL } from "@/config/config";
import FieldCard from "@/components/fieldCard/fieldCard";
import { ISportCenter } from "@/interfaces/sport_center.interface";
import Navbar from "@/components/navbar/navbar";
import BotonVolver from "@/components/back-button/back-button";
import { IField } from "@/interfaces/field_Interface";
import { fetchAndCatch } from "@/helpers/errors/fetch-error-interceptor";
import { swalNotifyUnknownError } from "@/helpers/swal/swal-notify-unknown-error";
import { ErrorHelper } from "@/helpers/errors/error-helper";
import { ApiStatusEnum } from "@/enum/HttpStatus.enum";
import { ApiError } from "next/dist/server/api-utils";
import FieldList from "@/components/fieldList/field_list";

// ✅ Generar rutas estáticas dinámicamente
export async function generateStaticParams() {
  try {
    const response = await fetchAndCatch(`${API_URL}/sportcenter/search`, {
      method: "GET",
    });

    const { sport_centers }: { sport_centers: { id: string }[] } =
      await response;

    return sport_centers.map((center) => ({
      centerId: center.id,
    }));
  } catch (error) {
    swalNotifyUnknownError(error);
    console.error("Error generating static params:", error);
    return [];
  }
}

// ✅ Página dinámica
const SportCenterPage = async ({
  params,
}: {
  params: Promise<{ centerId: string }>;
}) => {
  try {
    // Obtener datos del Sport Center
    const id = (await params).centerId;
    const sport_center: ISportCenter = await fetchAndCatch(
      `${API_URL}/sportcenter/${id}`,
      { cache: "no-store" }
    );

    if (sport_center.fields.length === 0) {
      throw new ErrorHelper(ApiStatusEnum.CENTER_HAS_NO_FIELDS, "404");
    }

    return (
      <div className="pt-8">
        <Navbar />
        <BotonVolver />
        {sport_center && (
          <h1 className="text-2xl font-bold mb-6 mt-16 text-center">
            {sport_center.name}
          </h1>
        )}
        <div className="w-full flex justify-evenly">
          <div className="mx-6 w-2/3">
            <div className="flex">
              <div className="font-bold mr-2">Direccion: </div>
              {sport_center.address}
            </div>

            <div className="mt-2 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-yellow-400 mr-1"
                fill="currentColor"
                viewBox="0 0 24 24"
                stroke="none"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              <div>
                {Number.parseFloat(
                  sport_center.averageRating?.toString() || "0"
                ).toFixed(1)}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 mb-8">
          <FieldList fields={sport_center.fields} />
        </div>
      </div>
    );
  } catch (error) {
    if (error instanceof ErrorHelper) {
      if (error.message === ApiStatusEnum.CENTER_NOT_FOUND) {
        window.location.href = "/not-found";
        return;
      } else if (error.message === ApiStatusEnum.CENTER_HAS_NO_FIELDS) {
        return <div>No se encontraron canchas para este centro deportivo</div>;
      }
    }
  }
};

export default SportCenterPage;