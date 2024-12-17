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
          <h2 className="text-xl font-semibold text-white">Usuarios Activos</h2>
          <p className="text-3xl font-bold text-white">350</p>
        </div>
        <div className="bg-gradient-to-r from-indigo-500 to-indigo-700 p-6 shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold text-white">Ventas Hoy</h2>
          <p className="text-3xl font-bold text-white">$500</p>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-700 p-6 shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold text-white">Pedidos Pendientes</h2>
          <p className="text-3xl font-bold text-white">15</p>
        </div>
      </div>
      

      {/* Gráfico de ventas - imagen de ejemplo */}
      <div className="bg-white p-6 shadow-lg rounded-lg mb-8">
        <h2 className="text-xl font-semibold text-teal-600 mb-4">Gráfico de Ventas</h2>
        <img
          src="https://www.forcemanager.com/wp-content/uploads/blog_Como_hacer_un_reporte_de_ventas4.png"  // URL de la imagen proporciona
        />
      </div>

      {/* Lista de usuarios */}
      <div className="bg-white p-6 shadow-lg rounded-lg">
        <h2 className="text-xl font-semibold text-indigo-600 mb-4">Lista de Usuarios Activos</h2>
        <ul>
          <li className="flex justify-between py-3 border-b border-gray-300">
            <span className="text-gray-700">Usuario 1</span>
            <button className="text-teal-600 hover:text-teal-800 transition duration-200">Ver</button>
          </li>
          <li className="flex justify-between py-3 border-b border-gray-300">
            <span className="text-gray-700">Usuario 2</span>
            <button className="text-teal-600 hover:text-teal-800 transition duration-200">Ver</button>
          </li>
          {/* Agregar más usuarios aquí */}
        </ul>
      </div>
    </div>
  );
};

export default PanelView;
