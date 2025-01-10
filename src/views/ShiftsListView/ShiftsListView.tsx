'use client'
import React, { useState } from 'react';

interface Shift {
  id: number;
  sport: string;
  time: string;
  date: string;
}

const initialShifts: Shift[] = [
  { id: 1, sport: 'Fútbol', time: '18:00 - 19:30', date: '15/12/2024' },
  { id: 2, sport: 'Básquet', time: '20:00 - 21:30', date: '16/12/2024' },
  { id: 3, sport: 'Tenis', time: '17:00 - 18:00', date: '17/12/2024' },
];

const ShiftsList: React.FC = () => {
  const [shifts, setShifts] = useState<Shift[]>(initialShifts);

  const cancelShift = (id: number) => {
    const updatedShifts = shifts.filter((shift) => shift.id !== id);
    setShifts(updatedShifts);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Turnos Reservados</h2>
      {shifts.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shifts.map((shift) => (
            <div
              key={shift.id}
              className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-semibold text-black">{shift.sport}</h3>
              <p className="text-gray-600">
                <span className="font-medium">Horario:</span> {shift.time}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Día:</span> {shift.date}
              </p>
              <button
                onClick={() => cancelShift(shift.id)}
                className="mt-4 w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
              >
                Cancelar Turno
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No tienes turnos reservados.</p>
      )}
    </div>
  );
};

export default ShiftsList;
//