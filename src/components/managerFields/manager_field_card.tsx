"use client";

import { ReservationStatus } from "@/enum/ReservationStatus";
import { IField } from "@/interfaces/field_Interface";
import { CircleDollarSign, Clock, Hash, Activity, Loader, Calendar, CheckCircle } from "lucide-react";
import { useState } from "react";
import Swal from "sweetalert2";

interface FieldCardProps {
  field: IField;
  onDelete: (fieldId: string) => void;
  isDeleting:boolean // Callback para eliminar el campo
}

export const FieldCard: React.FC<FieldCardProps> = ({ field, onDelete ,isDeleting}) => {
  const priceLevel = Number(field.price) > 50 ? "high" : "low";

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    // Mostrar alerta de confirmación
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡Esta acción no se puede deshacer!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      customClass: {
        confirmButton: "bg-red-600 text-white",
        cancelButton: "bg-gray-300 text-black",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete(field.id); // Llamar a la función de eliminación
      }
    });
  };

  const cardStyles = {
    high: "bg-gradient-to-br from-gray-300/90 to-gray-400/90 hover:from-gray-400 hover:to-gray-500",
    low: "bg-gradient-to-br from-gray-100/90 to-gray-200/90 hover:from-gray-200 hover:to-gray-300",
  };
  const activeReservations = field.reservation ? field.reservation.filter(r => r.status===ReservationStatus.ACTIVE).length : 0;
  const completedReservations = field.reservation ? field.reservation.filter(r => r.status===ReservationStatus.COMPLETED).length : 0;

  return (
    <div
      className={`group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl ${cardStyles[priceLevel]}`}
    >
      <div className="relative h-48 w-full bg-white/10 flex items-center justify-center overflow-hidden">
        {/* Large Number Display */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            {/* Background Number (for depth effect) */}
            <span className="absolute -inset-1 text-[120px] font-bold text-white/5 blur-sm select-none">
              N°{field.number}
            </span>
            {/* Foreground Number */}
            <span className="relative text-[100px] font-bold text-white/90 select-none">
              N°{field.number}
            </span>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-white/20 rounded-tl-xl" />
          <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-white/20 rounded-br-xl" />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      <div className="p-5">
        {isDeleting ? (
          <div className="absolute top-3 right-3 bg-gray-300 text-gray-800 p-2 rounded-full shadow flex items-center">
            <Loader className="h-4 w-4 animate-spin mr-2" />
            Borrando...
          </div>
        ) : (
          <button
            onClick={handleDeleteClick}
            className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full shadow hover:bg-red-600"
          >
            🗑️
          </button>
        )}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center">
            <CircleDollarSign className="h-6 w-6 text-white" />
            <span className="text-3xl font-bold text-white">
              {Number(field.price).toFixed(2)}
            </span>
          </div>
          <span className="flex items-center gap-1 text-white border border-white/20 px-2 py-1 rounded-full text-sm backdrop-blur-sm bg-white/5">
            <Clock className="h-4 w-4" />
            {field.duration_minutes}min
          </span>
        </div>

        <div className="flex items-center justify-between space-x-2 mt-4">
        <span
          className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs backdrop-blur-sm ${
            field.isACtive
              ? "bg-green-500/90 text-white"
              : "bg-red-500/90 text-white"
          }`}
        >
          <Activity className="h-3 w-3" />
          {field.isACtive ? "Activa" : "Inactiva"}
        </span>
        <span className="flex items-center gap-1 px-2 py-1 rounded-full text-xs backdrop-blur-sm bg-blue-500/90 text-white">
          <Calendar className="h-3 w-3" />
          {activeReservations} activas
        </span>
        <span className="flex items-center gap-1 px-2 py-1 rounded-full text-xs backdrop-blur-sm bg-purple-500/90 text-white">
          <CheckCircle className="h-3 w-3" />
          {completedReservations} completadas
        </span>
      </div>
      </div>
    </div>
  );
};
