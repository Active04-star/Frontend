import { z } from 'zod';

export const BlockStatusEnum = z.enum(['AVAILABLE', 'RESERVED']);

export const FieldBlockSchema = z.object({
  id: z.string().uuid(),
  start_time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format'), // Formato HH:mm
  end_time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format'),   // Formato HH:mm
  status: BlockStatusEnum.optional(), // Si está presente en la entidad
  fieldId: z.string().uuid().optional(), // Relación ManyToOne (puede requerir ajustes según la entidad Field)
  reservationId: z.string().uuid().optional(), // Relación OneToOne (puede requerir ajustes)
});