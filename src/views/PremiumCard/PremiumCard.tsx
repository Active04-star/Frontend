'use client'
import React from "react";

const PremiumCard = () => {
  const handleRedirect = () => {
    // Redirige a Stripe o a cualquier URL configurada
    window.location.href = "https://checkout.stripe.com/";
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-transparent">
  <div className="w-96 bg-black text-white rounded-lg shadow-lg p-6">
    <div className="text-sm uppercase text-gray-400 mb-2">Premium</div>
    <p className="text-3xl font-semibold mb-6">$2,499*** al mes</p>
    <ul className="mb-6 space-y-2">
      <li className="flex items-center"><i className="fas fa-check-circle text-yellow-500 mr-2"></i>Gestiona ilimitadas canchas y deportes.</li>
      <li className="flex items-center"><i className="fas fa-check-circle text-yellow-500 mr-2"></i>Visibilidad destacada para tu complejo.</li>
      <li className="flex items-center"><i className="fas fa-check-circle text-yellow-500 mr-2"></i>Reserva fácil y rápida para tus clientes.</li>
      <li className="flex items-center"><i className="fas fa-check-circle text-yellow-500 mr-2"></i>Soporte técnico prioritario 24/7.</li>
      <li className="flex items-center"><i className="fas fa-check-circle text-yellow-500 mr-2"></i>Acceso a estadísticas detalladas y reportes.</li>
    </ul>
    <button
      onClick={handleRedirect}
      className="w-full py-3 mb-3 text-white bg-yellow-600 rounded-lg hover:bg-yellow-700 transition duration-300 transform hover:scale-105"
    >
      Obtener Premium 
    </button>
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
