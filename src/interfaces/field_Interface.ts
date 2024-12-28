import { IReservation } from "./reservation_Interface"; // Relación con la interfaz IReservation
import { IPayment } from "./payment_Interface"; // Relación con la interfaz IPayment
import { IPaymentHistory } from "./paymentHistory_interface"; // Relación con la interfaz IPaymentHistory
import { IFieldSchedule } from "./field_schedule.Interface"; // Relación con la interfaz IFieldSchedule
import { IReview } from "./reviews_interface"; // Relación con la interfaz IReview
import { ISportCategory } from "./sportCategory_interface"; // Relación con la interfaz ISportCategory
import { ISportCenter } from "./sport_center.interface";

export interface IField {
  id: string;
  number: number;
  price: number; // Decimal convertido a número para simplificar en el frontend
  reservations?: IReservation[]; // Relación con IReservation (opcional)
  payments?: IPayment[]; // Relación con IPayment (opcional)
  paymentsHistory?: IPaymentHistory[]; // Relación con IPaymentHistory (opcional)
  schedules: IFieldSchedule[]; // Relación con IFieldSchedule
  photos?: string; // UNA IMAGEN POR CANCHA
  reviews?: IReview[]; // Relación con IReview (opcional)
  sportCategory?: ISportCategory; // Relación con ISportCategory (opcional)
  sportcenter: ISportCenter; // Relación con ISportCenter (obligatoria)
}
