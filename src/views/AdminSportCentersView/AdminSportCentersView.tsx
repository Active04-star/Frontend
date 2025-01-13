"use client";
import React, { useState, useEffect } from "react";
import { fetchAllCenters } from "@/helpers/sport_center_helpers";
import LoadingCircle from "@/components/general/loading-circle";
import { ISportCenterList } from "@/interfaces/sport_center_list.interface";
import SportCenterCard from "@/components/adminSportCenterCardProps/adminSportCenterCardProps";
import { API_URL } from "@/config/config";

import { ErrorHelper } from "@/helpers/errors/error-helper";
import { fetchWithAuth } from "@/helpers/errors/fetch-with-token-interceptor";
import Swal from "sweetalert2";

const banSportCenter = async (id: string) => {
  try {
    await fetchWithAuth(`${API_URL}/admin/ban-unban/sportcenter/${id}`, {
      method: "PUT",
      body: JSON.stringify({ status: "banned" }), // Cambiar el estado a "banned" para banear
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Alerta de éxito
    Swal.fire({
      icon: "success",
      title: "Centro Deportivo Baneado",
      text: "El centro deportivo ha sido baneado correctamente.",
      confirmButtonText: "Aceptar",
    });
  } catch (error) {
    console.error(error);

    if (error instanceof ErrorHelper) {
      // Alerta de error personalizada
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Error: ${error.message}`,
        confirmButtonText: "Aceptar",
      });
    } else {
      // Alerta de error genérica
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error al banear el centro deportivo.",
        confirmButtonText: "Aceptar",
      });
    }
  }
};

const unbanSportCenter = async (id: string) => {
  try {
    await fetchWithAuth(`${API_URL}/admin/ban-unban/sportcenter/${id}`, {
      method: "PUT",
      body: JSON.stringify({ status: "active" }), // Cambiar el estado a "active" para desbanear
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Alerta de éxito
    Swal.fire({
      icon: "success",
      title: "Centro Deportivo Desbaneado",
      text: "El centro deportivo ha sido desbaneado correctamente.",
      confirmButtonText: "Aceptar",
    });
  } catch (error) {
    console.error(error);

    if (error instanceof ErrorHelper) {
      // Alerta de error personalizada
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Error: ${error.message}`,
        confirmButtonText: "Aceptar",
      });
    } else {
      // Alerta de error genérica
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error al desbanear el centro deportivo.",
        confirmButtonText: "Aceptar",
      });
    }
  }
};

const AdminSportCentersView: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [centerList, setCenterList] = useState<ISportCenterList | null>(null);

  useEffect(() => {
  fetchData();
}, []);

const fetchData = async () => {
  setIsLoading(true);
  setError(null);
  try {
    const response = await fetchAllCenters({ limit: 20 });
    console.log("Fetched Sport Centers:", response); // Verificar la respuesta
    setCenterList(response); // Establecer la respuesta directamente
  } catch (error: unknown) {
    setError("An error occurred while fetching sport centers");
    setCenterList(null);
  }
  setIsLoading(false);
};


  const handleBan = async (id: string) => {
    await banSportCenter(id); // Usamos la función banSportCenter para banear
    fetchData(); // Actualizar la lista después de banear
  };

  const handleUnban = async (id: string) => {
    await unbanSportCenter(id); // Usamos la función unbanSportCenter para desbanear
    fetchData(); // Actualizar la lista después de desbanear
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-4 mt-8">
      {isLoading ? (
        <div className="h-96 flex justify-center items-center">
          <div className="w-32 h-32">
            <LoadingCircle />
          </div>
        </div>
      ) : error ? (
        <div className="h-96 flex justify-center items-center">
          <p className="text-gray-500 text-lg">{error}</p>
        </div>
      ) : (
        <div className="mt-8 mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {centerList &&
            centerList.sport_centers.map((center) => (
              <SportCenterCard
                key={center.id}
                {...center}
                onBan={handleBan} // Función para banear
                onUnban={handleUnban} // Función para desbanear
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default AdminSportCentersView;
