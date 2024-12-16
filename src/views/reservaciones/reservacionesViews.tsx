import React, { useState } from "react";

const ReservacionesViews: React.FC = () => {
  // Lista de canchas con sus datos (por ejemplo, nombre, tipo, disponibilidad)
  const canchas = [
    { id: 1, nombre: "Cancha 1", tipo: "Fútbol 11", disponible: true, reservas: [{ hora: "10:00 AM", participante: "Juan Pérez" }] },
    { id: 2, nombre: "Cancha 2", tipo: "Fútbol 7", disponible: false, reservas: [{ hora: "11:00 AM", participante: "Carlos López" }] },
    { id: 3, nombre: "Cancha 3", tipo: "Tenis", disponible: true, reservas: [] },
    { id: 4, nombre: "Cancha 4", tipo: "Fútbol 5", disponible: true, reservas: [] },
    { id: 5, nombre: "Cancha 5", tipo: "Paddle", disponible: false, reservas: [{ hora: "3:00 PM", participante: "Ana Gómez" }] },
  ];

  // Días de la semana
  const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

  // Horas del día (por ejemplo, de 8 AM a 8 PM)
  const horas = [
    "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM",
    "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM",
  ];

  // Estado para manejar la cancha seleccionada
  const [canchaSeleccionada, setCanchaSeleccionada] = useState<number | null>(null);

  // Estado para manejar la hora seleccionada
  const [horaSeleccionada, setHoraSeleccionada] = useState<string | null>(null);

  // Estado para manejar los detalles de la reserva seleccionada
  const [reservaSeleccionada, setReservaSeleccionada] = useState<{ hora: string; participante: string } | null>(null);

  // Función para manejar el clic en una cancha
  const handleCanchaClick = (id: number) => {
    if (canchaSeleccionada === id) {
      setCanchaSeleccionada(null); // Desmarcar si ya está seleccionada
    } else {
      setCanchaSeleccionada(id); // Marcar la cancha seleccionada
      setHoraSeleccionada(null); // Resetear la hora seleccionada al cambiar de cancha
      setReservaSeleccionada(null); // Resetear detalles de la reserva
    }
  };

  // Función para manejar el clic en una hora
  const handleHoraClick = (hora: string) => {
    if (horaSeleccionada === hora) {
      setHoraSeleccionada(null); // Desmarcar si la misma hora es seleccionada
    } else {
      setHoraSeleccionada(hora); // Seleccionar una nueva hora
    }
  };

  // Función para manejar el clic en la disponibilidad (Disponible / No disponible)
  const handleDisponibilidadClick = (canchaId: number, hora: string) => {
    const cancha = canchas.find(c => c.id === canchaId);
    if (cancha) {
      const reserva = cancha.reservas.find(r => r.hora === hora);
      if (reserva) {
        setReservaSeleccionada(reserva); // Mostrar detalles si la cancha está reservada
      } else {
        setReservaSeleccionada(null); // No mostrar detalles si está disponible
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
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Selecciona una cancha</h2>
        <div className="space-y-4">
          {canchas.map((cancha) => (
            <div
              key={cancha.id}
              className="cursor-pointer text-blue-600 hover:underline"
              onClick={() => handleCanchaClick(cancha.id)}
            >
              {cancha.nombre}
            </div>
          ))}
        </div>
      </div>

      {/* Si hay una cancha seleccionada, mostrar la información adicional */}
      {canchaSeleccionada !== null && (
        <div className="mt-8">
          {/* Información adicional de la cancha seleccionada */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-xl font-semibold text-indigo-600 mb-4">
              Información de {canchas.find((cancha) => cancha.id === canchaSeleccionada)?.nombre}
            </h3>

            {/* Tabla Hora vs Día con scroll */}
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border-collapse">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold text-gray-700 border-b">Hora</th>
                    {dias.map((dia) => (
                      <th key={dia} className="px-6 py-4 text-left font-semibold text-gray-700 border-b">
                        {dia}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {horas.map((hora) => (
                    <tr key={hora}>
                      <td
                        onClick={() => handleHoraClick(hora)}
                        className={`px-6 py-4 text-gray-700 border-b cursor-pointer ${horaSeleccionada === hora ? "bg-blue-200" : ""}`}
                      >
                        {hora}
                      </td>
                      {dias.map((dia) => (
                        <td
                          key={dia}
                          className="px-6 py-4 text-gray-700 border-b cursor-pointer"
                          onClick={() => handleDisponibilidadClick(canchaSeleccionada, hora)}
                        >
                          {/* Aquí se muestra la disponibilidad */}
                          <div
                            className={`p-2 text-center ${canchas.find((cancha) => cancha.id === canchaSeleccionada)?.disponible ? 'bg-green-200' : 'bg-red-200'}`}
                          >
                            {canchas.find((cancha) => cancha.id === canchaSeleccionada)?.disponible ? "Disponible" : "No disponible"}
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mostrar detalles de la reserva seleccionada */}
            {reservaSeleccionada && (
              <div className="mt-4 p-4 bg-yellow-100 rounded-lg">
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
        </div>
      )}
    </div>
  );
};

export default ReservacionesViews;
