import { PaymentMethod } from "@/enum/PaymentMethod";
import { PaymentStatus } from "@/enum/PaymentStatus";
import { IUser } from "./user_Interface";
import { ISubscription } from "./subscription.interface";

export interface ISubscriptionPayment {
  id: string; // Identificador único del pago
  amount: string; // Monto del pago (en formato string para evitar problemas con precisión decimal)
  status: PaymentStatus; // Estado del pago (Pendiente, Completado, Fallido, etc.)
  paymentMethod: PaymentMethod; // Método de pago utilizado (Stripe, PayPal, etc.)
  isPaid: boolean; // Indica si el pago fue completado
  user: IUser; // ID del usuario asociado al pago
  subscription?: ISubscription; // ID de la suscripción asociada (opcional)
  createdAt: string; // Fecha y hora de creación del pago
  updatedAt?: string; // Fecha y hora de la última actualización del pago (opcional)
}
