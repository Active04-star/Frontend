import { SubscriptionStatus } from "../enum/SubscriptionStatus"; // Enum para el estado de suscripción
import { ISubscriptionPayment } from "./subscriptionPayment.interface";
import { IUser } from "./user_Interface";

export interface ISubscription {
  id: string; // Identificador único de la suscripción
  status: SubscriptionStatus; // Estado de la suscripción
  price: number; // Precio de la suscripción
  startDate: Date; // Fecha de inicio de la suscripción
  endDate: Date; // Fecha de fin de la suscripción
  autoRenew: boolean; // Indica si la suscripción se renueva automáticamente
  user: IUser; // Usuario asociado a la suscripción
  payments: ISubscriptionPayment[]; // Lista de pagos relacionados con la suscripción
}
