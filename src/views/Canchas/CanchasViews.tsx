"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Swal from "sweetalert2";
import { useLocalStorage } from "@/helpers/auth/useLocalStorage";

// Define la interfaz de User
interface User {
  token: string;
}

// Define la interfaz de Center (de acuerdo a las propiedades que necesites)
interface Center {
  id: string;
}

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
    number: 0,
    price: "",
    duration_minutes: 0,
    sportCategoryId: "",
    sportCenterId: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);

  // Define `user` como de tipo `User | null` y `center` como de tipo `Center | null`
  const [user] = useLocalStorage<User | null>("userSession", null);
  const [center] = useLocalStorage<Center | null>("sportCenter", null);

  const userToken = user?.token; // Aquí accedemos al `token` de forma segura

  const handleCreateCancha = () => {
    setShowCreateForm(true);
  };

  const handleBack = () => {
    setShowCreateForm(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const newData = {
        ...prevData,
        [name]: value,
      };
      
      const isValid = Boolean(newData.number && newData.price && newData.sportCategoryId && newData.sportCenterId);
      setIsFormValid(isValid);
      return newData;
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      if (!userToken) {
        throw new Error("El token de usuario no está disponible.");
      }

      const response = await fetch("http://localhost:4000/field", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error al crear la cancha");
      }

      Swal.fire({
        icon: "success",
        title: "¡Éxito!",
        text: "La cancha ha sido creada con éxito.",
        confirmButtonText: "Aceptar",
      }).then(() => {
        setShowCreateForm(false);
        setFormData({
          number: 0,
          price: "",
          duration_minutes: 0,
          sportCategoryId: "",
          sportCenterId: center?.id || "", // Acceso seguro a `center.id`
        });
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error al crear la cancha:", error.message);
      } else {
        console.error("Error desconocido:", error);
      }

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
        if (!userToken) {
          throw new Error("El token de usuario no está disponible.");
        }

        const response = await fetch("http://localhost:4000/sportcenter/search?page=1&limit=10", {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Error al obtener las canchas");
        }

        const result = await response.json();
        setCanchas(result.sport_centers || []);
      } catch (error: unknown) {
        console.error("Error al cargar las canchas:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userToken) {
      fetchCanchas();
    }
  }, [userToken]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-16 max-w-6xl mx-auto p-6 bg-gray-100">
      {!showCreateForm && (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "black" }}>Canchas</h1>
          <button
            className="create-button"
            onClick={handleCreateCancha}
            style={{
              backgroundColor: "#4CAF50",
              color: "white",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "1rem",
            }}
          >
            Crear Cancha
          </button>
        </div>
      )}

      {showCreateForm ? (
        <div
          className="create-form-container"
          style={{
            marginTop: "20px",
            padding: "20px",
            backgroundColor: "yellow",
            borderRadius: "8px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h2 style={{ fontSize: "1.5rem", fontWeight: "600", color: "#333" }}>Crea tu nueva cancha</h2>
          <form onSubmit={handleSubmit} className="create-form">
            <div style={{ marginBottom: "15px" }}>
              <label
                htmlFor="number"
                style={{ fontWeight: "600", display: "block", marginBottom: "8px", color: "black" }}
              >
                Número de la Cancha:
              </label>
              <input
                type="number"
                id="number"
                name="number"
                value={formData.number}
                onChange={handleChange}
                required
                min="0"
                max="1000"
                style={{
                  width: "100%",
                  padding: "10px",
                  fontSize: "1rem",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  backgroundColor: "#f9f9f9",
                  color: "black",
                }}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label
                htmlFor="price"
                style={{ fontWeight: "600", display: "block", marginBottom: "8px", color: "black" }}
              >
                Precio por Hora:
              </label>
              <input
                type="text"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  fontSize: "1rem",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  backgroundColor: "#f9f9f9",
                  color: "black",
                }}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label
                htmlFor="duration_minutes"
                style={{ fontWeight: "600", display: "block", marginBottom: "8px", color: "black" }}
              >
                Duración en Minutos (Opcional):
              </label>
              <input
                type="number"
                id="duration_minutes"
                name="duration_minutes"
                value={formData.duration_minutes}
                onChange={handleChange}
                min="15"
                max="1440"
                style={{
                  width: "100%",
                  padding: "10px",
                  fontSize: "1rem",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  backgroundColor: "#f9f9f9",
                  color: "black",
                }}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label
                htmlFor="sportCategoryId"
                style={{ fontWeight: "600", display: "block", marginBottom: "8px", color: "black" }}
              >
                Categoría Deportiva:
              </label>
              <input
                type="text"
                id="sportCategoryId"
                name="sportCategoryId"
                value={formData.sportCategoryId}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  fontSize: "1rem",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  backgroundColor: "#f9f9f9",
                  color: "black",
                }}
              />
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
              <button
                type="button"
                onClick={handleBack}
                style={{
                  backgroundColor: "#f44336",
                  color: "white",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "1rem",
                  border: "none",
                }}
              >
                Atrás
              </button>

              <button
                type="submit"
                disabled={!isFormValid}
                style={{
                  backgroundColor: isFormValid ? "#4CAF50" : "#aaa",
                  color: "white",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  cursor: isFormValid ? "pointer" : "not-allowed",
                  fontSize: "1rem",
                  border: "none",
                }}
              >
                Crear
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="cards-container" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
          {canchas.map((cancha) => (
            <div
              key={cancha.id}
              className="cancha-card"
              style={{
                backgroundColor: "white",
                padding: "15px",
                borderRadius: "8px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "200px",
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: "8px",
                }}
              >
                <Image
                  src={cancha.photos[0]}
                  alt={cancha.name}
                  layout="fill"
                  objectFit="cover"
                  style={{ borderRadius: "8px" }}
                />
              </div>
              <h3
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "600",
                  color: "black",
                  marginTop: "10px",
                }}
              >
                {cancha.name}
              </h3>
              <p style={{ color: "#777" }}>{cancha.address}</p>
              <p style={{ fontWeight: "600", color: cancha.isDeleted ? "red" : "green" }}>
                {cancha.isDeleted ? "Eliminada" : "Activa"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CanchasPanelView;
