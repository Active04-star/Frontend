// src/views/Panel/PanelView.tsx
import React from "react";

const PanelView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100">
      {/* Título del panel */}
      <h1 className="text-4xl font-semibold text-center text-indigo-700 mb-6">
        Bienvenido al Panel
      </h1>

      {/* Resumen de métricas */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-r from-teal-400 to-teal-600 p-6 shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold text-white">Historial pagos Dia</h2>
          <p className="text-3xl font-bold text-white">350</p>
        </div>
        <div className="bg-gradient-to-r from-indigo-500 to-indigo-700 p-6 shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold text-white">Ventas Hoy</h2>
          <p className="text-3xl font-bold text-white">$500</p>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-700 p-6 shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold text-white">Ventas Pendientes</h2>
          <p className="text-3xl font-bold text-white">15</p>
        </div>
      </div>
    </div>
  );
};

export default PanelView;
