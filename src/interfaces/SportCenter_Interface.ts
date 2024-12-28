import { IReview } from "./reviews_interface"; // Asumiendo que tienes una interfaz 'Review' para el frontend
import { IUser } from "./user_Interface"; // Asumiendo que tienes una interfaz 'User' para el frontend
import { IField } from "./field_Interface"; // Asumiendo que tienes una interfaz 'Field' para el frontend
import { IImage } from "./image_Interface"; // Asumiendo que tienes una interfaz 'Image' para el frontend
import { SportCenterStatus } from "../enum/sportCenterStatus.enum"; // Importando el tipo 'SportCenterStatus'
import { ISportCategory } from "./sportCategory_interface"; // Asumiendo que tienes una interfaz 'SportCategory' para el frontend
import { ISportCenterSchedule } from "./sportCenter_schedule_interface"; // Asumiendo que tienes una interfaz 'SportCenterSchedule' para el frontend
import { IPayment } from "./payment_Interface"; // Asumiendo que tienes una interfaz 'Payment' para el frontend
import { SportCenterManagers } from "./sportCenter_Manager_interface"; // Asumiendo que tienes una interfaz 'SportCenterManagers' para el frontend
import { IPaymentHistory } from "./paymentHistory_interface"; // Asumiendo que tienes una interfaz 'PaymentHistory' para el frontend

export interface ISportCenter {
  id: string;
  name: string;
  address: string;
  averageRating?: number | null; // Puede ser null si no tiene una calificación promedio
  status: SportCenterStatus;
  reviews: IReview[]; // Relación con las reseñas
  photos: IImage[]; // Relación con las imágenes
  payments: IPayment[]; // Relación con los pagos
  paymentsHistory: IPaymentHistory[]; // Relación con el historial de pagos
  schedules: ISportCenterSchedule[]; // Relación con los horarios del centro deportivo
  fields: IField[]; // Relación con los campos deportivos
  managers_list: SportCenterManagers[]; // Relación con los gerentes del centro deportivo
  manager: IUser; // Relación con el gerente principal
  sport_categories: ISportCategory[]; // Relación con las categorías deportivas
}
