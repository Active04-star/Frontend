import React, { useState } from "react";

export const RegisterCenterModal: React.FC<{ closeModal: () => void }> = ({ closeModal }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const nextPage = (page?: number) => {
    if (page) {
      setCurrentPage(currentPage + page);
    } else if (currentPage === 1) {
      setCurrentPage(2);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg w-1/2 text-black">
        {currentPage === 1 ? (
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-center">
              ¿Qué es el registro de un centro deportivo?
            </h2>
            <p className="mb-4">
              Al registrar un centro deportivo, te convertirás en el{" "}
              <strong className="text-yellow-600">Manager</strong> de tu propio complejo.
              Este proceso es rápido y sencillo, y te permitirá gestionar todas las operaciones de tu centro,
              como reservas, usuarios y eventos, de manera eficiente y organizada.
            </p>
            <button
              onClick={() => nextPage()}
              className="mt-5 bg-yellow-600 px-4 py-2 rounded hover:bg-yellow-700 text-white"
            >
              Siguiente
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-center">
              ¿Por qué registrar tu centro con nosotros?
            </h2>
            <p className="mb-4 ">
              Nuestro sistema de gestión te da el poder de controlar todos los aspectos de tu centro deportivo. Como{" "}
              <strong className="text-yellow-600 ">Manager</strong>, podrás gestionar usuarios, reservas y eventos de forma fácil.
              ¡Haz crecer tu negocio y mejora la experiencia de tus clientes con nosotros!
            </p>
            <button
              onClick={() => nextPage(-1)}
              className="mt-5 bg-yellow-600 px-4 py-2 rounded hover:bg-yellow-700 text-white mr-3"
            >
              Anterior
            </button>
            <button
              onClick={() => closeModal()}
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
