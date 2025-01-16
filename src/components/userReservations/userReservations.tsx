import React from "react";
import { IReservation } from "@/interfaces/reservation_Interface";
import { format } from "date-fns";

interface ReservationCardProps {
  reservation: IReservation;
  onComplete?: (id: string) => void;
  onCancel?: (id: string) => void;
  isCompleting?: boolean;
  isCancelling: boolean;
}

const ReservationCard: React.FC<ReservationCardProps> = ({
  reservation,
  onCancel,
  isCompleting,
  isCancelling,
}) => {
  return (
    <div className=" shadow-lg rounded-lg overflow-hidden mb-4 ">
      <div className="p-4 bg-white">
        <h3 className="font-bold text-lg mb-2 text-black">
          Cancha {reservation.field?.number}
        </h3>
        <p className="text-sm text-gray-600 mb-1">
          Fecha: {format(new Date(reservation.date), "PPP")}
        </p>
        <p className="text-sm text-gray-600 mb-1">
          Hora: {format(new Date(reservation.date), "p")}
        </p>
      
      
        {reservation.status === "active" && (
          <div className="flex justify-between mt-2">
          
            <button
              onClick={() => onCancel && onCancel(reservation.id)}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
              disabled={isCompleting || isCancelling}
            >
              {isCancelling ? 'Cancelando...' : 'Cancelar'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "ACTIVE":
      return "text-green-600";
    case "COMPLETED":
      return "text-blue-600";
    case "CANCELLED":
      return "text-red-600";
    default:
      return "text-gray-600";
  }
};

export default ReservationCard;
