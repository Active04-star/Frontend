'use client'
import { API_URL } from "@/config/config";
import { IUser } from "@/interfaces/user_Interface";
import React, { useEffect, useState } from "react";

const PremiumCard = () => {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const loadUserFromSession = async () => {
      try{
      const userSession = localStorage.getItem("userSession");
      if (!userSession) return;

      const parsedSession = JSON.parse(userSession);
      const response = await fetch(`${API_URL}/user/csolo-para-testing/${parsedSession.user.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error("Error al obtener el usuario actualizado");
        return;
      }

      const updatedUser = await response.json();
      setUser(updatedUser);

      // Actualiza también la sesión local
      localStorage.setItem(
        "userSession",
        JSON.stringify({ user: updatedUser })
      );
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
    }
    };

    loadUserFromSession();
  }, []);



  

  const createCheckout = async () => {
    if (!user) {
      alert("Por favor inicia sesión para continuar.");
      return;
    }

    const priceId = "price_1QXReu04KY20KAgUd0axPjmu"; // Reemplaza con el ID real del precio
    const userId = user.id;

    try {
      const response = await fetch(`${API_URL}/stripe/create-checkout-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ priceId, userId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error en la solicitud:", errorData);
        alert("Ocurrió un error al crear la sesión de pago.");
        return;
      }

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url; // Redirige al usuario a la URL
      } else {
        alert("No se recibió la URL de Stripe.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Ocurrió un error inesperado.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-transparent">
      <div className="w-96 bg-black text-white rounded-lg shadow-lg p-6">
        <div className="text-sm uppercase text-gray-400 mb-2">Premium</div>
        <p className="text-3xl font-semibold mb-6">$USD12</p>
        <ul className="mb-6 space-y-2">
          <li className="flex items-center"><i className="fas fa-check-circle text-yellow-500 mr-2"></i>Gestiona ilimitadas canchas y deportes.</li>
          <li className="flex items-center"><i className="fas fa-check-circle text-yellow-500 mr-2"></i>Visibilidad destacada para tu complejo.</li>
          <li className="flex items-center"><i className="fas fa-check-circle text-yellow-500 mr-2"></i>Reserva fácil y rápida para tus clientes.</li>
          <li className="flex items-center"><i className="fas fa-check-circle text-yellow-500 mr-2"></i>Soporte técnico prioritario 24/7.</li>
          <li className="flex items-center"><i className="fas fa-check-circle text-yellow-500 mr-2"></i>Acceso a estadísticas detalladas y reportes.</li>
        </ul>

        {user === null ? (
  <p className="text-center text-gray-400">Cargando...</p>
) : user?.stripeCustomerId ? (
  <button
    className="w-full py-3 mb-3 text-white bg-gray-600 rounded-lg cursor-not-allowed"
    disabled
  >
    Ya tienes Premium
  </button>
) : (
  <button
    className="w-full py-3 mb-3 text-white bg-yellow-600 rounded-lg hover:bg-yellow-700 transition duration-300 transform hover:scale-105"
    onClick={createCheckout}
  >
    Obtener Premium
  </button>
)}
        <div className="text-center mt-4">
          <p className="text-sm text-gray-400">¿Tienes dudas? <a href="#" className="text-blue-500 underline">Contáctanos</a></p>
          <p className="text-xs text-gray-400 mt-4">
            Se aplican <a href="#" className="text-blue-500 underline">Términos</a>.
            ***+ impuestos aplicables.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PremiumCard;
