// src/views/Panel/UbicacionView.tsx
"use client";
import React, { useEffect, useState, useCallback } from "react";
import dynamic from 'next/dynamic';
import { useLocalStorage } from "@/helpers/auth/useLocalStorage";
import { ISportCenter, IUser } from "@/types/zTypes";
import { fetchWithAuth } from "@/helpers/errors/fetch-with-token-interceptor";
import { API_URL } from "@/config/config";
import 'leaflet/dist/leaflet.css';
const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), { ssr: false });





const UbicacionView: React.FC = () => {
  const [userLocalStorage] = useLocalStorage<IUser | null>("userSession", null);
  const [sportCenter, setSportCenter] = useState<ISportCenter | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSportCenter = useCallback(async () => {
    if (!userLocalStorage?.user?.id) return;
    try {
      const response = await fetchWithAuth(
        `${API_URL}/manager/center/${userLocalStorage.user.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setSportCenter(response);
    } catch (error) {
      console.error("Error fetching sport center:", error);
    } finally {
      setIsLoading(false);
    }
  }, [userLocalStorage]);

  useEffect(() => {
    fetchSportCenter();
  }, [fetchSportCenter]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600"></div>
      </div>
    );
  }

  
  if (!sportCenter) {
    return <div>No se encontró el centro deportivo</div>;
  }

  // Manejo del caso cuando latitude o longitude son nulos
  const position: [number, number] | null =
    sportCenter.latitude !== null && sportCenter.longitude !== null
      ? [sportCenter.latitude, sportCenter.longitude]
      : null;

  if (!position) {
    return (
      <div className="mt-16 max-w-4xl mx-auto p-6 pt-20">
        <h1 className="text-2xl font-bold mb-4">Ubicación del Centro Deportivo</h1>
        <p>No se puede mostrar la ubicación debido a datos incompletos.</p>
      </div>
    );
  }
  return (
    <div className="mt-16 max-w-4xl mx-auto p-6 pt-20">
      <h1 className="text-2xl font-bold mb-4">Ubicación del Centro Deportivo</h1>
      <div style={{ height: '400px', width: '100%' }}>
        <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={position}>
            <Popup>
              {sportCenter.name}<br />
              {sportCenter.address}
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default UbicacionView;