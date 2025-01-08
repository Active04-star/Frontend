// src/views/Panel/PanelView.tsx
import React from "react";

const NotificacionesView: React.FC = () => {
  return (
    <div className="mt-16 max-w-4xl mx-auto p-6 pt-20 ">
      {/* Notificaciones */}
      <div className="bg-white p-6 shadow-lg rounded-lg mb-8">
        <h2 className="text-xl font-semibold text-black mb-4">Notificaciones</h2>
        <ul>
          <li className="p-3 mb-2 rounded-lg bg-blue-100">
            <h3 className="font-semibold text-black ">Nueva reserva de cancha</h3>
            <p className="text-sm text-gray-600">Calificacion de cancha</p>
          </li>
          <li className="p-3 mb-2 rounded-lg bg-yellow-100">
            <h3 className="font-semibold text-black">Mantenimiento programado</h3>
            <p className="text-sm text-gray-600">Calificacion de cancha</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NotificacionesView;
