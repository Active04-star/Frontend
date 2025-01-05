import { DayOfWeek } from '@/enum/DayOfWeek';
import { z } from 'zod';

export const SportCenterScheduleSchema = z.object({
  day: z.nativeEnum(DayOfWeek),  // Enum DayOfWeek
  isOpen: z.boolean().default(true),  // Booleano con valor predeterminado
  opening_time: z.string().regex(/^\d{2}:\d{2}:\d{2}$/),  // Formato de hora HH:MM:SS
  closing_time: z.string().regex(/^\d{2}:\d{2}:\d{2}$/),  // Formato de hora HH:MM:SS
});


