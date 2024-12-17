import React, { useState } from "react";

const ReservacionesViews: React.FC = () => {
  // Lista de canchas con sus datos (por ejemplo, nombre, tipo, disponibilidad)
  const canchas = [
    { id: 1, nombre: "Cancha 1", tipo: "Fútbol 11", disponible: true, reservas: [{ hora: "10:00 AM - 11:30 AM", participante: "Juan Pérez" }] },
    { id: 2, nombre: "Cancha 2", tipo: "Fútbol 7", disponible: false, reservas: [{ hora: "11:00 AM - 12:30 PM", participante: "Carlos López" }] },
    { id: 3, nombre: "Cancha 3", tipo: "Tenis", disponible: true, reservas: [] },
    { id: 4, nombre: "Cancha 4", tipo: "Fútbol 5", disponible: true, reservas: [] },
    { id: 5, nombre: "Cancha 5", tipo: "Paddle", disponible: false, reservas: [{ hora: "3:00 PM - 4:30 PM", participante: "Ana Gómez" }] },
  ];

  // Días de la semana (por ejemplo, para mostrar la fecha)
  const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

  // Función para formatear la fecha en formato dd/mm/yyyy
  const formatFecha = (fecha: Date) => {
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1; // Mes en JS es 0-indexado
    const año = fecha.getFullYear();
    return `${dia < 10 ? `0${dia}` : dia}/${mes < 10 ? `0${mes}` : mes}/${año}`;
  };

  // Estado para manejar los detalles de la reserva seleccionada
  const [reservaSeleccionada, setReservaSeleccionada] = useState<{ hora: string; participante: string; canchaId: number } | null>(null);

  // Función para manejar el clic en una reserva para mostrar sus detalles
  const handleReservaClick = (canchaId: number, hora: string) => {
    const cancha = canchas.find(c => c.id === canchaId);
    if (cancha) {
      const reserva = cancha.reservas.find(r => r.hora === hora);
      if (reserva) {
        setReservaSeleccionada({ ...reserva, canchaId }); // Mostrar detalles de la reserva
      }
    }
  };

  // Función para cancelar una reserva
  const handleCancelarReserva = (canchaId: number, hora: string) => {
    const canchaIndex = canchas.findIndex(c => c.id === canchaId);
    if (canchaIndex !== -1) {
      const cancha = canchas[canchaIndex];
      const reservaIndex = cancha.reservas.findIndex(r => r.hora === hora);
      if (reservaIndex !== -1) {
        cancha.reservas.splice(reservaIndex, 1); // Eliminar la reserva
        setReservaSeleccionada(null); // Limpiar los detalles de la reserva
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-100">
      {/* Encabezado general de la vista */}
      <h1 className="text-4xl font-semibold text-center text-red-600 mb-6">
        Tus Reservaciones en tus canchas
      </h1>

      {/* Lista de Canchas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {canchas.map((cancha) => (
          <div
            key={cancha.id}
            className="bg-white shadow-lg rounded-lg p-6 cursor-pointer"
          >
            {/* Nombre de la Cancha */}
            <div className="font-semibold text-lg text-black mb-4">{cancha.nombre}</div>

            {/* Mostrar horarios y días disponibles o reservados */}
            {cancha.reservas.length > 0 ? (
              cancha.reservas.map((reserva, index) => {
                const fechaReserva = new Date(); // Suponemos que la reserva es hoy, puedes ajustar esto según tu lógica
                return (
                  <div key={index} className="mb-4">
                    <div className="text-black mb-2">
                      <strong>Hora:</strong> {reserva.hora}
                    </div>
                    <div className="text-black mb-4">
                      <strong>Dia:</strong> {formatFecha(fechaReserva)}
                    </div>
                    <button
                      onClick={() => handleCancelarReserva(cancha.id, reserva.hora)}
                      className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
                    >
                      Cancelar Turno
                    </button>
                  </div>
                );
              })
            ) : (
              <div className="bg-green-200 p-2 rounded text-center text-black">
                Disponible
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mostrar detalles de la reserva seleccionada */}
      {reservaSeleccionada && (
        <div className="mt-8 p-4 bg-yellow-100 rounded-lg">
          <h4 className="text-xl font-semibold text-gray-800">Detalles de la reserva:</h4>
          <p className="mt-2 text-gray-700">
            <strong>Hora:</strong> {reservaSeleccionada.hora}
          </p>
          <p className="mt-2 text-gray-700">
            <strong>Participante:</strong> {reservaSeleccionada.participante}
          </p>
        </div>
      )}
    </div>
  );
};

export default ReservacionesViews;
