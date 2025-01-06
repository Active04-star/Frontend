import { z } from "zod";

/**Cancha de Formulario
 */
export const FieldCreationSchema = z.object({

    number: z.number().min(0, "El numero de la cancha debe estar entre 0 - 1000").max(1000, "El numero de la cancha debe estar entre 0 - 1000"),

    price: z.string()
        .regex(
            /^(?:\d{1,10}(\.\d{1,2})?)$/,
            "El precio debe ser decimal valido"
        )
        .refine(
            (value) => (value.match(/\./g) || []).length <= 1,
            "El precio debe contener solo un punto decimal."
        ),

    sportCategoryId: z.string().uuid("La uuid de la categoria no es valida!"),

    sportCenterId: z.string().uuid("La uuid del centro deportivo no es valida!"),
})

// interface IField {
//     id: string;
//     number: number;
//     price: string; // Decimal convertido a número para simplificar en el frontend
//     isDeleted: boolean;
//     isActive: boolean;
//     duration_minutes: number;
//     photos?: string; // UNA IMAGEN POR CANCHA
//     sportCategory?: ISportCategory; // Relación con ISportCategory (opcional)
//     // reservations?: IReservation[]; // Relación con IReservation (opcional)
//     // payments?: IPayment[]; // Relación con IPayment (opcional)
//     // paymentsHistory?: IPaymentHistory[]; // Relación con IPaymentHistory (opcional)
//     // schedules: IFieldSchedule[]; // Relación con IFieldSchedule
//     // reviews?: IReview[]; // Relación con IReview (opcional)
//     // sportcenter: ISportCenter; // Relación con ISportCenter (obligatoria)
// }