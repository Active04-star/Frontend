"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Swal from "sweetalert2";
import { useLocalStorage } from "@/helpers/auth/useLocalStorage";

interface Cancha {
  id: string;
  name: string;
  address: string;
  averageRating: number;
  isDeleted: boolean;
  status: string;
  photos: string[];
}

const CanchasPanelView: React.FC = () => {
  const [canchas, setCanchas] = useState<Cancha[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    status: "Activa",
  });

  const [user] = useLocalStorage("userSession", null);
  const [center] = useLocalStorage("sportCenter", null);

  const userUUID = "uuid-del-usuario-logueado"; // Este debería ser el UUID real del usuario.

  const handleCreateCancha = () => {
    setShowCreateForm(true);
  };

  const handleBack = () => {
    setShowCreateForm(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const requestData = {
      ...formData,
      manager: userUUID,
    };

    try {
      const response = await fetch("http://localhost:4000/sportcenter/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error("Error al crear la cancha");
      }

      Swal.fire({
        icon: "success",
        title: "¡Éxito!",
        text: "Tu cancha ha sido creada con éxito.",
        confirmButtonText: "Aceptar",
      }).then(() => {
        setShowCreateForm(false);
        setFormData({ name: "", address: "", status: "Activa" });
      });
    } catch (error:  unknown) {
      console.error("Error al crear la cancha:", error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un error al crear la cancha. Inténtalo de nuevo.",
        confirmButtonText: "Aceptar",
      });
    }
  };

  useEffect(() => {
    const fetchCanchas = async () => {
      try {
        const response = await fetch("http://localhost:4000/sportcenter/search?page=1&limit=10");
        if (!response.ok) {
          throw new Error("Error al obtener las canchas");
        }
        const result = await response.json();
        setCanchas(result.sport_centers || []);
      } catch (error:  unknown) {
        console.error("Error al cargar las canchas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCanchas();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-16 max-w-6xl mx-auto p-6 bg-gray-100">


      {showCreateForm ? (
        <div className="create-form-container">
          <h2>Crear Cancha</h2>
          <form onSubmit={handleSubmit} className="create-form">
            <div>
              <label htmlFor="name">Nombre de la Cancha:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="address">Dirección:</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="status">Estado:</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value="Activa">Activa</option>
                <option value="Inactiva">Inactiva</option>
              </select>
            </div>
            <div>
              <button type="submit">Crear Cancha</button>
            </div>
            <div>
              <button type="button" onClick={handleBack}>Atrás</button>
            </div>
          </form>
        </div>
      ) : (
        <div
          className="card-container"
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
            gap: "20px", // Añade espacio entre las tarjetas
            padding: "20px",
          }}
        >
          {canchas.map((cancha) => (
            <div
              key={cancha.id}
              className="card"
              style={{
                maxWidth: "320px",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#fff",
                cursor: "pointer",
              }}
            >
              <div
                className="card-image"
                style={{
                  backgroundImage: cancha.photos.length > 0 ? `url(${cancha.photos[0]})` : "url('/default-image.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "200px",
                }}
              >
                <Image
                  src={cancha.photos.length > 0 ? cancha.photos[0] : "/default-image.jpg"}
                  alt={cancha.name}
                  width={320}
                  height={200}
                  className="card-img"
                  style={{ opacity: 0 }}
                />
              </div>
              <div className="card-content" style={{ padding: "15px" }}>
                <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "10px" }}>{cancha.name}</h3>
                <section className="details" style={{ fontSize: "14px", color: "#555" }}>
                  <p><strong>Dirección:</strong> {cancha.address}</p>
                  <p><strong>Calificación promedio:</strong> {cancha.averageRating}</p>
                  <p><strong>Estado:</strong> {cancha.isDeleted ? "Eliminada" : "Activa"}</p>
                </section>
              </div>
            </div>
          ))}
        </div>
      )}

      <button className="create-button" onClick={handleCreateCancha}>Crear Cancha</button>
    </div>
  );
};

export default CanchasPanelView;
