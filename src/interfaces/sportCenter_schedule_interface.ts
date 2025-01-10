import { DayOfWeek } from "../enum/DayOfWeek"; // Importando el tipo 'DayOfWeek'

export interface ISportCenterSchedule {
  id: string;
  day: DayOfWeek; // El día de la semana, representado por un enum
  isOpen:boolean;
  opening_time: string; // Hora de apertura
  closing_time: string; // Hora de cierre
}
