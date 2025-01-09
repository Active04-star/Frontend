"use client";
import React, { useState, useEffect } from "react";
import { fetchAllCenters } from "@/helpers/sport_center_helpers";
import LoadingCircle from "@/components/general/loading-circle";
import { ISportCenterList } from "@/interfaces/sport_center_list.interface";
import SportCenterCard from "@/components/adminSportCenterCardProps/adminSportCenterCardProps";
import { API_URL } from "@/config/config";

import { ErrorHelper } from "@/helpers/errors/error-helper";
import { fetchWithAuth } from "@/helpers/errors/fetch-with-token-interceptor";

const banSportCenter = async (id: string) => {
  try {
    await fetchWithAuth(`${API_URL}/admin/ban-unban/sportcenter/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });

    alert("Centro deportivo baneado con éxito.");
  } catch (error) {
    console.error(error);

    if (error instanceof ErrorHelper) {
      alert(`Error: ${error.message}`);
    } else {
      alert("Ocurrió un error al banear el centro deportivo.");
    }
  }
};

const AdminSportCentersView: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [centerList, setCenterList] = useState<ISportCenterList | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetchAllCenters({ limit: 20 });
      setCenterList(response);
    } catch (error:  unknown) {
      setError("An error occurred while fetching sport centers");
      setCenterList(null);
    }
    setIsLoading(false);
  };

  const handleBan = async (id: string) => {
    await banSportCenter(id);
    fetchData(); 
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
              <SportCenterCard key={center.id} {...center} onBan={handleBan} />
            ))}
        </div>
      )}
    </div>
  );
};

export default AdminSportCentersView;
