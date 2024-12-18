import { IField} from '@/interfaces/field_Interface';
import React from 'react';

const FieldCard: React.FC<IField> = ({ id, number , schedules  , price  }) => {
  return (
    <div className="flex flex-row items-center rounded-lg gap-4 justify-center border p-2 w-[240px] h-[200px] transform transition duration-300 hover:scale-105 hover:shadow-lg">
      <img className="max-w-[120px] w-full h-auto" src={ '/default-image.jpg'} alt={`Imagen del complejo ${id}`} />
      <div>
        <h2 className="font-semibold text-xs">ID: {id}</h2>
        <p className="text-xs">Number: {number}</p>
        <p className="text-xs">Price : {price}</p>
      </div>
    </div>
  );
};

export default FieldCard;

//  id: string;
//  number: number;
//  price: number; // Decimal convertido a número para simplificar en el frontend
//  reservations?: IReservation[]; // Relación con IReservation (opcional)
//  payments?: IPayment[]; // Relación con IPayment (opcional)
//  paymentsHistory?: IPaymentHistory[]; // Relación con IPaymentHistory (opcional)
//  schedules: IFieldSchedule[]; // Relación con IFieldSchedule
//  photos?: IImage[]; // Relación con IImage (opcional)
//  reviews?: IReview[]; // Relación con IReview (opcional)
//  sportCategory?: ISportCategory; // Relación con ISportCategory (opcional)
//  sportcenter: ISportCenter; // Relación con ISportCenter (obligatoria)
