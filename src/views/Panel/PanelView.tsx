// src/views/Panel/PanelView.tsx
import React from "react";

const PanelView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 pt-20 bg-gray-100">
      {/* Título del panel */}
      <h1 className="text-4xl font-semibold text-center text-indigo-700 mb-6">
        Bienvenido al Panel
      </h1>
    </div>
  );
};

export default PanelView;
