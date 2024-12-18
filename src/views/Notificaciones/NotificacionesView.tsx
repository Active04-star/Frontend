// src/views/Panel/PanelView.tsx
import React from "react";

const NotificacionesView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100">
      {/* Título del panel */}
      <h1 className="text-4xl font-semibold text-center text-indigo-700 mb-6">
        Bienvenido al Panel
      </h1>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-r from-indigo-500 to-indigo-700 p-6 shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold text-white">Ventas Hoy</h2>
          <p className="text-3xl font-bold text-white">$500</p>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-700 p-6 shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold text-white">Pedidos Pendientes</h2>
          <p className="text-3xl font-bold text-white">15</p>
        </div>
      </div>

      {/* Notificaciones */}
      <div className="bg-white p-6 shadow-lg rounded-lg mb-8">
        <h2 className="text-xl font-semibold text-teal-600 mb-4">Notificaciones</h2>
        <ul>
          <li className="p-3 mb-2 rounded-lg bg-blue-100">
            <h3 className="font-semibold">Nueva reserva de cancha</h3>
            <p className="text-sm text-gray-600">Calificacion de cancha</p>
          </li>
          <li className="p-3 mb-2 rounded-lg bg-yellow-100">
            <h3 className="font-semibold">Mantenimiento programado</h3>
            <p className="text-sm text-gray-600">Calificacion de cancha</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NotificacionesView;
