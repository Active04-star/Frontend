import { SubscriptionStatus } from "@/enum/SubscriptionStatus";
import { UserRole } from "@/enum/userRole";
import { IReview } from "./reviews_interface";
import { ISportCenter } from "./SportCenter_Interface";
import { IReservation } from "./reservation_Interface";

export interface IUser {
  id: string;
  name: string;
  email: string;
  profile_image?: string;
  password?: string;
  authtoken?: string;
  subscription_status: SubscriptionStatus;
  role: UserRole;
  was_banned: boolean;
  reviews?: IReview[];
  managed_centers?: ISportCenter[];
  reservations?: IReservation[];
}
