import React, { useState } from "react";

// Componente Modal con las dos páginas de información
export const ModalInformacion: React.FC<{ closeModal: () => void }> = ({ closeModal }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handleSiguiente = () => {
    if (currentPage === 1) {
      setCurrentPage(2); // Avanzamos a la página 2
    }
  };

  const handleCerrar = () => {
    closeModal(); // Cerrar el modal
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg w-1/2">
        {currentPage === 1 ? (
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              ¿Qué es el registro de un centro deportivo?
            </h2>
            <p className="mb-4">
              Al registrar un centro deportivo, te convertirás en el{" "}
              <strong className="text-yellow-600">Manager</strong> de tu propio complejo.
              Este proceso es rápido y sencillo, y te permitirá gestionar todas las operaciones de tu centro,
              como reservas, usuarios y eventos, de manera eficiente y organizada.
            </p>
            <button
              onClick={handleSiguiente}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Siguiente
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              ¿Por qué registrar tu centro con nosotros?
            </h2>
            <p className="mb-4">
              Nuestro sistema de gestión te da el poder de controlar todos los aspectos de tu centro deportivo. Como{" "}
              <strong className="text-yellow-600">Manager</strong>, podrás gestionar usuarios, reservas y eventos de forma fácil.
              ¡Haz crecer tu negocio y mejora la experiencia de tus clientes con nosotros!
            </p>
            <button
              onClick={handleCerrar}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Cerrar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
