import { ISportCategory } from "./sportCategory_interface";

export interface IField {
  id: string;
  number: number;
  price: string; // Decimal convertido a número para simplificar en el frontend
  isDeleted: boolean;
  isActive: boolean;
  duration_minutes: number;
  photos?: string; // UNA IMAGEN POR CANCHA
  sportCategory?: ISportCategory; // Relación con ISportCategory (opcional)
  // reservations?: IReservation[]; // Relación con IReservation (opcional)
  // payments?: IPayment[]; // Relación con IPayment (opcional)
  // paymentsHistory?: IPaymentHistory[]; // Relación con IPaymentHistory (opcional)
  // schedules: IFieldSchedule[]; // Relación con IFieldSchedule
  // reviews?: IReview[]; // Relación con IReview (opcional)
  // sportcenter: ISportCenter; // Relación con ISportCenter (obligatoria)
}