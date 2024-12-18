import { SubscriptionStatus } from "../enum/SubscriptionStatus"; // Enum para el estado de suscripción
import { UserRole } from "../enum/userRole"; // Enum para el rol de usuario
import { IReview } from "./reviews_interface"; // Interfaz para las reseñas
import { ISportCenter } from "./SportCenter_Interface"; // Interfaz para los centros deportivos
import { IReservation } from "./reservation_Interface"; // Interfaz para las reservas

export interface IUser {
  id: string; // Identificador único del usuario
  name: string; // Nombre del usuario
  email: string; // Correo electrónico del usuario
  profile_image?: string; // Imagen de perfil opcional
  password?: string; // Contraseña opcional (si decides incluirla en la interfaz, aunque en frontend generalmente no es necesario)
  authtoken?: string; // Token de autenticación opcional
  subscription_status: SubscriptionStatus; // Estado de la suscripción del usuario
  role: UserRole; // Rol del usuario, usando un enum para los roles
  was_banned: boolean; // Indica si el usuario fue baneado
  reviews?: IReview[]; // Lista de reseñas opcionales, que el usuario haya dejado
  managed_centers?: ISportCenter[]; // Centros deportivos que el usuario gestiona (opcional)
  reservations?: IReservation[]; // Reservas que el usuario tiene (opcional)
}
