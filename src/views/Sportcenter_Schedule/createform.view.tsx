import React, { useState } from "react";

// Enum de los días de la semana
enum DayOfWeek {
  Monday = "Monday",
  Tuesday = "Tuesday",
  Wednesday = "Wednesday",
  Thursday = "Thursday",
  Friday = "Friday",
  Saturday = "Saturday",
  Sunday = "Sunday",
}

type ScheduleEntry = {
  day: DayOfWeek; // Aquí el tipo sigue siendo DayOfWeek
  isOpen: boolean;
  opening_time: string;
  closing_time: string;
};

const ScheduleForm: React.FC = () => {
  // Estado inicial para los días de la semana
  const [schedule, setSchedule] = useState<ScheduleEntry[]>(
    Object.values(DayOfWeek).map((day) => ({
      day,  // La propiedad 'day' se asigna correctamente desde el enum DayOfWeek
      isOpen: true,
      opening_time: "08:00",
      closing_time: "20:00",
    }))
  );

  // Manejo de cambios en los valores del estado
  const handleChange = (
    index: number,
    field: keyof ScheduleEntry,
    value: string | boolean
  ) => {
    const updatedSchedule = [...schedule];

    // Aseguramos que el valor se asigne correctamente según el campo
    if (field === "isOpen") {
      updatedSchedule[index][field] = value as boolean; // 'isOpen' es un booleano
    } else if (field === "opening_time" || field === "closing_time") {
      updatedSchedule[index][field] = value as string; // 'opening_time' y 'closing_time' son cadenas
    }

    setSchedule(updatedSchedule);
  };

  // Enviar los datos al backend
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Solo enviamos los días que están abiertos
    const filteredSchedule = schedule.filter((entry) => entry.isOpen);
    console.log(filteredSchedule); // Aquí puedes enviar los datos a tu backend

    // Aquí podrías hacer una llamada a la API para guardar los horarios
    // fetch('/api/schedule', { method: 'POST', body: JSON.stringify(filteredSchedule), headers: { 'Content-Type': 'application/json' } })
    //   .then(response => response.json())
    //   .then(data => console.log('Horario guardado:', data))
    //   .catch(error => console.error('Error al guardar horario:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Asignar Horarios</h2>
      {schedule.map((entry, index) => (
        <div key={index} style={{ marginBottom: "10px" }}>
          <label>{entry.day}</label>
          <input
            type="checkbox"
            checked={entry.isOpen}
            onChange={(e) => handleChange(index, "isOpen", e.target.checked)}
          />
          {entry.isOpen && (
            <>
              <input
                type="time"
                value={entry.opening_time}
                onChange={(e) => handleChange(index, "opening_time", e.target.value)}
                required
                disabled={!entry.isOpen}
              />
              <input
                type="time"
                value={entry.closing_time}
                onChange={(e) => handleChange(index, "closing_time", e.target.value)}
                required
                disabled={!entry.isOpen}
              />
            </>
          )}
        </div>
      ))}
      <button type="submit">Guardar Horarios</button>
    </form>
  );
};

export default ScheduleForm;
